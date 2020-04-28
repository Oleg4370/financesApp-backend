import { Operation } from "@src/operation/operation.models";

export interface DbConnect {
    getData(): Promise<Operation[]>;
    setData(updatedData: Operation[]): Promise<undefined | Error>;
}
