import React, { useState } from "react";

import BasicTextField from "../BasicTextField";

const Anyotherarrears = () => {
  const [formData, setFormData] = useState({
    arrearpay: 0,
    arrearda: 0,
    arrearhra: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="container border p-4 rounded">
      <h4 className="text-center bg-primary text-white mb-4">Any Other Arrears</h4>
      <div className="row g-3">
        <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="Arrear Pay"
            name="arrearpay"
            value={formData.arrearpay}
            type="number"
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="Arrear DA"
            name="arrearda"
            value={formData.arrearda}
            type="number"
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="Arrear HRA"
            name="arrearhra"
            value={formData.arrearhra}
            type="number"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Anyotherarrears;
