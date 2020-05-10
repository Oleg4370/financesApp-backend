export interface Operation {
  id: string;
  operationType: OperationType;
  categoryId: string;
  sum: number;
  currency: Currency;
}

export interface OperationInterface {
  getData(): Promise<Operation[]>;
  getDataById(selector: string, id: string): Promise<Operation>;
  addData(newOperation: Operation): Promise<Operation>;
}
