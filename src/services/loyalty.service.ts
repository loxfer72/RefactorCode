import { Order } from '../domain/order';

const LOYALTY_RATIO = 0.01;

/**
 * Calcule les points de fidélité d'un ensemble de commandes
 */
export function calculateLoyaltyPoints(orders: Order[]): number {
  return orders.reduce((points, order) => {
    return points + order.quantity * order.unitPrice * LOYALTY_RATIO;
  }, 0);
}

/**
 * Calcule la remise basée sur les points de fidélité
 * Comporte le bug legacy (overwrite) pour préserver Golden Master
 */
export function calculateLoyaltyDiscount(points: number): number {
  let discount = 0;

  if (points > 100) {
    discount = Math.min(points * 0.1, 50);
  }

  if (points > 500) {
    discount = Math.min(points * 0.15, 100);
  }

  return discount;
}