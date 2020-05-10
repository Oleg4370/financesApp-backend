import { User } from '@src/user/user.models';

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface AuthInterface {
  generateToken(user: User): Promise<Token>;
  removeRefreshToken(query: object): Promise<string>;
  refreshToken(refreshToken: string): Promise<Token>;
}
