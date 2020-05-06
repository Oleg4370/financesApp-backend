import { BaseDatabaseService } from '@src/database/services/base.services';
import {Operation} from '@src/operation/operation.models';

export abstract class BaseOperationsService {
  db: BaseDatabaseService;

  public getData(): Promise<Operation[] | Error> {
    return new Promise(() => []);
  }

  public getDataById(selector: string, id: string): Promise<Operation | Error> {
    return new Promise(() => new Error());
  }

  public addData(newOperation: Operation): Promise<Operation | Error> {
    return new Promise(() => new Error());
  }
}
