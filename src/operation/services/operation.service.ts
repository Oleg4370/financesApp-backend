import {Operation} from '../operation.models';
import {BaseOperationsService} from './baseServices';
import { BaseDatabaseService } from '@src/database/services/base.services';

class OperationsService extends BaseOperationsService {
  constructor(db: BaseDatabaseService) {
    super();
    this.db = db;
  }

  public async getData(): Promise<Operation[] | Error> {
    try {
      return await this.db.getData('operations');
    } catch (err) {
      return new Error(err);
    }
  }

  public async getDataById(id: string): Promise<Operation | Error> {
    try {
      const data = await this.db.findData('operations', { id });

      return data.find((item: Operation) => item.id === id);
    } catch (err) {
      return new Error(err);
    }
  }

  public async addData(newOperation: Operation): Promise<Operation | Error> {
    try {
      const data = await this.db.addData('operations', newOperation);

      data.push(newOperation);
      await this.db.setData(data);

      return newOperation;
    } catch (err) {
      return new Error(err);
    }
  }
}

export default (dbConnect: BaseDatabaseService): BaseOperationsService => new OperationsService(dbConnect);
