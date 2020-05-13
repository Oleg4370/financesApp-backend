import {find, reject} from 'lodash';
import { DatabaseInterface } from '@src/database/database.models';
import database from './database';

const getDB = () => database;

class DatabaseService implements DatabaseInterface {
  db: any;
  constructor(dbConnector: any) {
    this.db = dbConnector();
  }

  async findAll(selector: string): Promise<[]> {
    try {
      const neededArray = await this.db[selector];
      return neededArray;
    } catch (e) {
      throw new Error(e);
    }
  }

  async add(selector: string, data: {}): Promise<object | Error> {
    try {
      await this.db[selector].push(data);
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async find(selector: string, query: any): Promise<object | undefined | Error> {
    try {
      const neededArray = await this.findAll(selector);
      return find(neededArray, query) || {};
    } catch (e) {
      throw new Error(e);
    }
  }

  async remove(selector: string, query: object): Promise<object> {
    try {
      const neededArray = await this.findAll(selector);
      const updatedData = reject(neededArray, query);

      this.db[selector] = updatedData;
      return query;
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default () => new DatabaseService(getDB);
