import { Request, Response } from 'express';
import { NoteModel } from '../models/Note';

// Get all notes from DB
export const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await NoteModel.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes" });
  }
};

// Save new note to DB
export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const newNote = new NoteModel({ title, content });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(400).json({ message: "Error saving note" });
  }
};