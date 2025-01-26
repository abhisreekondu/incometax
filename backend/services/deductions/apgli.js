const { monthsconst } = require("../../Months/monthsconst");
const calculateAPGLI = (apglisub,apgliamt,flag) => {

    if (flag) {
      return parseInt(apgliamt); 
    } else {
      return parseInt(apglisub); 
    }
  };
  
  const getAPGLI = (apglisub, apglimon, apgliamt) => {
    const months = monthsconst();
  
    const APGLI = {};
  let flag=false;
    months.forEach((month) => {
        if(month==apglimon)
        {
            flag=true;
        }
      // Pass the current month to `calculateHMA`
      const apgli = calculateAPGLI(apglisub,apgliamt,flag);
      APGLI[month] = Math.round(apgli); 
    });
  
    return APGLI;
  };
  
  // Export the function for use in other files
  module.exports = { getAPGLI };
  