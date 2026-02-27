import { Customer } from '../domain/customer';

export function calculateVolumeDiscount(
  subtotal: number,
  customer: Customer
): number {

  let discount = 0;

  if (subtotal > 50) {
    discount = subtotal * 0.05;
  }

  if (subtotal > 100) {
    discount = subtotal * 0.10;
  }

  if (subtotal > 500) {
    discount = subtotal * 0.15;
  }

  if (subtotal > 1000 && customer.level === 'PREMIUM') {
    discount = subtotal * 0.20;
  }

  return discount;
}