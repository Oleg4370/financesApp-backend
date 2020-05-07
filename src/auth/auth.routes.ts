import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import getAuthService from './services/auth.service';
import { secretKey } from '@src/config';
import BaseDatabaseService from "@src/database/services/base.services";
import { User } from "@src/auth/auth.models";

const authRouter = (dbConnect: BaseDatabaseService) => {
  const router = Router();
  const AuthService = getAuthService(dbConnect);

  router.post('/login', (req, res) => {
    const userData = req.body;
    // tslint:disable-next-line:no-console
    console.log('userData', userData);
    if (!userData?.login || !userData?.password) {
      res.status(500).send('Send incorrect user object');
      return;
    }
    AuthService.getUser(userData.login)
      .then((user:User) => {
        bcrypt.compare(userData.password, user.hash, (err, result) => {
          if (result) {
            res
              .header("Content-Type", 'application/json')
              .send({
                accessToken: jwt.sign({ login: user.login }, secretKey),
                refreshToken: uuidv4()
              });
          } else {
            res.status(500).send({ errorMessage: err, errorType: 'bcrypt.compare error' });
          }
        });
      })
      .catch((error: any) => {
        res.status(500).send({ errorMessage: error, errorType: 'AuthService error' });
      });
  });
  return router;
}

export default authRouter;
