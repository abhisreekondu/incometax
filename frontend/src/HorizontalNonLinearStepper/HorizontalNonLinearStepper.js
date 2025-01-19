import React, { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Employeepersonaldetails from '../components/Employeepersonaldetails/Employeepersonaldetails';
import Employeepayparticulars from '../components/Employeepayparticulars/Employeepayparticulars';
import Allowances from '../components/Allowances(monthly)/Allowances';
import Anyotherarrears from '../components/Anyotherarrears/Anyotherarrears';
import Adavancetax from '../components/Advancetaxpayments/Advancetax';
import DDOdetails from '../components/DDOdetails/DDOdetails';
import Salarydeductions from '../components/Salarydeductions/Salarydeductions';
import SalaryTable from '../Table/SalaryTable';
import { useLocation, useNavigate } from "react-router-dom";
import useFormStore from '../store/formStore';

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const formData = useFormStore((state) => state.formData);
  const setFormData = useFormStore((state) => state.setFormData);
  const navigate = useNavigate();
  const location = useLocation();
  const [showSalaryTable, setShowSalaryTable] = useState(false);
  const [salaryData, setSalaryData] = useState(null); 
  const steps = [
    {
      key: 'employeepersonaldetails',
      component: <Employeepersonaldetails data={formData.personalDetails} onUpdate={(data) => handleFormUpdate('personalDetails', data)} />
    },
    {
      key: 'employeepayparticulars',
      component: <Employeepayparticulars data={formData.payParticulars} onUpdate={(data) => handleFormUpdate('payParticulars', data)} />
    },
    {
      key: 'allowances',
      component: <Allowances data={formData.allowances} onUpdate={(data) => handleFormUpdate('allowances', data)} />
    },
    {
      key: 'anyotherarrears',
      component: <Anyotherarrears data={formData.arrears} onUpdate={(data) => handleFormUpdate('arrears', data)} />
    },
    {
      key: 'advancetax',
      component: <Adavancetax data={formData.advanceTax} onUpdate={(data) => handleFormUpdate('advanceTax', data)} />
    },
    {
      key: 'ddodetails',
      component: <DDOdetails data={formData.ddoDetails} onUpdate={(data) => handleFormUpdate('ddoDetails', data)} />
    },
    {
      key: 'salarydeductions',
      component: <Salarydeductions data={formData.salaryDeductions} onUpdate={(data) => handleFormUpdate('salaryDeductions', data)} />
    },
  ];
  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
  
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    } else if (location.state && location.state.formData) {
      setFormData(location.state.formData);
    }
  }, [location.state]);
  
 

  const totalSteps = () => steps.length;

  const isLastStep = () => activeStep === totalSteps() - 1;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, totalSteps() - 1));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  const handleStep = (step) => {
    setActiveStep(step);
  };

  const handleCalculate = () => {
    console.log('Final form data:', formData);
    // Save formData to localStorage
    localStorage.setItem("formData", JSON.stringify(formData));
    // Send formData to the server
    fetch('http://localhost:3002/submit-salary-data', {
      method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData), // Pass the form data
  credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Server Response:', data);
        setSalaryData(data); // Save the salary data for rendering the table
        setShowSalaryTable(true); // Switch to salary table view
      })
      .catch((error) => {
        console.error('Error submitting form data:', error);
      });


      navigate("/table", { state: { formData } }); 
  };

  const handleFormUpdate = (stepKey, data) => {
    setFormData({
      [stepKey]: data,
    });
  }; 
  
  const getComponentByKey = (key) => {
    const step = steps.find((step) => step.key === key);
    return step ? step.component : null;
  };
  
  // Conditionally render either the Stepper or the Salary Table
  if (showSalaryTable) {
    return <SalaryTable data={salaryData} />;
  }

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const financialYear = `FY ${currentYear-1} - ${currentYear}`;

  return  (
    <>
    <h1  className="alert alert-success m-5 text-center" >Employees Income Tax Online Calculation {financialYear}</h1>
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
        <Stepper nonLinear activeStep={activeStep} sx={{ flexWrap: { xs: 'wrap', sm: 'nowrap' }, justifyContent: 'center' }}>
          {steps.map((step, index) => (
            <Step key={step.key}>
              <StepButton color="inherit" onClick={() => handleStep(index)} />
            </Step>
          ))}
        </Stepper>
      </Box>

      <div>
        <Box sx={{ mt: 2, mb: 1, py: 1 }}>
          {getComponentByKey(steps[activeStep]?.key)}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, gap: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
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
