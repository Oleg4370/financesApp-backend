import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { Token } from '../auth.models';
import { BaseAuthService } from './base.services';
import { BaseDatabaseService } from '@src/database/services/base.services';
import { secretKey, tokenConfig } from "@src/config";

class AuthService extends BaseAuthService {
  constructor(db: BaseDatabaseService) {
    super();
    this.db = db;
  }

  async generateToken(userData: object): Promise<Token> {
    const refreshToken = uuidv4();

    await this.db.addData('refreshTokens', { refreshToken, userData });
    return {
      accessToken: jwt.sign(userData, secretKey, tokenConfig),
      refreshToken
    }
  }

  async refreshToken(refreshToken: string): Promise<Token> {
    const refreshTokenData = await this.db.findData('refreshTokens', { refreshToken });
    if (!refreshTokenData) {
      throw new Error('Token not exist');
    }

    return {
      accessToken: jwt.sign(refreshTokenData.userData, secretKey, tokenConfig),
      refreshToken: uuidv4()
    }
  }
}

export default (dbConnect: BaseDatabaseService): BaseAuthService => new AuthService(dbConnect);
