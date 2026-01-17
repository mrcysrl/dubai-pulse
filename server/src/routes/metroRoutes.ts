import express from 'express';
import { getStatus } from '../controllers/metroController';

const router = express.Router();

router.get('/status', getStatus);

export default router;