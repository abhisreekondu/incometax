// Function to calculate DA for a single month
const calculateDA = (month, basicSalary) => {
  // Define DA rates
  const mar = 0.2639; // 26.39%
  const earlyDARate=0.3003//30.03%
  const laterDARate = 0.3367; // 33.67%

  // Define months for rate change
  const earlyRateMonths = [ 'Apr-24', 'May-24', 'Jun-24'];
  const laterRateMonths = ['Jul-24', 'Aug-24', 'Sep-24', 'Oct-24', 'Nov-24', 'Dec-24', 'Jan-25', 'Feb-25'];

  // Check which rate to apply
  if(month== 'Mar-24')
  {
    return basicSalary * mar;
  }
  if (earlyRateMonths.includes(month)) {
      return basicSalary * earlyDARate;
  } else if (laterRateMonths.includes(month)) {
      return basicSalary * laterDARate;
  } else {
      throw new Error('Invalid month provided');
  }
};

// Function to get DA map for months from Mar-24 to Feb-25
const getDAMap = (baseSalary) => {
  const months = [
      'Mar-24', 'Apr-24', 'May-24', 'Jun-24', 'Jul-24',
      'Aug-24', 'Sep-24', 'Oct-24', 'Nov-24', 'Dec-24',
      'Jan-25', 'Feb-25'
  ];

  const daMap = {};

  months.forEach((month) => {
      // Calculate DA based on the base salary for that month
      const da = calculateDA(month, baseSalary[month]);
      daMap[month] =Math.round(da) // Store DA as a string to maintain precision
  });

  return daMap;
};

module.exports = { getDAMap };
