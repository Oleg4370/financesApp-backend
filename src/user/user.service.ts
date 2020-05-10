import { User } from './user.models';
import { DatabaseInterface } from '@src/database/database.models';

class UserService {
  db: DatabaseInterface;

  constructor(db: DatabaseInterface) {
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

export default (dbConnect: DatabaseInterface) => new UserService(dbConnect);
