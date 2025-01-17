
const calculategis= (gissub,gischangedamt,flag) => {

    if (flag) {
      return parseInt(gissub); 
    } else {
      return parseInt(gischangedamt); 
    }
  };
  
  const getGIS = (gissub, gismon, gischangedamt) => {
    const months = [
      'Mar-24', 'Apr-24', 'May-24', 'Jun-24', 'Jul-24',
      'Aug-24', 'Sep-24', 'Oct-24', 'Nov-24', 'Dec-24',
      'Jan-25', 'Feb-25'
    ];
  
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
  