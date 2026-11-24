import { CURRENCY_CODE, LOCALE } from "./constants";

const costFormatter = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: CURRENCY_CODE,
});

export function formatCost(cost: number | null): string {
  if (cost === null) {
    return "No price";
  }
  return costFormatter.format(cost);
}

export function formatQuantity(quantity: number): string {
  return `${quantity} in stock`;
}
