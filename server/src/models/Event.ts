import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  name: string;
  location: string;
  category: 'Travel' | 'News' | 'Food' | 'Culture';
  description?: string;
  imageUrl?: string;
  date?: Date;
}

const EventSchema: Schema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Travel', 'News', 'Food', 'Culture'], 
    default: 'Travel' 
  },
  description: { type: String },
  imageUrl: { type: String },
  date: { type: Date }
}, { timestamps: true });

export const EventModel = mongoose.model<IEvent>('Event', EventSchema);