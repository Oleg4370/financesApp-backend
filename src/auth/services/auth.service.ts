import { User } from '../auth.models';
import { BaseAuthService } from './base.services';
import { BaseDatabaseService } from '@src/database/services/base.services';

class AuthService extends BaseAuthService {
  constructor(db: BaseDatabaseService) {
    super();
    this.db = db;
  }

  public async getUser(login: string): Promise<User | undefined | Error> {
    try {
      return await this.db.findData('users', { login });
    } catch (err) {
      return new Error(err);
    }
  }

  public async addNewUser(newUser: User): Promise<any> {
    try {
      const data = await this.db.addData('users', newUser);

      return data;
    } catch (err) {
      return new Error(err);
    }
  }
}

export default (dbConnect: BaseDatabaseService): BaseAuthService => new AuthService(dbConnect);
