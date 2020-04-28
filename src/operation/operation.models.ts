export interface Operation {
    id: string;
    operationType: OperationType;
    categoryId: string;
    sum: number;
    currency: Currency;
}
