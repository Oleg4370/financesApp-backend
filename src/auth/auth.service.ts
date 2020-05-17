import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { isEmpty } from 'lodash';
import { Token, AuthInterface } from './auth.models';
import getUserService from '@src/user/user.service';
import { User } from '@src/user/user.models';
import { DatabaseInterface } from '@src/database/database.models';
import { secretKey, tokenConfig } from "@src/config";

class AuthService implements AuthInterface {
  constructor(private db: DatabaseInterface) {}

  async generateToken(userData: object): Promise<Token> {
    const refreshToken = uuidv4();

    await this.db.add('refreshTokens', { refreshToken, ...userData });
    return {
      accessToken: jwt.sign(userData, secretKey, tokenConfig),
      refreshToken
    }
  }

  async login(userData: User): Promise<Token> {
    const UserService = getUserService(this.db);

    const { login, hash } = await UserService.getUser(userData.login);
    if (!login) {
      throw new Error(`User with login ${userData.login} not exist`);
    }
    const isPasswordCorrect = await bcrypt.compare(userData.password, hash);

    if (isPasswordCorrect) {
      return await this.generateToken({ login });
    } else {
      throw new Error(`User password are incorrect`);
    }
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

export default (dbConnect: DatabaseInterface): AuthInterface => new AuthService(dbConnect);
