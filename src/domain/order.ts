export interface Order {
    id: string;
    customerId: string;
    productId: string;

    quantity: number;
    unitPrice: number;
  
    date: string;
    time: string;

    promoCode?: string;
}
