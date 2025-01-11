import './App.css';
import Employeepersonaldetails from './components/Employeepersonaldetails/Employeepersonaldetails';
import Employeepayparticulars from './components/Employeepayparticulars/Employeepayparticulars';
import Allowances from './components/Allowances(monthly)/Allowances';
import Anyotherarrears from './components/Anyotherarrears/Anyotherarrears';
import Adavancetax from './components/Advancetaxpayments/Advancetax';
import DDOdetails from './components/DDOdetails/DDOdetails';
import Salarydeductions from './components/Salarydeductions/Salarydeductions';
import Houseadd from './components/Houseadd/Houseadd';

function App() {
  const handleSubmit = (e) => {
    e.preventDefault();
  
  };
  return (
    <div className="App">
    <h1 className="text-center my-4">Employee Details Form</h1>
    <form onSubmit={handleSubmit}>
      <Employeepersonaldetails />
      <Employeepayparticulars />
      <Allowances />
      <Anyotherarrears />
      <Adavancetax />
      <DDOdetails />
      <Salarydeductions />
      <Houseadd />
      <div className="text-center mt-4">
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
  );
}

export default App;
