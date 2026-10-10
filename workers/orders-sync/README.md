# Orders → Airtable sync

Receives Shopify order webhooks and forwards each order to an Airtable base. Shopify checkout (not this repo's Next.js site) is where orders actually happen, so this worker is what lets orders get tracked in Airtable too.

## Current state

The worker is deployed and the Shopify webhook is registered, but it runs as a safe no-op until Airtable is connected: it verifies and accepts every webhook (so Shopify doesn't retry or disable it) but skips the Airtable call until the three `AIRTABLE_*` secrets below are set.

## To turn on Airtable syncing

1. Create an Airtable base with a table that has these fields (all single line text, except where noted):
   - `Order Number`
   - `Customer Name`
   - `Email`
   - `Line Items` (long text)
   - `Total`
   - `Fulfillment Status`
   - `Financial Status`
   - `Order Date`
   - `Shopify Order ID`
   - `Shopify Admin Link` (URL)
2. Create an Airtable Personal Access Token (airtable.com/create/tokens) scoped to that base, with `data.records:write` permission.
3. From `workers/orders-sync/`, set the secrets:
   ```bash
   npx wrangler secret put AIRTABLE_API_KEY
   npx wrangler secret put AIRTABLE_BASE_ID
   npx wrangler secret put AIRTABLE_TABLE_NAME
   ```
4. That's it — new orders will start appearing in Airtable within seconds of checkout.

## Deploying changes to the worker itself

```bash
cd workers/orders-sync
npm install
npx wrangler deploy
```

## Shopify webhook

Registered in Shopify Admin → Settings → Notifications → Webhooks, topic `Order creation`, pointing at this worker's URL. The `SHOPIFY_WEBHOOK_SECRET` secret must match the signing secret Shopify shows when the webhook is created.
