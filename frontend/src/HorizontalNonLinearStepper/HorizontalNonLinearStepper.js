import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Employeepersonaldetails from '../components/Employeepersonaldetails/Employeepersonaldetails';
import Employeepayparticulars from '../components/Employeepayparticulars/Employeepayparticulars';
import Allowances from '../components/Allowances(monthly)/Allowances';
import Anyotherarrears from '../components/Anyotherarrears/Anyotherarrears';
import Adavancetax from '../components/Advancetaxpayments/Advancetax';
import DDOdetails from '../components/DDOdetails/DDOdetails';
import Salarydeductions from '../components/Salarydeductions/Salarydeductions';

const steps = [
  { key: 'employeepersonaldetails' },
  { key: 'employeepayparticulars' },
  { key: 'allowances' },
  { key: 'anyotherarrears' },
  { key: 'advancetax' },
  { key: 'ddodetails' },
  { key: 'salarydeductions' },
];

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  // Shared state to store form data for all steps
  const [formData, setFormData] = React.useState({
    personalDetails: {},
    payParticulars: {},
    allowances: {},
    arrears: {},
    advanceTax: {},
    ddoDetails: {},
    salaryDeductions: {},
  });

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
  };

  const handleFormUpdate = (stepKey, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [stepKey]: data,
    }));
  };

  const renderStepContent = (stepKey) => {
    switch (stepKey) {
      case 'employeepersonaldetails':
        return (
          <Employeepersonaldetails
            data={formData.personalDetails}
            onUpdate={(data) => handleFormUpdate('personalDetails', data)}
          />
        );
      case 'employeepayparticulars':
        return (
          <Employeepayparticulars
            data={formData.payParticulars}
            onUpdate={(data) => handleFormUpdate('payParticulars', data)}
          />
        );
      case 'allowances':
        return (
          <Allowances
            data={formData.allowances}
            onUpdate={(data) => handleFormUpdate('allowances', data)}
          />
        );
      case 'anyotherarrears':
        return (
          <Anyotherarrears
            data={formData.arrears}
            onUpdate={(data) => handleFormUpdate('arrears', data)}
          />
        );
      case 'advancetax':
        return (
          <Adavancetax
            data={formData.advanceTax}
            onUpdate={(data) => handleFormUpdate('advanceTax', data)}
          />
        );
      case 'ddodetails':
        return (
          <DDOdetails
            data={formData.ddoDetails}
            onUpdate={(data) => handleFormUpdate('ddoDetails', data)}
          />
        );
      case 'salarydeductions':
        return (
          <Salarydeductions
            data={formData.salaryDeductions}
            onUpdate={(data) => handleFormUpdate('salaryDeductions', data)}
          />
        );
      default:
        return <Typography>Unknown Step</Typography>;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          width: '100%',
          maxWidth: {
            xs: '100%', // 90% width on small screens
            sm: '80%', // 80% width on medium screens
            md: '70%', // 70% width on large screens
          },
          mx: 'auto', // Center align the Stepper horizontally
        }}
      >
        <Stepper
          nonLinear
          activeStep={activeStep}
          sx={{
            flexWrap: {
              xs: 'wrap', // Wrap on small screens
              sm: 'nowrap', // Single line on larger screens
            },
            justifyContent: 'center', // Center steps
          }}
        >
          {steps.map((step, index) => (
            <Step key={step.key}>
              <StepButton color="inherit" onClick={() => handleStep(index)}>
               
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>

      <div>
        <Box sx={{ mt: 2, mb: 1, py: 1 }}>
          {renderStepContent(steps[activeStep]?.key)}
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
  );
}
