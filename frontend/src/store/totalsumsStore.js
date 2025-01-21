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
  setSums: (data) => set({ sums: data }),
  clearSums: () => set({ sums: {} }),
}));

export default usetotalsumStore;
