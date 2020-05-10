import { Router } from 'express';
import getOperationsService from './operation.service';
import { DatabaseInterface } from "@src/database/database.models";

const operationRouter = (dbConnect: DatabaseInterface) => {
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
