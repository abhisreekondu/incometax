// Function to calculate HRA for each month
const calculateAPGLI = (apglisub,apgliamt,flag) => {

    if (flag) {
      return parseInt(apgliamt); 
    } else {
      return parseInt(apglisub); 
    }
  };
  
  const getAPGLI = (apglisub, apglimon, apgliamt) => {
    const months = [
      'Mar-24', 'Apr-24', 'May-24', 'Jun-24', 'Jul-24',
      'Aug-24', 'Sep-24', 'Oct-24', 'Nov-24', 'Dec-24',
      'Jan-25', 'Feb-25'
    ];
  
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
  