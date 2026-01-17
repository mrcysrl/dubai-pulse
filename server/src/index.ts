import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// routes
import noteRoutes from './routes/noteRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import eventRoutes from './routes/eventRoutes';
import currencyRoutes from './routes/currencyRoutes'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

app.use(cors());
app.use(express.json());


app.use('/api/notes', noteRoutes);         
app.use('/api/dashboard', dashboardRoutes); 
app.use('/api/trending', eventRoutes);      
app.use('/api/currency', currencyRoutes);   

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to Dubai Pulse Database');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ DB Error:', err));