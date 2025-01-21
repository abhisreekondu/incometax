import React, { useState,useEffect } from "react";

import BasicTextField from "../BasicTextField";

const Anyotherarrears = ({ data = {}, onUpdate }) => {
  const [formData, setFormData] = useState({
    arrearpay: data.arrearpay||0,
    arrearda: data.arrearda||0,
    arrearhra: data.arrearhra||0,
    ...DataTransfer,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    onUpdate(updatedFormData); // Notify parent of the change immediately
  };

  return (
    <div className="container border p-4 rounded  bg-gradient-dark ">
      <h4 className="text-center  bg-primary  text-white mb-4 p-2">Any Other Arrears</h4>
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
