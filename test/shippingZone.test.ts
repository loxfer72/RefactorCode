import { ShippingZone } from '../src/domain';

test('ShippingZone contient multiplicateur', () => {
  const zone: ShippingZone = {
    zone: 'ZONE1',
    multiplier: 1.2
  };

  expect(zone.multiplier).toBeGreaterThan(0);
});