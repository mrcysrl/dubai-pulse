import express from 'express';
import { getNotes, createNote } from '../controllers/noteController';

const router = express.Router();

// Define the endpoints
router.get('/', getNotes);   // GET /api/notes
router.post('/', createNote); // POST /api/notes

export default router;