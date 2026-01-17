import axios from 'axios';

export const getLiveConversion = async (amount: number = 1) => {
  try {
    // ExchangeRate-API (Free Tier)
    const response = await axios.get(`https://open.er-api.com/v6/latest/AED`);
    const rateToPHP = response.data.rates.PHP;

    return {
      base: "AED",
      target: "PHP",
      unitRate: rateToPHP.toFixed(4), // 1 AED = X PHP
      inputAmount: amount,
      convertedAmount: (amount * rateToPHP).toFixed(2),
      lastUpdated: response.data.time_last_update_utc,
    };
  } catch (error) {
    console.error("Currency Service Error:", error);
    throw error;
  }
};