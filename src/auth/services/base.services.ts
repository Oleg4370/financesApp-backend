import { BaseDatabaseService } from '@src/database/services/base.services';
import { User } from '../auth.models';

export abstract class BaseAuthService {
  db: BaseDatabaseService;

  public getUser(query: any): Promise<User | undefined | Error> {
    return new Promise(() => ({}));
  }

  public addNewUser(user: User): Promise<any> {
    return new Promise(() => ({}));
  }
}

export default BaseAuthService;
