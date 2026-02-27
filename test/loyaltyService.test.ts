import { calculateLoyaltyPoints, calculateLoyaltyDiscount } from '../src/services/loyalty.service';
import { Order } from '../src/domain/order';

describe('Loyalty Service', () => {

  test('calculateLoyaltyPoints: accumule correctement les points', () => {
    const orders = [
      { quantity: 2, unitPrice: 100 } as Order,
      { quantity: 1, unitPrice: 50 } as Order,
    ];

    const points = calculateLoyaltyPoints(orders);

    // 2*100*0.01 + 1*50*0.01 = 2 + 0.5 = 2.5
    expect(points).toBeCloseTo(2.5);
  });

  test('calculateLoyaltyDiscount: 10% sur >100 pts', () => {
    const discount = calculateLoyaltyDiscount(200);
    expect(discount).toBe(20);
  });

  test('calculateLoyaltyDiscount: 15% sur >500 pts', () => {
    const discount = calculateLoyaltyDiscount(600);
    expect(discount).toBe(90); // bug legacy conservé
  });

  test('calculateLoyaltyDiscount: plafond 50 pts sur 100 pts', () => {
    const discount = calculateLoyaltyDiscount(1000);
    expect(discount).toBe(100); // conserve le comportement legacy
  });

});