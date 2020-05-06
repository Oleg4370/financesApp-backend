import { Router } from 'express';
import getOperationsService from './services/operation.service';
import BaseDatabaseService from "@src/database/services/base.services";

const operationRouter = (dbConnect: BaseDatabaseService) => {
  const router = Router();
  const OperationsService = getOperationsService(dbConnect);

  router.get('/', (req, res) => {
    OperationsService.getData()
      .then((data) => {
        res
          .header("Content-Type", 'application/json')
          .send(data);
      })
      .catch((error: any) => {
        res.status(500).send(error);
      });
  });

  router.post('/', (req, res) => {
    OperationsService.addData(req.body)
      .then((savedData: any) => {
        res.status(200).send(savedData);
      })
      .catch((error: any) => {
        res.status(500).send(error);
      });
  });

  return router;
}

export default operationRouter;
