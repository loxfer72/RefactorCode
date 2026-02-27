import { Product } from '../src/domain';

test('Product possède des valeurs numériques valides', () => {
  const product: Product = {
    id: 'p1',
    name: 'Laptop',
    category: 'TECH',
    unitPrice: 1000,
    weight: 2
  };

  expect(product.unitPrice).toBeGreaterThan(0);
});