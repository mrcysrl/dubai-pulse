import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import noteRoutes from './routes/noteRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

app.use(cors());
app.use(express.json());

// The Database Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to Dubai Pulse Database!'))
  .catch((err) => console.error('❌ Database connection error:', err));

app.get('/', (req, res) => {
  res.send('Dubai Pulse API is running...');
});

// Notes API
app.use('/api/notes', noteRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});