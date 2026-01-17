import express from 'express';
import { getDubaiNews } from '../controllers/dashboardController';

const router = express.Router();

router.get('/news', getDubaiNews);

export default router;