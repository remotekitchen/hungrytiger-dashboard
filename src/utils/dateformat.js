function greetings() {
  const canadaTimeOptions = {
    timeZone: 'Canada/Eastern',
    hour12: false, // Use 24-hour format
    hour: 'numeric',
  };

  const canadaHour = new Date().toLocaleTimeString('en-US', canadaTimeOptions);
  const hour = parseInt(canadaHour);

  if (hour < 5) {
    return "Good Night";
  } else if (hour < 12) {
    return "Good Morning";
  } else if (hour < 18) {
    return "Good Afternoon";
  } else if (hour < 22) {
    return "Good Evening";
  }
  
  return "Good Night";
}

export { greetings };
