const { monthsconst } = require("../../Months/monthsconst");
const calculateHMA = (hma, newhma, ppsp, isAfterOrEqualMonth) => {
  // If the month is after or equal to the specified month, use the new HMA value
  if (isAfterOrEqualMonth) {
    return parseInt(newhma) + parseInt( ppsp);
  } else {
    return parseInt(hma )+ parseInt(ppsp);
  }
};

const getHMAMap = (hma, hmamon, newhma, ppsp) => {
  const months = monthsconst()

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
