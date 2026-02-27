import { buildReport } from '../src/services/reportBuilder';
import { Customer } from '../src/domain/customer';
import { Order } from '../src/domain/order';
import { Product } from '../src/domain/product';

describe('Report Builder', () => {
  const customer: Customer = {
    id: 'c1',
    name: 'Alice',
    level: 'BASIC',
    shippingZone: 'ZONE1',
    currency: 'EUR'
  };

  const orders: Order[] = [
    { id: 'o1', customerId: 'c1', productId: 'p1', quantity: 2, unitPrice: 100, date: '2026-02-27', promo_code: '', time: '12:00' } as Order,
    { id: 'o2', customerId: 'c1', productId: 'p2', quantity: 1, unitPrice: 50, date: '2026-02-27', promo_code: '', time: '12:00' } as Order
  ];

  const products: Record<string, Product> = {
    p1: { id: 'p1', name: 'Prod1', category: 'Cat1', unitPrice: 100, weight: 1, taxable: true } as Product,
    p2: { id: 'p2', name: 'Prod2', category: 'Cat1', unitPrice: 50, weight: 2, taxable: true } as Product
  };

  test('buildReport génère les valeurs correctement', () => {
    const report = buildReport(customer, orders, products);

    expect(report.customerId).toBe('c1');
    expect(report.subtotal).toBe(250);
    expect(report.volumeDiscount).toBeCloseTo(25); // Legacy bug: les discount se font overwrite, et non cumulatif => test sans bug toBeCloseTo(12.5)
    expect(report.loyaltyPoints).toBeCloseTo(2.5); // 2*100*0.01 + 1*50*0.01
    expect(report.loyaltyDiscount).toBeCloseTo(0); // points*0.1 Legacy bug : test sans bug toBeCloseTo(0.25); 
    expect(report.totalDiscount).toBeCloseTo(25); // Legacy bug: test sans bug toBeCloseTo(12.75)
    expect(report.total).toBeCloseTo(225); // subtotal - totalDiscount Legacy bug: test sans bug toBeCloseTo(237.25)
  });
});