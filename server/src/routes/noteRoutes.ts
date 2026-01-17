import express from 'express';
import { getNotes, getNoteById, addNote, deleteNote } from '../controllers/noteController';

const router = express.Router();

router.get('/', getNotes);
router.get('/:id', getNoteById);
router.post('/', addNote);
router.delete('/:id', deleteNote);

export default router;