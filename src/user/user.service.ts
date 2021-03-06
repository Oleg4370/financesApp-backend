import { User } from './user.models';
import { DatabaseInterface } from '@src/database/database.service';

class UserService {
  constructor(private db: DatabaseInterface) {}

  public async getUser(login: string): Promise<User> {
    return await this.db.find('users', { login });
  }

  public async addNewUser(newUser: User): Promise<any> {
    try {
      const data = await this.db.add('users', newUser);

      return data;
    } catch (err) {
      return new Error(err);
    }
  }
}

export const getUserService = (dbConnect: DatabaseInterface) => new UserService(dbConnect);
