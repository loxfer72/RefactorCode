export type CustomerLevel = 'BASIC' | 'PREMIUM';
export type Currency = 'EUR' | 'USD' | 'GBP';

export interface Customer {
  id: string;
  name: string;
  level: CustomerLevel;
  shippingZone: string;
  currency: Currency;
}
