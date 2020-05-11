import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { Token, AuthInterface } from './auth.models';
import { DatabaseInterface } from '@src/database/database.models';
import { secretKey, tokenConfig } from "@src/config";

class AuthService implements AuthInterface {
  constructor(private db: DatabaseInterface) {}

  async generateToken(userData: object): Promise<Token> {
    const refreshToken = uuidv4();

    await this.db.addData('refreshTokens', { refreshToken, ...userData });
    return {
      accessToken: jwt.sign(userData, secretKey, tokenConfig),
      refreshToken
    }
  }

  async removeRefreshToken(query: object): Promise<string> {
    const removedObject = await this.db.removeData('refreshTokens', query);
    return removedObject.refreshToken;
  }

  async refreshToken(refreshToken: string): Promise<Token> {
    const refreshTokenData = await this.db.findData('refreshTokens', { refreshToken });
    if (!refreshTokenData) {
      throw new Error('Token not exist');
    }
    await this.removeRefreshToken({refreshToken});

    return this.generateToken(refreshTokenData.userData);
  }
}

export default (dbConnect: DatabaseInterface): AuthInterface => new AuthService(dbConnect);