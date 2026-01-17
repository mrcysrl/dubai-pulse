import { Request, Response } from 'express';
import * as currencyService from '../services/currencyService';

export const convertCurrency = async (req: Request, res: Response) => {
  try {
    const amount = parseFloat(req.query.amount as string) || 1;
    const data = await currencyService.getLiveConversion(amount);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Currency calculation error" });
  }
};