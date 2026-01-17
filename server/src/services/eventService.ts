import axios from 'axios';

export const getTrendingPulse = async () => {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Dubai&aqi=no`;

  try {
    const response = await axios.get(url);
    const { temp_c, condition } = response.data.current;

    const dubaiHour = (new Date().getUTCHours() + 4) % 24;

    const locations = [
      // Outdoor
      { name: "Kite Beach", type: "Outdoor", peakHours: [7, 8, 9, 17, 18, 19], base: 45 },
      { name: "Global Village", type: "Outdoor", peakHours: [18, 19, 20, 21, 22, 23], base: 55 },
      { name: "Dubai Miracle Garden", type: "Outdoor", peakHours: [10, 11, 16, 17, 18], base: 40 },
      { name: "Alserkal Avenue", type: "Outdoor", peakHours: [11, 12, 18, 19, 20], base: 35 },

      // Indoor
      { name: "Ski Dubai", type: "Indoor", peakHours: [12, 13, 14, 15, 18, 19], base: 40 },
      { name: "Museum of the Future", type: "Indoor", peakHours: [10, 11, 14, 15, 16], base: 60 },
      { name: "IMG Worlds of Adventure", type: "Indoor", peakHours: [13, 14, 15, 16, 17], base: 45 },
      { name: "The Green Planet", type: "Indoor", peakHours: [11, 12, 13, 15, 16], base: 30 },

      // All Weather
      { name: "Dubai Mall", type: "Indoor", peakHours: [18, 19, 20, 21, 22, 23], base: 65 },
      { name: "Time Out Market", type: "Indoor", peakHours: [13, 14, 20, 21, 22], base: 50 },
      { name: "Aura Skypool", type: "Outdoor", peakHours: [10, 11, 16, 17, 18], base: 55 },
      { name: "Dubai Opera", type: "Indoor", peakHours: [19, 20, 21, 22], base: 40 }
    ];

    return locations.map(loc => {
        let score = loc.base;

        // Indoor
        if (temp_c > 33) {
            if (loc.type === "Indoor") {
                score += 25;
            } else {
                score -= 20;
            }
        } else if (temp_c < 27) {
        // Outdoor
            if (loc.type === "Outdoor") {
                score += 30;
            } else {
                score += 5;
            }
        }

        // Rain
        if (condition.text.toLowerCase().includes("rain")) {
            if (loc.type === "Indoor") {
                score += 30;
            } else {
                score = 10;
            }
        }

        // Peak hours
        const isPeak = loc.peakHours.includes(dubaiHour);
            if (isPeak) {
                score += 25;
            }

      return {
        name: loc.name,
        type: loc.type,
        pulseScore: `${Math.min(Math.max(score, 5), 100)}%`,
        isPeakNow: isPeak,
        weatherAtLocation: `${temp_c}°C, ${condition.text}`,
        status: score > 80 ? "🔥 PACKED" : score > 60 ? "Busy" : "Steady"
      };
    });
  } catch (error) {
    console.error("Pulse Engine Error:", error);
    throw error;
  }
};