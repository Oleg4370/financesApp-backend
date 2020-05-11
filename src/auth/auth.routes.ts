import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'express-jwt';
import status from 'http-status';
import getUserService from '@src/user/user.service';
import getAuthService from '@src/auth/auth.service';
import { secretKey } from '@src/config';
import { DatabaseInterface } from "@src/database/database.models";
import ResponseSender from '@src/utils/responseSender';

const authResMessages = {
  invalidUser: 'Send incorrect user object',
  logout: 'Successful logout'
}

const authRouter = (dbConnect: DatabaseInterface) => {
  const router = Router();
  const UserService = getUserService(dbConnect);
  const AuthService = getAuthService(dbConnect);

  router.post('/login', async (req, res) => {
    const userData = req.body;
    if (!userData?.login || !userData?.password) {
      ResponseSender.sendError(res, authResMessages.invalidUser);
      return;
    }
    try {
      const { login, hash } = await UserService.getUser(userData.login);
      const token = await AuthService.generateToken({ login });

      bcrypt.compare(userData.password, hash, (err, result) => {
        if (result) {
          ResponseSender.sendSuccess(res, token);
        } else {
          res.status(status.FORBIDDEN).send(err);
          ResponseSender.sendError(res, err);
        }
      });
    } catch (error) {
      ResponseSender.sendError(res, error);
    }
  });

  router.post('/refresh', async (req, res) => {
    const { refreshToken } = req.body;

    try {
      const token = await AuthService.refreshToken(refreshToken);
      ResponseSender.sendSuccess(res, token);
    } catch (error) {
      ResponseSender.sendError(res, error, { statusCode: 403 });
    }
  });

  router.post('/logout', jwt({ secret: secretKey }), async (req, res) => {
    try {
      // @ts-ignore
      const { login } = req.user;
      await AuthService.removeRefreshToken({login})
      ResponseSender.sendSuccess(res, authResMessages.logout);
    } catch (e) {
      ResponseSender.sendError(res);
    }
  });

  return router;
}

export default authRouter;
