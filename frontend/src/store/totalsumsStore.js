import { create } from "zustand";

const usetotalsumStore = create((set) => ({
  sums: {
    basic: 0,
    da: 0,
    hra: 0,
    ir: 0,
    hma: 0,
    cca: 0,
    pha: 0,
    others: 0,
    gross: 0,
    cps: 0,
    pf: 0,
    apgli: 0,
    gis: 0,
    pt: 0,
    itadv: 0,
    ehf: 0,
    ewfswf: 0,
    otherdeductions: 0,
    totaldeductions: 0,
    net: 0,
  },

  // Function to calculate and set sums directly in the store
  setSums: (rows, otherRows) => {
    const sums = {
      basic: 0,
      da: 0,
      hra: 0,
      ir: 0,
      hma: 0,
      cca: 0,
      pha: 0,
      others: 0,
      gross: 0,
      cps: 0,
      pf: 0,
      apgli: 0,
      gis: 0,
      pt: 0,
      itadv: 0,
      ehf: 0,
      ewfswf: 0,
      otherdeductions: 0,
      totaldeductions: 0,
      net: 0,
    };

    // Loop through rows to calculate sums
    rows.forEach((row) => {
      sums.basic += parseInt(row.basic || 0);
      sums.da += parseInt(row.da || 0);
      sums.hra += parseInt(row.hra || 0);
      sums.ir += parseInt(row.ir || 0);
      sums.hma += parseInt(row.hma || 0);
      sums.cca += parseInt(row.cca || 0);
      sums.pha += parseInt(row.pha || 0);
      sums.others += parseInt(row.others || 0);
      sums.gross += parseInt(row.gross || 0);
      sums.pf += parseInt(row.pf || 0);
      sums.cps += parseInt(row.cps || 0);
      sums.apgli += parseInt(row.apgli || 0);
      sums.gis += parseInt(row.gis || 0);
      sums.pt += 200; // PT is constant
      sums.itadv += parseInt(row.itadv || 0);
      sums.ehf += parseInt(row.ehf || 0);
      sums.ewfswf += parseInt(row.ewfswf || 0);
      sums.otherdeductions += parseInt(row.otherdeductions || 0);
      sums.totaldeductions += parseInt(row.totaldeductions || 0);
      sums.net += parseInt(row.net || 0);
    });

    // Add values from otherRows (similar to the logic you wrote)
    sums.basic +=
      parseInt(otherRows.aasbasic || 0) +
      parseInt(otherRows.promobasic || 0) +
      parseInt(otherRows.slbasic || 0) +
      parseInt(otherRows.othbasic || 0);
    sums.da +=
      parseInt(otherRows.aasda || 0) +
      parseInt(otherRows.promoda || 0) +
      parseInt(otherRows.slda || 0) +
      parseInt(otherRows.othda || 0);
    sums.hra +=
      parseInt(otherRows.aashra || 0) +
      parseInt(otherRows.promohra || 0) +
      parseInt(otherRows.slhra || 0) +
      parseInt(otherRows.othhra || 0);

    // Calculate gross and net explicitly
    sums.gross +=
      parseInt(otherRows.aasbasic || 0) +
      parseInt(otherRows.promobasic || 0) +
      parseInt(otherRows.slbasic || 0) +
      parseInt(otherRows.othbasic || 0) +
      parseInt(otherRows.aasda || 0) +
      parseInt(otherRows.promoda || 0) +
      parseInt(otherRows.slda || 0) +
      parseInt(otherRows.othda || 0) +
      parseInt(otherRows.aashra || 0) +
      parseInt(otherRows.promohra || 0) +
      parseInt(otherRows.slhra || 0) +
      parseInt(otherRows.othhra || 0);

    sums.net += sums.gross - sums.totaldeductions; // net = gross - total deductions

    // Now update the store with calculated sums
    set({ sums });
  },

  clearSums: () => set({ sums: {} }),
}));

export default usetotalsumStore;
