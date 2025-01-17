const calculateValue = (ewf,swf,month)=>{
    if(month==='Sep-24')
    {
        return 707+parseInt(ewf)+parseInt(swf);
    }
return parseInt(ewf)+parseInt(swf);
};



const getewfswf = (ewf,swf) => {
    const months = [
      'Mar-24', 'Apr-24', 'May-24', 'Jun-24', 'Jul-24',
      'Aug-24', 'Sep-24', 'Oct-24', 'Nov-24', 'Dec-24',
      'Jan-25', 'Feb-25'
    ];
  
    const map = {};

    months.forEach((month) => {
        
      // Pass the current month to `calculateHMA`
      const ewfswf = calculateValue(ewf,swf,month);
      map[month] = Math.round(ewfswf); 
    });
  
    return map;
  };
  
  // Export the function for use in other files
  module.exports = { getewfswf };
  