const calculateValue = (ewf, swf, month) => {
  if (month === 'Mar-24') {
    return parseInt(ewf); // Use only ewf for Mar-24
  }
  if (month === 'Sep-24') {
    return 700; // Fixed value for Sep-24
  }
  if (month === 'Dec-24') {
    return parseInt(swf); // Use only swf for Dec-24
  }
  return 0; // All other months
};

const getewfswf = (ewf, swf) => {
  const months = [
    'Mar-24', 'Apr-24', 'May-24', 'Jun-24', 'Jul-24',
    'Aug-24', 'Sep-24', 'Oct-24', 'Nov-24', 'Dec-24',
    'Jan-25', 'Feb-25'
  ];

  const map = {};

  months.forEach((month) => {
    const ewfswf = calculateValue(ewf, swf, month);
    map[month] = Math.round(ewfswf); // Round the value if necessary
  });

  return map;
};

// Export the function for use in other files
module.exports = { getewfswf };
