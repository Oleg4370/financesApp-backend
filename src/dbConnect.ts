import fs from 'fs';
import { Operation } from './models/baseModels';
import { pathToDBFile } from 'src/config';

const getData = new Promise((resolve, reject) => {
    fs.readFile(pathToDBFile, (err, buff) => {
        if (err) {
            reject(err);
        }
        resolve(buff);
    });
})

module.exports = {
    database: getData,
    setData: (updatedData: Operation[]) => {
        return new Promise((resolve, reject) => {
            fs.writeFile(pathToDBFile, updatedData, (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        })
    }
};
