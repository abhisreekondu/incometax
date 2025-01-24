import React, { useState } from "react";
import BasicTextField from "../BasicTextField";
import { Months } from "../../consts/Months";

const Adavancetax = ({ data = {}, onUpdate }) => {
  const months = Months();

  // Initialize state with default values for all months
  const [formData, setFormData] = useState(
    months.reduce((acc, month) => {
      acc[month] = 0; // Default value is 0 for each month
      return acc;
    }, { ...data }) // Merge incoming data if available
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Allow empty strings to be temporarily set
    const updatedValue = value === "" ? "" : Number(value);
  
    const updatedFormData = { ...formData, [name]: updatedValue };
    setFormData(updatedFormData);
  
    // Pass updated data to parent, ensuring to send 0 for empty fields
    onUpdate(
      Object.keys(updatedFormData).reduce((acc, key) => {
        acc[key] = updatedFormData[key] === "" ? 0 : updatedFormData[key];
        return acc;
      }, {})
    );
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
