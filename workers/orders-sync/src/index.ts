// Receives Shopify's "orders/create" and "orders/updated" webhooks and
// forwards each order to an Airtable base, so orders can be tracked and
// updated for customer communication without living only in Shopify.
//
// Airtable isn't set up yet. Until AIRTABLE_API_KEY / AIRTABLE_BASE_ID /
// AIRTABLE_TABLE_NAME are configured as secrets, this worker still verifies
// and accepts the Shopify webhook (so Shopify doesn't retry/disable it) but
// skips the Airtable call. Once those three secrets are set, syncing starts
// immediately — no code changes needed.

export interface Env {
  SHOPIFY_WEBHOOK_SECRET: string;
  AIRTABLE_API_KEY?: string;
  AIRTABLE_BASE_ID?: string;
  AIRTABLE_TABLE_NAME?: string;
}

async function verifyShopifyHmac(rawBody: string, hmacHeader: string | null, secret: string): Promise<boolean> {
  if (!hmacHeader) return false;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(rawBody));
  const computed = btoa(String.fromCharCode(...new Uint8Array(signature)));
  return computed === hmacHeader;
}

type ShopifyOrder = {
  id?: number;
  name?: string;
  order_number?: number;
  email?: string;
  contact_email?: string;
  created_at?: string;
  current_total_price?: string;
  total_price?: string;
  fulfillment_status?: string | null;
  financial_status?: string;
  customer?: { first_name?: string; last_name?: string };
  line_items?: { quantity: number; title: string; variant_title?: string | null }[];
};

function mapOrderToAirtableFields(order: ShopifyOrder) {
  const lineItems = (order.line_items ?? [])
    .map((li) => `${li.quantity}× ${li.title}${li.variant_title ? ` (${li.variant_title})` : ""}`)
    .join("\n");

  return {
    "Order Number": order.name ?? (order.order_number ? `#${order.order_number}` : ""),
    "Customer Name": [order.customer?.first_name, order.customer?.last_name].filter(Boolean).join(" ") || order.email || "",
    Email: order.email ?? order.contact_email ?? "",
    "Line Items": lineItems,
    Total: order.current_total_price ?? order.total_price ?? "",
    "Fulfillment Status": order.fulfillment_status ?? "unfulfilled",
    "Financial Status": order.financial_status ?? "",
    "Order Date": order.created_at ?? "",
    "Shopify Order ID": order.id ? String(order.id) : "",
    "Shopify Admin Link": order.id ? `https://admin.shopify.com/store/uqfjz0-cz/orders/${order.id}` : "",
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    if (!env.SHOPIFY_WEBHOOK_SECRET) {
      return new Response("Webhook secret not configured", { status: 500 });
    }

    const rawBody = await request.text();
    const hmacHeader = request.headers.get("X-Shopify-Hmac-Sha256");
    const valid = await verifyShopifyHmac(rawBody, hmacHeader, env.SHOPIFY_WEBHOOK_SECRET);
    if (!valid) {
      return new Response("Invalid signature", { status: 401 });
    }

    const order = JSON.parse(rawBody) as ShopifyOrder;
    const fields = mapOrderToAirtableFields(order);

    if (!env.AIRTABLE_API_KEY || !env.AIRTABLE_BASE_ID || !env.AIRTABLE_TABLE_NAME) {
      console.log("Airtable not configured yet; order received but not synced:", fields["Order Number"]);
      return new Response("OK (Airtable not configured)", { status: 200 });
    }

    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${encodeURIComponent(env.AIRTABLE_TABLE_NAME)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fields }),
      }
    );

    if (!airtableRes.ok) {
      console.error("Airtable sync failed:", airtableRes.status, await airtableRes.text());
      return new Response("Airtable sync failed", { status: 502 });
    }

    return new Response("OK", { status: 200 });
  },
};
