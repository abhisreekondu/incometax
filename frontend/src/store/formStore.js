import { create } from 'zustand';

const useFormStore = create((set) => ({
  formData: {
    personalDetails: {},
    payParticulars: {},
    allowances: {},
    arrears: {},
    advanceTax: {},
    ddoDetails: {},
    houseAdd:{},
    salaryDeductions: {},
  },
  setFormData: (updatedData) => set((state) => ({ formData: { ...state.formData, ...updatedData } })),
  resetFormData: () => set({
    formData: {
      personalDetails: {},
      payParticulars: {},
      allowances: {},
      arrears: {},
      advanceTax: {},
      ddoDetails: {},
      houseAdd:{},
      salaryDeductions: {},
    },
  }),
}));

export default useFormStore;
