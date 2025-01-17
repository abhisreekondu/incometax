import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HorizontalNonLinearStepper from './HorizontalNonLinearStepper/HorizontalNonLinearStepper';

import SalaryTable from "./Table/SalaryTable";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HorizontalNonLinearStepper />} />
        <Route path="/table" element={<SalaryTable />} />
      </Routes>
    </Router>
  );
};

export default App;
