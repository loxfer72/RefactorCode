import { Promotion } from '../src/domain';

test('Promotion type valide', () => {
  const promo: Promotion = {
    code: 'PROMO10',
    type: 'PERCENTAGE',
    value: 10,
    startDate: '2026-01-01',
    endDate: '2026-12-31'
  };

  expect(promo.type).toBe('PERCENTAGE');
});