import express from 'express';
import getOperationsService from '@src/services/operations.service';

const router = express.Router();
const OperationsService = getOperationsService();

router.get('/', (req, res) => {
    OperationsService.getData()
        .then((data )=> {
            res
                .header("Content-Type",'application/json')
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

export default router;
