import dbConnect from 'src/dbConnect';
import { Operation } from 'src/models/baseModels';

export default class OperationsService {
    public async getData(): Promise<Operation[] | Error> {
        try {
            const data = await dbConnect.getData;

            return JSON.parse(data);
        } catch(err) {
            return new Error(err);
        }
    }

    public async addData(newOperation: Operation): Promise<Operation | Error> {
        try {
            const data = await dbConnect.getData;
            const formattedData = JSON.parse(data);
            formattedData.push(newOperation);
            await dbConnect.setData(formattedData);

            return newOperation;
        } catch(err) {
            return new Error(err);
        }
    }
}
