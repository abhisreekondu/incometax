const { monthsconst } = require("../../Months/monthsconst");
const months = monthsconst()
const calculateDA = (month, basicSalary) => {
  // Define DA rates
 
  const mar = 0.2639; // 26.39%
  const earlyDARate=0.3003//30.03%
  const laterDARate = 0.3367; // 33.67%

  // Define months for rate change
  const earlyRateMonths = months.slice(1,4)//apr,may,jun
  const laterRateMonths = months.slice(4,12)//jul to feb

  // Check which rate to apply
  if(month== months[0])
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


  const daMap = {};

  months.forEach((month) => {
      // Calculate DA based on the base salary for that month
      const da = calculateDA(month, baseSalary[month]);
      daMap[month] =Math.round(da) // Store DA as a string to maintain precision
  });

  return daMap;
};

module.exports = { getDAMap };
