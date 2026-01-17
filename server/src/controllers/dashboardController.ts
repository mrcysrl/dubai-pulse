import { Request, Response } from 'express';
import * as newsService from '../services/newsService';

export const getDubaiNews = async (req: Request, res: Response) => {
  try {
    const news = await newsService.fetchDubaiNews();
    res.status(200).json(news);
  } catch (error: any) {
    console.error("News Fetch Error:", error.message);
    res.status(500).json({ message: "Unable to fetch Dubai news at this time" });
  }
};