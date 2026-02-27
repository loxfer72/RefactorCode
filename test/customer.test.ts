import { Customer } from '../src/domain';

test('Customer respecte la structure attendue', () => {
  const customer: Customer = {
    id: 'c1',
    name: 'Alice',
    level: 'BASIC',
    shippingZone: 'ZONE1',
    currency: 'EUR'
  };

  expect(customer.id).toBe('c1');
  expect(customer.level).toMatch(/BASIC|PREMIUM/);
});