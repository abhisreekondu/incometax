const { monthsconst } = require("../../Months/monthsconst");

const calculateHRA = ( basicSalary,hraper,newhraper,flag) => {

  if (flag ) {
return (basicSalary * newhraper*0.01);
  } else {
    return (basicSalary * hraper*0.01);
  }

};

const getHRAMap = (baseSalary,hraper,hramon,newhraper) => {
  const months = monthsconst();

  const HRAMap = {};
let flag=false;
  months.forEach((month) => {
   if( month  === hramon){
    flag=true;
   }
      // Calculate DA based on the base salary for that month
      const hra = calculateHRA( baseSalary[month],hraper,newhraper,flag);
      HRAMap[month] = Math.round(hra) ; // Store DA as a string to maintain precision
  });

  return HRAMap;
};

  
  // Export the function for use in other files
  module.exports = { getHRAMap };
  