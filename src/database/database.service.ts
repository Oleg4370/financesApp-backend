import fs from 'fs';
import { Operation } from "@src/operation/operation.models";
import { pathToDBFile } from '@src/config';

const getData = (): Promise<Operation[]> => {
    return new Promise((resolve, reject) => {
        fs.readFile(pathToDBFile, (err, buff) => {
            if (err) {
                reject(err);
            }
            try {
                // @ts-ignore
                const jsonData = JSON.parse(buff);
                resolve(jsonData);
            } catch (error) {
                reject(error);
            }
        });
    })
};

const setData = (updatedData: Operation[]): Promise<undefined | Error> => {
    return new Promise((resolve, reject) => {
        fs.writeFile(pathToDBFile, updatedData, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        })
    })
}

export default {
    getData,
    setData
};
