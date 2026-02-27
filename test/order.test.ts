import { Order } from '../src/domain';

test('Order accepte promoCode optionnel', () => {
  const order: Order = {
    id: 'o1',
    customerId: 'c1',
    productId: 'p1',
    quantity: 2,
    unitPrice: 100,
    date: '2026-02-27',
    time: '10:00'
  };

  expect(order.promoCode).toBeUndefined();
});