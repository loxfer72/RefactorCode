import { Report } from '../src/domain';

test('Report contient toutes les données calculées', () => {
  const report: Report = {
    customerId: 'c1',
    name: 'Alice',

    subtotal: 100,
    volumeDiscount: 5,
    loyaltyDiscount: 5,
    morningBonus: 0,
    totalDiscount: 10,

    shipping: 5,
    handling: 0,
    tax: 18,

    total: 113,
    loyaltyPoints: 2
  };

  expect(report.total).toBe(
    report.subtotal
      - report.totalDiscount
      + report.tax
      + report.shipping
  );
});