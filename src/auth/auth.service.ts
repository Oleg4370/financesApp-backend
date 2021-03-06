import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { isEmpty } from 'lodash';
import { config } from '@src/config';
import { Token } from './auth.models';
import { getUserService } from '@src/user/user.service';
import { User } from '@src/user/user.models';
import { DatabaseInterface } from '@src/database/database.service';
import { ValidationError } from '@utils/responseBuilder';

export interface AuthInterface {
  generateToken(user: User): Promise<Token>;
  login(user: User): Promise<Token>;
  removeRefreshToken(query: object): Promise<string>;
  refreshToken(refreshToken: string): Promise<Token>;
}

class AuthService implements AuthInterface {
  constructor(private db: DatabaseInterface) {}

  async generateToken(userData: object): Promise<Token> {
    const refreshToken = uuidv4();
    const { secret, expiresIn } = config.token;

    await this.db.add('refreshTokens', { refreshToken, ...userData });
    return {
      accessToken: jwt.sign(userData, secret, { expiresIn }),
      refreshToken
    }
  }

  async login(userData: User): Promise<Token> {
    const UserService = getUserService(this.db);

    const { login, hash } = await UserService.getUser(userData.login);
    if (!login) {
      throw new ValidationError(`User with login ${userData.login} not exist`, '404');
    }
    const isPasswordCorrect = await bcrypt.compare(userData.password, hash);

    if (!isPasswordCorrect) {
      throw new ValidationError('Incorrect user password', '403');
    }

    return await this.generateToken({ login });
  }

  async removeRefreshToken(query: object): Promise<string> {
    const removedObject = await this.db.remove('refreshTokens', query);
    return removedObject.refreshToken;
  }

  async refreshToken(refreshToken: string): Promise<Token> {
    const refreshTokenData = await this.db.find('refreshTokens', { refreshToken });

    if (isEmpty(refreshTokenData)) {
      throw new Error('Token not exist');
    }
    await this.removeRefreshToken({refreshToken});

    return this.generateToken({ login: refreshTokenData.login });
  }
}
export const getAuthService = (dbConnect: DatabaseInterface): AuthInterface => new AuthService(dbConnect);
