import React, { useState,useEffect } from "react";

import BasicTextField from "../BasicTextField";

const DDOdetails = ({ data = {}, onUpdate }) => {
  const [formData, setFormData] = useState({
    ddoname: "",
    ddodesg: "",
    ddooffice: "",
    ddotanno: "",
    ...data,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    onUpdate(updatedFormData); // Notify parent of the change immediately
  };

  return (
    <div className="container border p-4 rounded">
      {/* Outer container with Bootstrap styles */}
      <h4 className="text-center  bg-primary  text-white mb-4 p-2">DDO Details</h4>
      <div className="row g-3">
        <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="DDO Name"
            name="ddoname"
            placeholder="Ex: S.Seshadri"
            value={formData.ddoname}
            onChange={handleChange}
          />
        </div>

        <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="DDO Designation"
            name="ddodesg"
            placeholder="Ex: Gr-II Headmaster"
            value={formData.ddodesg}
            onChange={handleChange}
          />
        </div>

        <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="DDO Office & Place"
            name="ddooffice"
            placeholder="Ex: MRC-G D Nellore,Chittoor"
            value={formData.ddooffice}
            onChange={handleChange}
          />
        </div>

        <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="DDO Tan Number"
            name="ddotanno"
            placeholder="Ex: CDAN4345K"
            value={formData.ddotanno}
            onChange={handleChange}
          />
        </div>
        
    
      </div>
    </div>
  );
};

export default DDOdetails;
