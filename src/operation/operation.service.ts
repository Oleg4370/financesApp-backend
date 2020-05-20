import {Operation} from './operation.models';
import { DatabaseInterface } from '@src/database/database.service';

interface OperationInterface {
  getData(): Promise<Operation[]>;
  getDataById(selector: string, id: string): Promise<Operation>;
  addData(newOperation: Operation): Promise<Operation>;
}

class OperationsService implements OperationInterface {
  constructor(private db: DatabaseInterface) {}

  public async getData(): Promise<Operation[]> {
    return await this.db.findAll('operations');
  }

  public async getDataById(id: string): Promise<Operation> {
    return await this.db.find('operations', { id });
  }

  public async addData(newOperation: Operation): Promise<Operation> {
    return await this.db.add('operations', newOperation);
  }
}

export const getOperationsService = (dbConnect: DatabaseInterface): OperationInterface => new OperationsService(dbConnect);
