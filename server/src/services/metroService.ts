export const getMetroStatus = () => {
  const dubaiHour = (new Date().getUTCHours() + 4) % 24;
  const dubaiDay = new Date().getUTCDay(); // 0 = Sun, 5 = Fri, 6 = Sat

  // Operating Hours
  let isOpen = false;
  if (dubaiDay === 5) isOpen = dubaiHour >= 5 || dubaiHour < 1; 
  else if (dubaiDay === 0) isOpen = dubaiHour >= 8;
  else isOpen = dubaiHour >= 5;

  const getLineDetails = (lineName: string) => {
    if (!isOpen) return { status: "🔴 Closed", crowd: "N/A", alert: "Service starts at 5:00 AM" };
    
    // Rush Hour, not Jackie Chan
    const isRushHour = (dubaiHour >= 7 && dubaiHour <= 9) || (dubaiHour >= 17 && dubaiHour <= 20);
    
    return {
      status: "🟢 Operational",
      crowd: isRushHour ? "High (Rush Hour)" : "Low (Smooth)",
      frequency: isRushHour ? "Every 2-4 mins" : "Every 7-10 mins"
    };
  };

  return {
    lastUpdated: new Date().toLocaleTimeString(),
    lines: [
      { name: "Red Line", ...getLineDetails("Red Line") },
      { name: "Green Line", ...getLineDetails("Green Line") },
      { name: "Dubai Tram", ...getLineDetails("Dubai Tram") }
    ]
  };
};