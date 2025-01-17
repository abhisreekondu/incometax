// Function to calculate CPS for a single month
const calculateCPS = (baseSalary, da) => {
    return (baseSalary + da) * 0.1;
  };
  
  // Function to generate CPS for all months
  const getCPS = (baseSalary, da) => {
    const months = [
      'Mar-24', 'Apr-24', 'May-24', 'Jun-24', 'Jul-24',
      'Aug-24', 'Sep-24', 'Oct-24', 'Nov-24', 'Dec-24',
      'Jan-25', 'Feb-25',
    ];
  
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
  