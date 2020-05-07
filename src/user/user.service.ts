import { User } from './user.models';
import { BaseDatabaseService } from '@src/database/services/base.services';

class UserService {
  db: BaseDatabaseService;

  constructor(db: BaseDatabaseService) {
    this.db = db;
  }

  public async getUser(login: string): Promise<User> {
    return await this.db.findData('users', { login });
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

export default (dbConnect: BaseDatabaseService) => new UserService(dbConnect);
