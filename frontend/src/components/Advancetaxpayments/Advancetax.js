import React, { useState } from "react";
import BasicSelect from "../BasicSelect";
import BasicTextField from "../BasicTextField";

const Adavancetax = () => {
  const [formData, setFormData] = useState({
   mar:0,
   apr:0,
   may:0,
   jun:0,
   jul:0,
   aug:0,
   sep:0,
   oct:0,
   nov:0,
   dec:0,
   jan:0,
   feb:0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="container border p-4 rounded">
      {/* Outer container with Bootstrap styles */}
      <h4 className="text-center bg-primary text-white mb-4 ">Adavance Tax Payments</h4>
      <div className="row g-3">
      <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="March 2024"
            name="mar"
            value={formData.mar}
            type="number"
            onChange={handleChange}
          />
      </div>
      <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="April 2024"
            name="apr"
            value={formData.apr}
            type="number"
            onChange={handleChange}
          />
      </div>
      <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="May 2024"
            name="may"
            value={formData.may}
            type="number"
            onChange={handleChange}
          />
      </div>
      <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="June 2024"
            name="jun"
            value={formData.jun}
            type="number"
            onChange={handleChange}
          />
      </div>
      <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="July 2024"
            name="jul"
            value={formData.jul}
            type="number"
            onChange={handleChange}
          />
      </div>
      <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="August 2024"
            name="aug"
            value={formData.aug}
            type="number"
            onChange={handleChange}
          />
      </div>
      <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="September 2024"
            name="sep"
            value={formData.sep}
            type="number"
            onChange={handleChange}
          />
      </div>
      <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="October 2024"
            name="oct"
            value={formData.oct}
            type="number"
            onChange={handleChange}
          />
      </div>
      <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="November 2024"
            name="nov"
            value={formData.nov}
            type="number"
            onChange={handleChange}
          />
      </div>
      <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="December 2024"
            name="dec"
            value={formData.dec}
            type="number"
            onChange={handleChange}
          />
      </div>
      <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="January 2025"
            name="jan"
            value={formData.jan}
            type="number"
            onChange={handleChange}
          />
      </div>
      <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="February 2025"
            name="feb"
            value={formData.feb}
            type="number"
            onChange={handleChange}
          />
      </div>
      

</div>
      </div>
 
  );
};

export default Adavancetax;
