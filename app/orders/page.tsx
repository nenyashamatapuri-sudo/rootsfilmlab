import type { Metadata } from "next";
import { OrderConsole } from "@/components/OrderConsole";

export const metadata: Metadata = {
  title: "Track your order — Griot Film Lab",
};

export default function OrdersPage() {
  return <OrderConsole />;
}
