const { monthsconst } = require("../../Months/monthsconst");
const months=monthsconst()
const calculateValue = (ewf, swf, month) => {
  if (month === months[0]) {
    return parseInt(ewf); // Use only ewf for Mar
  }
  // if (month === 'Sep-24') {
  //   return Math.round((basic)/30); // Fixed value for Sep-24
  // }
  if (month === months[9]) {
    return parseInt(swf); // Use only swf for Dec
  }
  return 0; // All other months
};

const getewfswf = (ewf, swf) => {
  const months = monthsconst()

  const map = {};

  months.forEach((month) => {
    const ewfswf = calculateValue(ewf, swf, month);
    map[month] = Math.round(ewfswf); // Round the value if necessary
  });

  return map;
};

// Export the function for use in other files
module.exports = { getewfswf };
