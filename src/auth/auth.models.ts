import { User } from '@src/user/user.models';
import { Request } from "express";

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface AuthInterface {
  generateToken(user: User): Promise<Token>;
  login(user: User): Promise<Token>;
  removeRefreshToken(query: object): Promise<string>;
  refreshToken(refreshToken: string): Promise<Token>;
}

export interface AuthRequest extends Request {
  user: {
    login: string;
  }
}
