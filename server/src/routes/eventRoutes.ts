import express from 'express';
import { getTrending } from '../controllers/eventController';

const router = express.Router();

router.get('/', getTrending);

export default router;