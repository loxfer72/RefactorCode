export type PromotionType = 'PERCENTAGE' | 'FIXED' | 'SHIPPING';

export interface Promotion {
    code: string;
    type: PromotionType;
    value: number;
    startDate: string;
    endDate: string;
}