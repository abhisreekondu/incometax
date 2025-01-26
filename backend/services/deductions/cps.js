const { monthsconst } = require("../../Months/monthsconst");
const calculateCPS = (baseSalary, da) => {
    return (baseSalary + da) * 0.1;
  };
  
  // Function to generate CPS for all months
  const getCPS = (baseSalary, da) => {
    const months = monthsconst();
  
    const CPSMap = {};
  
    months.forEach((month) => {
      // Check if baseSalary and DA values exist for the month
      const monthlyBaseSalary = baseSalary[month] ;
      const monthlyDA = da[month] || 0;
  
      // Calculate CPS
      const cps = calculateCPS(monthlyBaseSalary, monthlyDA);
  
      // Store rounded CPS value for the month
      CPSMap[month] = Math.round(cps);
    });
  
    return CPSMap;
  };
  
  module.exports = { getCPS };
  