import { DbConnect } from '@src/database/database.models';
import { Operation } from '@src/operation/operation.models';

export abstract class BaseOperationsService {
    db: DbConnect;

    public getData(): Promise<Operation[] | Error> {
        return new Promise(() => []);
    }

    public getDataById(id: string): Promise<Operation | Error> {
        return new Promise(() => new Error());
    }

    public addData(newOperation: Operation): Promise<Operation | Error> {
        return new Promise(() => new Error());
    }
}
