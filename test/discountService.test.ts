import { calculateVolumeDiscount }
  from '../src/services/discount.service';

import { Customer } from '../src/domain/customer';

const basicCustomer: Customer = {
  id: '1',
  name: 'Alice',
  level: 'BASIC',
  shippingZone: 'ZONE1',
  currency: 'EUR'
};

const premiumCustomer: Customer = {
  ...basicCustomer,
  level: 'PREMIUM'
};

describe('calculateVolumeDiscount', () => {

  test('no discount under 50', () => {
    expect(
      calculateVolumeDiscount(40, basicCustomer)
    ).toBe(0);
  });

  test('5% discount over 50', () => {
    expect(
      calculateVolumeDiscount(60, basicCustomer)
    ).toBe(3);
  });

  test('10% discount over 100', () => {
    expect(
      calculateVolumeDiscount(200, basicCustomer)
    ).toBe(20);
  });

  test('15% discount over 500', () => {
    expect(
      calculateVolumeDiscount(600, basicCustomer)
    ).toBe(90);
  });

  test('premium gets 20% over 1000', () => {
    expect(
      calculateVolumeDiscount(1200, premiumCustomer)
    ).toBe(240);
  });

});