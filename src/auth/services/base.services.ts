import { BaseDatabaseService } from '@src/database/services/base.services';
import { Token } from '../auth.models';

export abstract class BaseAuthService {
  db: BaseDatabaseService;

  public generateToken(query: any): Promise<Token> {
    return new Promise(() => ({}));
  }

  public removeRefreshToken(query: object): Promise<object> {
    return new Promise(() => ({}));
  }

  public refreshToken(token: string): Promise<Token> {
    return new Promise(() => ({}));
  }
}

export default BaseAuthService;
