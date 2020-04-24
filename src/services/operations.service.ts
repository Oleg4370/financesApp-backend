import { Operation, DbConnect } from '@src/models/baseModels';
import dbConnect from '@src/dbConnect';
import { BaseOperationsService } from './baseServices';

class OperationsService extends BaseOperationsService{
    constructor(db: DbConnect) {
        super();
        this.db = db;
    }

    public async getData(): Promise<Operation[] | Error> {
        try {
            return await this.db.getData();
        } catch(err) {
            return new Error(err);
        }
    }

    public async getDataById(id: string): Promise<Operation | Error> {
        try {
            const data = await this.db.getData();

            return data.find(item => item.id === id);
        } catch(err) {
            return new Error(err);
        }
    }

    public async addData(newOperation: Operation): Promise<Operation | Error> {
        try {
            const data = await this.db.getData();

            data.push(newOperation);
            await this.db.setData(data);

            return newOperation;
        } catch(err) {
            return new Error(err);
        }
    }
}

export default (): BaseOperationsService => new OperationsService(dbConnect);
