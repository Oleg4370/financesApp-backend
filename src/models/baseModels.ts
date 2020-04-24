type Currency = 'UAH' | 'EUR' | 'USD';
type OperationType = 'buy' | 'salary' | 'family' | 'other';

export interface Operation {
    id: string;
    operationType: OperationType;
    categoryId: string;
    sum: number;
    currency: Currency;
}

export interface OperationJson {
    operationType: OperationType;
    categoryId: string;
    sum: string;
    currency: Currency;
}

export interface DbConnect {
    getData(): Promise<Operation[]>;
    setData(updatedData: Operation[]): Promise<undefined | Error>;
}
