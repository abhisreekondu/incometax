module.exports.monthsconst = () => {

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0 (Jan) to 11 (Dec)
  
    // Determine financial year start and end
    const financialYearStart = currentMonth < 3 ? currentYear - 1 : currentYear;
    const financialYearEnd = financialYearStart + 1;
  
    // Generate months for the financial year
    return [
      `Mar-${(financialYearEnd - 1).toString().slice(-2)}`,
      `Apr-${(financialYearEnd - 1).toString().slice(-2)}`,
      `May-${(financialYearEnd - 1).toString().slice(-2)}`,
      `Jun-${(financialYearEnd - 1).toString().slice(-2)}`,
      `Jul-${(financialYearEnd - 1).toString().slice(-2)}`,
      `Aug-${(financialYearEnd - 1).toString().slice(-2)}`,
      `Sep-${(financialYearEnd - 1).toString().slice(-2)}`,
      `Oct-${(financialYearEnd - 1).toString().slice(-2)}`,
      `Nov-${(financialYearEnd - 1).toString().slice(-2)}`,
      `Dec-${(financialYearEnd - 1).toString().slice(-2)}`,
      `Jan-${financialYearEnd.toString().slice(-2)}`,
      `Feb-${financialYearEnd.toString().slice(-2)}`,
    ];
  };


