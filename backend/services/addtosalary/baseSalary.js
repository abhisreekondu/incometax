const { monthsconst } = require("../../Months/monthsconst");

const baseSalaries = [
  20000, 20600, 21200, 21800, 22460, 23120, 23780, 24500, 25220,
  25940, 26720, 27500, 28280, 29130, 29980, 30830, 31750, 32670,
  33590, 34580, 35570, 36560, 37640, 38720, 39800, 40970, 42140,
  43310, 44570, 45830, 47090, 48440, 49790, 51140, 52600, 54060,
  55520, 57100, 58680, 60260, 61960, 63660, 65360, 67190, 69020,
  70850, 72810, 74770, 76730, 78820, 80910, 83000, 85240, 87480,
  89720, 92110, 94500, 96890, 99430, 101970, 104510, 107210, 109910,
  112610, 115500, 118390, 121280, 124380, 127480, 130580, 133900,
  137220, 140540, 144150, 147760, 151370, 154980, 158880, 162780,
  166680, 170580
];

// Function to calculate the base salary for each month
const calculateBaseSalary = (incrementMonth, promomon, aasMonth, startingBasicPay) => {
  const months=monthsconst();

  // Determine the starting index based on the provided basic pay
  let baseSalaryIndex = baseSalaries.indexOf(startingBasicPay);
  if (baseSalaryIndex === -1) {
    throw new Error('Invalid starting basic pay provided.');
  }

  const salaryMap = {};

  let incrementApplied = false; // Flag to track if incrementMonth has been processed
  let aasApplied = false;       // Flag to track if aasMonth has been processed
  let promoApplied = false;     // Flag to track if promomon has been processed

  months.forEach((month, index) => {
    // Record the current salary for the month
    salaryMap[month] = baseSalaries[baseSalaryIndex];

    // Increment logic for incrementMonth (applied from the incrementMonth itself)
    if (month === incrementMonth && !incrementApplied) {
      incrementApplied = true;
      if (baseSalaryIndex < baseSalaries.length - 1) {
        baseSalaryIndex++;
      }
      salaryMap[month] = baseSalaries[baseSalaryIndex];
    }

    // AAS logic (applied from the month after aasMonth)
    if (aasMonth && months[index - 1] === aasMonth && !aasApplied) {
      aasApplied = true;
      if (baseSalaryIndex < baseSalaries.length - 1) {
        baseSalaryIndex++;
      }
    }

    // Promotion logic (applied from the month after promomon)
    if (promomon && months[index - 1] === promomon && !promoApplied) {
      promoApplied = true;
      if (baseSalaryIndex < baseSalaries.length - 1) {
        baseSalaryIndex++;
      }
    }

    // Ensure salary updates persist for subsequent months
    salaryMap[month] = baseSalaries[baseSalaryIndex];
  });

  // Sort the months in chronological order
  const sortedSalaryMap = {};
  months.forEach((month) => {
    sortedSalaryMap[month] = salaryMap[month];
  });

  return sortedSalaryMap;
};

module.exports = { calculateBaseSalary };
