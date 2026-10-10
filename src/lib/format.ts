export function inr(value: number): string {
  return "₹" + value.toLocaleString("en-IN");
}

export function discountPct(price: number, mrp: number | null | undefined): number | null {
  if (!mrp || mrp <= price) return null;
  return Math.round(((mrp - price) / mrp) * 100);
}

export const COD_FEE = 599; // Non-refundable confirmation & handling fee per Shipping Policy §3.1

export function orderId(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `DP-${stamp.slice(-4)}${rand}`;
}
