import { create } from 'zustand';

const useFormStore = create((set) => ({
  formData: {
    personalDetails: {},
    payParticulars: {},
    allowances: {},
    arrears: {},
    advanceTax: {},
    ddoDetails: {},
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
      salaryDeductions: {},
    },
  }),
}));

export default useFormStore;
