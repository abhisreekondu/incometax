// Function to calculate HMA for each month
const calculateHMA = (hma, newhma, ppsp, isAfterOrEqualMonth) => {
  // If the month is after or equal to the specified month, use the new HMA value
  if (isAfterOrEqualMonth) {
    return parseInt(newhma) + parseInt( ppsp);
  } else {
    return parseInt(hma )+ parseInt(ppsp);
  }
};

const getHMAMap = (hma, hmamon, newhma, ppsp) => {
  const months = [
    'Mar-24', 'Apr-24', 'May-24', 'Jun-24', 'Jul-24',
    'Aug-24', 'Sep-24', 'Oct-24', 'Nov-24', 'Dec-24',
    'Jan-25', 'Feb-25',
  ];

  const HMAMap = {};

  let applyNewHMA = false; // Flag to track if new HMA value should be used

  months.forEach((month) => {
    // Check if the current month is the specified HMA month or after it
    if (month === hmamon) {
      applyNewHMA = true; // Start applying the new HMA value
    }

    // Calculate HMA based on the current state of the flag
    const hmaValue = calculateHMA(hma, newhma, ppsp, applyNewHMA);

    // Store the rounded HMA value in the map
    HMAMap[month] = Math.round(hmaValue);
  });

  return HMAMap;
};

// Export the function for use in other files
module.exports = { getHMAMap };
