import React, { useState,useEffect } from "react";
import BasicTextField from "../BasicTextField";
import { Months } from "../../consts/Months";

const Adavancetax = ({ data = {}, onUpdate }) => {
  const months = Months();

  const [formData, setFormData] = useState(
    months.reduce((acc, month) => {
      acc[month] = data[month] || 0; // Use `data` values if available, default to 0
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value === "" ? "" : Number(value) };
    setFormData(updatedFormData);
    onUpdate(updatedFormData); // Notify parent of the change immediately
  };
  

  return (
    <div className="container border p-4 rounded">
      <h4 className="text-center bg-primary text-white mb-4 p-2">
        Advance Tax Payments
      </h4>
      <div className="row g-3">
        {Object.keys(formData).map((month) => (
          <div key={month} className="col-12 col-sm-6 col-md-4">
            <BasicTextField
              label={month} // Use the month key for the label
              name={month} // Use the month key for the name
              value={formData[month]} // Set the value based on the month key
              type="number"
              onChange={handleChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Adavancetax;
