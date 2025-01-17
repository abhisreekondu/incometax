import React, { useState } from "react";
import BasicTextField from "../BasicTextField";

const Adavancetax = ({ data = {}, onUpdate }) => {
  const [formData, setFormData] = useState({
    "Mar-24": 0,
    "Apr-24": 0,
    "May-24": 0,
    "Jun-24": 0,
    "Jul-24": 0,
    "Aug-24": 0,
    "Sep-24": 0,
    "Oct-24": 0,
    "Nov-24": 0,
    "Dec-24": 0,
    "Jan-25": 0,
    "Feb-25": 0,
    ...data, // Merge incoming data with default values
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    onUpdate(updatedFormData); // Pass updated data to parent
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
