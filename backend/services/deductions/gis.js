const { monthsconst } = require("../../Months/monthsconst");
const calculategis= (gissub,gischangedamt,flag) => {

    if (flag) {
      return parseInt(gissub); 
    } else {
      return parseInt(gischangedamt); 
    }
  };
  
  const getGIS = (gissub, gismon, gischangedamt) => {
    const months = monthsconst();
  
    const GIS = {};
  let flag=false;
    months.forEach((month) => {
        if(month==gismon)
        {
            flag=true;
        }
      // Pass the current month to `calculateHMA`
      const gis = calculategis(gissub,gischangedamt,flag);
      GIS[month] = Math.round(gis); 
    });
  
    return GIS;
  };
  
  // Export the function for use in other files
  module.exports = { getGIS};
  