import React, { useState } from "react";
import BasicSelect from "../BasicSelect";
import BasicTextField from "../BasicTextField";

const Houseadd = () => {
  const [formData, setFormData] = useState({
    ownername: "",
    address: "",
    ownerpan: "",
    houserent: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container border p-4 rounded">
      {/* Outer container with Bootstrap styles */}
      <h4 className="text-center bg-primary text-white mb-4">House Rent Slip Address Details</h4>

      <div className="row g-3">
        {/* House Owner Name */}
        <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="House Owner Name"
            name="ownername"
            value={formData.ownername}
            onChange={handleChange}
          />
        </div>

        {/* Rent House Address */}
        <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="Rent House Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        {/* House Owner PAN */}
        <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="House Owner PAN"
            name="ownerpan"
            value={formData.ownerpan}
            onChange={handleChange}
          />
        </div>

        {/* House Rent */}
        <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="Enter House Rent"
            name="houserent"
            value={formData.houserent}
            type="number"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Houseadd;
