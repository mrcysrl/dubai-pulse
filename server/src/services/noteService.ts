import Note, { INote } from '../models/Note';

export const fetchAllNotes = async () => {
  return await Note.find().sort({ createdAt: -1 });
};

export const fetchNoteById = async (id: string) => {
  return await Note.findById(id);
};

export const createNewNote = async (noteData: Partial<INote>) => {
  const note = new Note(noteData);
  return await note.save();
};

export const deleteNoteById = async (id: string) => {
  return await Note.findByIdAndDelete(id);
};