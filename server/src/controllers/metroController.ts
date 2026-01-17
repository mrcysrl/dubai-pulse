import { Request, Response } from 'express';
import * as metroService from '../services/metroService';

export const getStatus = (req: Request, res: Response) => {
  try {
    const status = metroService.getMetroStatus();
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ message: "Metro status unavailable" });
  }
};