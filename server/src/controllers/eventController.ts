import { Request, Response } from 'express';
import * as eventService from '../services/eventService';

export const getTrending = async (req: Request, res: Response) => {
  try {
    const pulseData = await eventService.getTrendingPulse();
    res.status(200).json(pulseData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching weather-linked pulse" });
  }
};