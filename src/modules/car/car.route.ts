import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { carZodValidation } from './car.validation';
import { carController } from './car.controller';

const router = express.Router();

router.post('/create', validateRequest(carZodValidation.createCarZodValidation),carController.createCarIntoDB);
router.get('/', carController.getAllCarFromDB);
router.get('/:id', carController.getSingleCarFromDB);
router.delete('/:id', carController.deleteCarFromDB);
router.patch('/update/:id', validateRequest(carZodValidation.updateCarZodValidation),carController.updateCarIntoDB);

export const carRouter = router;
