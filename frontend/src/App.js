import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HorizontalNonLinearStepper from './HorizontalNonLinearStepper/HorizontalNonLinearStepper';
import AnnexureII from "./Annexure2/AnnexureII";
import SalaryTable from "./Table/SalaryTable";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HorizontalNonLinearStepper />} />
        <Route path="/table" element={<SalaryTable />} />
        <Route path='/annexureii' element={<AnnexureII/>}/>
      </Routes>
    </Router>
  );
};

export default App;
