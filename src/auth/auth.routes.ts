import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'express-jwt';
import getUserService from '@src/user/user.service';
import getAuthService from '@src/auth/auth.service';
import { secretKey } from '@src/config';
import { DatabaseInterface } from "@src/database/database.models";

const authRouter = (dbConnect: DatabaseInterface) => {
  const router = Router();
  const UserService = getUserService(dbConnect);
  const AuthService = getAuthService(dbConnect);

  router.post('/login', async (req, res) => {
    const userData = req.body;
    if (!userData?.login || !userData?.password) {
      res.status(500).send('Send incorrect user object');
      return;
    }
    try {
      const { login, hash } = await UserService.getUser(userData.login);
      const token = await AuthService.generateToken({ login });

      bcrypt.compare(userData.password, hash, (err, result) => {
        if (result) {
          res
            .header('Content-Type', 'application/json')
            .send(token);
        } else {
          res.status(403).send(err);
        }
      });
    } catch (e) {
      res.status(500).send(e);
    }
  });

  router.post('/refresh', async (req, res) => {
    const { refreshToken } = req.body;

    try {
      const token = await AuthService.refreshToken(refreshToken);
      res
        .header('Content-Type', 'application/json')
        .send(token);
    } catch (e) {
      res.status(403).send(e);
    }
  });

  router.post('/logout', jwt({ secret: secretKey }), async (req, res) => {
    try {
      // @ts-ignore
      const { login } = req.user;
      await AuthService.removeRefreshToken({login})
      res.status(200).send('Successful logout');
    } catch (e) {
      res.status(500).send('Something went wrong');
    }
  });

  return router;
}

export default authRouter;
