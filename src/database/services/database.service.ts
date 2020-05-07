import find from 'lodash/find';
import BaseDatabaseService from './base.services';
import database from '../database';

const getDB = () => database;

class DatabaseService extends BaseDatabaseService {
  constructor(dbConnector: any) {
    super();
    this.db = dbConnector();
  }

  async getData(selector: string): Promise<[] | Error> {
    try {
      const neededArray = await this.db[selector];
      return neededArray;
    } catch (e) {
      throw new Error(e);
    }
  }

  async addData(selector: string, data: {}): Promise<object | Error> {
    try {
      await this.db[selector].push(data);
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async findData(selector: string, query: any): Promise<object | undefined | Error> {
    try {
      const neededArray = await this.getData(selector);
      return find(neededArray, query) || {};
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default () => new DatabaseService(getDB);
