import express from 'express';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

router.post('/create', validateRequest());

export const carRouter = router;
