type Currency = 'UAH' | 'EUR' | 'USD';
type OperationType = 'buy' | 'salary' | 'family' | 'other';

export interface Operation {
    operationType: OperationType,
    categoryId: string,
    sum: number,
    currency: Currency
}
