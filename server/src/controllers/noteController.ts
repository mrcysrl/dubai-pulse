import { Request, Response } from 'express';
import * as noteService from '../services/noteService';

export const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await noteService.fetchAllNotes();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};

export const getNoteById = async (req: Request, res: Response) => {
  try {
    const note = await noteService.fetchNoteById(req.params.id as string);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Error fetching note" });
  }
};

export const addNote = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }
    const newNote = await noteService.createNewNote({ title, content });
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Failed to create note" });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    await noteService.deleteNoteById(req.params.id as string);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete note" });
  }
};