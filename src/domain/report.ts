export interface Report {
    customerId: string;
    name: string;

    subtotal: number;

    volumeDiscount: number;
    loyaltyDiscount: number;
    morningBonus: number;
    totalDiscount: number;
    
    shipping: number;
    handling: number;
    tax: number;
    
    total: number;
    loyaltyPoints: number;
}