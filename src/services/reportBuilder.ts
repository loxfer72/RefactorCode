import { Customer } from '../domain/customer';
import { Order } from '../domain/order';
import { Product } from '../domain/product';
import { calculateVolumeDiscount } from './discount.service';
import { calculateLoyaltyPoints, calculateLoyaltyDiscount } from './loyalty.service';
import { Report } from '../domain/report';

/**
 * Construit un rapport pour un client
 */
export function buildReport(
  customer: Customer,
  orders: Order[],
  products: Record<string, Product>
): Report {

  // Filtrer commandes du client
  const customerOrders = orders.filter(o => o.customerId === customer.id);

  // Calcul subtotal
  const subtotal = customerOrders.reduce((sum, order) => {
    const prod = products[order.productId];
    const price = prod?.unitPrice ?? order.unitPrice;
    return sum + price * order.quantity;
  }, 0);

  // Volume discount
  const volumeDiscount = calculateVolumeDiscount(subtotal, customer);

  // Loyalty
  const loyaltyPoints = calculateLoyaltyPoints(customerOrders);
  const loyaltyDiscount = calculateLoyaltyDiscount(loyaltyPoints);

  // Total discount
  const totalDiscount = volumeDiscount + loyaltyDiscount;

  // Placeholder pour taxe / shipping / handling pour l’instant
  const tax = 0;
  const shipping = 0;
  const handling = 0;

  const total = subtotal - totalDiscount + tax + shipping + handling;

  return {
    customerId: customer.id,
    name: customer.name,
    subtotal,
    volumeDiscount,
    loyaltyDiscount,
    totalDiscount,
    morningBonus: 0,
    shipping,
    handling,
    tax,
    total,
    loyaltyPoints,
  };
}