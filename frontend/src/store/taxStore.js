// src/store/taxStore.js
import {create} from 'zustand';

const useTaxStore = create((set) => ({
  // Initialize the state
  taxDetails: {},
  muloften: 0,

  // Action to calculate and set the tax details
  setTaxDetails: (grossSalary, advanceTax) => {
    const netincsal = grossSalary - 75000; // Calculate net income from salary
    const muloften = Math.round(netincsal / 10) * 10; // Round to nearest 10
    const taxDetails = calculateTaxDetails(muloften); // Call the function to calculate tax details
    
    const taxoninc =
      taxDetails?.a.tax +
      taxDetails?.b.tax +
      taxDetails?.c.tax +
      taxDetails?.d.tax +
      taxDetails?.e.tax +
      taxDetails?.f.tax;
    const cess = Math.round(taxoninc * 0.04);
    const nettax = taxoninc + cess;

    const totaladvtax = advanceTax.reduce(
      (sum, value) => sum + (Number(value) || 0),
      0
    );

    const totaltax = nettax - totaladvtax;

    // Update the state
    set({
      muloften,
      taxDetails,
      taxoninc,
      cess,
      nettax,
      totaladvtax,
      totaltax,
    });
  },
}));

// Function to calculate tax details
const calculateTaxDetails = (muloften) => {
  const taxDetails = {
    a: { taxable: 0, tax: 0 }, // Up to 3,00,000
    b: { taxable: 0, tax: 0 }, // 3,00,001 to 7,00,000
    c: { taxable: 0, tax: 0 }, // 7,00,001 to 10,00,000
    d: { taxable: 0, tax: 0 }, // 10,00,001 to 12,00,000
    e: { taxable: 0, tax: 0 }, // 12,00,001 to 15,00,000
    f: { taxable: 0, tax: 0 }, // Above 15,00,000
  };

  if (muloften <= 300000) {
    taxDetails.a.taxable = muloften;
    taxDetails.a.tax = 0; // No tax for income up to 3,00,000
  } else if (muloften <= 700000) {
    taxDetails.a.taxable = 300000;
    taxDetails.a.tax = 0;
    taxDetails.b.taxable = muloften - 300000;
    taxDetails.b.tax = Math.round(taxDetails.b.taxable * 0.05); // 5%
  } else if (muloften <= 1000000) {
    taxDetails.a.taxable = 300000;
    taxDetails.a.tax = 0;
    taxDetails.b.taxable = 400000;
    taxDetails.b.tax = Math.round(taxDetails.b.taxable * 0.05); // 5%
    taxDetails.c.taxable = muloften - 700000;
    taxDetails.c.tax = Math.round(taxDetails.c.taxable * 0.1); // 10%
  } else if (muloften <= 1200000) {
    taxDetails.a.taxable = 300000;
    taxDetails.a.tax = 0;
    taxDetails.b.taxable = 400000;
    taxDetails.b.tax = Math.round(taxDetails.b.taxable * 0.05); // 5%
    taxDetails.c.taxable = 300000;
    taxDetails.c.tax = Math.round(taxDetails.c.taxable * 0.1); // 10%
    taxDetails.d.taxable = muloften - 1000000;
    taxDetails.d.tax = Math.round(taxDetails.d.taxable * 0.15); // 15%
  } else if (muloften <= 1500000) {
    taxDetails.a.taxable = 300000;
    taxDetails.a.tax = 0;
    taxDetails.b.taxable = 400000;
    taxDetails.b.tax = Math.round(taxDetails.b.taxable * 0.05); // 5%
    taxDetails.c.taxable = 300000;
    taxDetails.c.tax = Math.round(taxDetails.c.taxable * 0.1); // 10%
    taxDetails.d.taxable = 200000;
    taxDetails.d.tax = Math.round(taxDetails.d.taxable * 0.15); // 15%
    taxDetails.e.taxable = muloften - 1200000;
    taxDetails.e.tax = Math.round(taxDetails.e.taxable * 0.2); // 20%
  } else {
    taxDetails.a.taxable = 300000;
    taxDetails.a.tax = 0;
    taxDetails.b.taxable = 400000;
    taxDetails.b.tax = Math.round(taxDetails.b.taxable * 0.05); // 5%
    taxDetails.c.taxable = 300000;
    taxDetails.c.tax = Math.round(taxDetails.c.taxable * 0.1); // 10%
    taxDetails.d.taxable = 200000;
    taxDetails.d.tax = Math.round(taxDetails.d.taxable * 0.15); // 15%
    taxDetails.e.taxable = 300000;
    taxDetails.e.tax = Math.round(taxDetails.e.taxable * 0.2); // 20%
    taxDetails.f.taxable = muloften - 1500000;
    taxDetails.f.tax = Math.round(taxDetails.f.taxable * 0.3); // 30%
  }

  return taxDetails;
};

export default useTaxStore;
