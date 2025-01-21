import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Employeepersonaldetails from '../components/Employeepersonaldetails/Employeepersonaldetails';
import Employeepayparticulars from '../components/Employeepayparticulars/Employeepayparticulars';
import Allowances from '../components/Allowances(monthly)/Allowances';
import Anyotherarrears from '../components/Anyotherarrears/Anyotherarrears';
import Adavancetax from '../components/Advancetaxpayments/Advancetax';
import DDOdetails from '../components/DDOdetails/DDOdetails';
import Salarydeductions from '../components/Salarydeductions/Salarydeductions';
import { useNavigate } from "react-router-dom";
import useFormStore from '../store/formStore';
import useSalaryDataStore from '../store/salaryDataStore';
import Houseadd from "../components/Houseadd/Houseadd"

export default function HorizontalNonLinearStepper() {
  const [activeStepKey, setActiveStepKey] = useState('employeepersonaldetails');
  const formData = useFormStore((state) => state.formData);
  const setFormData = useFormStore((state) => state.setFormData);
  const setSalaryData = useSalaryDataStore((state) => state.setSalaryData);
  const navigate = useNavigate();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const financialYear = `FY ${currentYear-1} - ${currentYear}`;

  // Steps for the form navigation
  const steps = {
    employeepersonaldetails: {
      prev: null,
      component: <Employeepersonaldetails data={formData.personalDetails} onUpdate={(data) => handleFormUpdate('personalDetails', data)} />,
      next: 'employeepayparticulars',
    },
    employeepayparticulars: {
      prev: 'employeepersonaldetails',
      component: <Employeepayparticulars data={formData.payParticulars} onUpdate={(data) => handleFormUpdate('payParticulars', data)} />,
      next: 'allowances',
    },
    allowances: {
      prev: 'employeepayparticulars',
      component: <Allowances data={formData.allowances} onUpdate={(data) => handleFormUpdate('allowances', data)} />,
      next: 'anyotherarrears',
    },
    anyotherarrears: {
      prev: 'allowances',
      component: <Anyotherarrears data={formData.arrears} onUpdate={(data) => handleFormUpdate('arrears', data)} />,
      next: 'advancetax'
    },
    advancetax: {
      prev: 'anyotherarrears',
      component: <Adavancetax data={formData.advanceTax} onUpdate={(data) => handleFormUpdate('advanceTax', data)} />,
      next: 'ddodetails',
    },
    ddodetails: {
      prev: 'advancetax',
      component: <DDOdetails data={formData.ddoDetails} onUpdate={(data) => handleFormUpdate('ddoDetails', data)} />,
      next: 'houseadd',
    },
    houseadd:{
      prev:'ddodetails',
      component:<Houseadd data={formData.houseAdd} onUpdate={(data) => handleFormUpdate('houseAdd', data)} />,
      next:'salarydeductions'
    },
    salarydeductions: {
      prev: 'houseadd',
      component: <Salarydeductions data={formData.salaryDeductions} onUpdate={(data) => handleFormUpdate('salaryDeductions', data)} />,
      next: null,
    }
  };

  

  const isFirstStep = () => activeStepKey === 'employeepersonaldetails';
  const isLastStep = () => activeStepKey === 'salarydeductions';

  const handleNext = () => {
    const nextStep = steps[activeStepKey]?.next;
    if (nextStep) {
      setActiveStepKey(nextStep);
    }
  };
  
  const handleBack = () => {
    const prevStep = steps[activeStepKey]?.prev;
    if (prevStep) {
      setActiveStepKey(prevStep);
    }
  };
  
  const handleStep = (key) => {
    if (steps[key]) {
      setActiveStepKey(key);
    }
  };

  const handleFormUpdate = (stepKey, data) => {
    setFormData({
      [stepKey]: data,
    });
  };

  const handleCalculate = async () => {
    console.log('Final form data:', formData);

    try {
      const response = await fetch('http://localhost:3002/submit-salary-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const data = await response.json();
      console.log('Server Response:', data);

      setSalaryData(data);

      navigate("/table");
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return  (
    <>
    <Typography variant="h4" align="center" gutterBottom className="alert alert-success m-5">
      Employees Income Tax Online Calculation {financialYear}
    </Typography>
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          width: '100%',
          maxWidth: {
            xs: '100%',
            sm: '80%',
            md: '70%',
          },
          mx: 'auto',
        }}
      >
        <Stepper nonLinear activeStep={Object.keys(steps).indexOf(activeStepKey)} sx={{ flexWrap: { xs: 'wrap', sm: 'nowrap' }, justifyContent: 'center' }}>
          {Object.keys(steps).map((key) => (
            <Step key={key}>
              <StepButton color="inherit" onClick={() => handleStep(key)} />
            </Step>
          ))}
        </Stepper>
      </Box>

      <div>
        <Box sx={{ mt: 2, mb: 1, py: 1 }}>
          {steps[activeStepKey]?.component || <Typography>Unknown Step</Typography>}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, gap: 2 }}>
          <Button
            color="inherit"
            disabled={isFirstStep()}
            onClick={handleBack}
            sx={{
              ml: 15,
              px: 4,
              border: '1px solid black',
              borderRadius: 2,
            }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          {isLastStep() ? (
            <Button
              onClick={handleCalculate}
              variant="contained"
              sx={{
                px: 4,
                mr: 15,
              }}
            >
              Calculate
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              variant="contained"
              sx={{
                px: 4,
                mr: 15,
              }}
            >
              Next
            </Button>
          )}
        </Box>
      </div>
    </Box>
    </>
  );
}