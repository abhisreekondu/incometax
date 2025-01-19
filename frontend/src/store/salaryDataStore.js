import { create } from 'zustand';

const useSalaryDataStore = create((set) => ({
  salaryData: null,
  setSalaryData: (data) => set({ salaryData: data }),
  clearSalaryData: () => set({ salaryData: null }),
}));

export default useSalaryDataStore;
