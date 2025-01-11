import React, { useState } from "react";
import BasicSelect from "../BasicSelect";
import BasicTextField from "../BasicTextField";

const Allowances = () => {
  const [formData, setFormData] = useState({
    hra: 10,
    hrachange: "",
    hraper: "",
    hramon: "",
    pha: 0,
    cca: 0,
    hma: 0,
    hmachange: "",
    hmamon: "",
    hmaamt: "",
    otherallowance: 0,
    ppsp: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="container border p-4 rounded">
      <h4 className="text-center bg-primary text-white mb-4">Allowances (Monthly)</h4>
      <div className="row g-3">
        <div className="col-12 col-sm-6 col-md-4">
          <BasicSelect
            label="HRA"
            name="hra"
            value={formData.hra}
            options={[10, 12, 16, 24, 0]}
            onChange={handleChange}
          />
        </div>

        <div className="col-12 ">
          <BasicSelect
            label="If HRA Change"
            name="hrachange"
            value={formData.hrachange}
            options={["Yes", "No"]}
            onChange={handleChange}
          />
        </div>

        {formData.hrachange === "Yes" && (
          <>
            {/* Day Dropdown */}
            <p className="p-0 m-0 b-0 text-primary">
              *Select the Percentage and day from which HRA is changed*
            </p>
            <div className="col-12 col-sm-6">
              <BasicSelect
                label="Select Percentage"
                name="hraper"
                value={formData.hraday}
                options={[10, 12, 16, 24, 0]}
                onChange={handleChange}
              />
            </div>

            {/* Month Dropdown */}
            <div className="col-12 col-sm-6">
              <BasicSelect
                label="Month"
                name="hramon"
                value={formData.hramon}
                options={[
                  "Mar-24",
                  "Apr-24",
                  "May-24",
                  "Jun-24",
                  "Jul-24",
                  "Aug-24",
                  "Sep-24",
                  "Oct-24",
                  "Nov-24",
                  "Dec-24",
                  "Jan-24",
                  "Feb-24",
                ]}
                onChange={handleChange}
              />
            </div>
          </>
        )}
        <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="PHA Allowance"
            name="pha"
            value={formData.pha}
            type="number"
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="HWA Allowance"
            name="hwa"
            value={formData.hwa}
            type="number"
            onChange={handleChange}
          />
        </div>
        <div className="col-12 ">
          <BasicSelect
            label="If HMA Change"
            name="hmachange"
            value={formData.hmachange}
            options={["Yes", "No"]}
            onChange={handleChange}
          />
        </div>

        {formData.hrachange === "Yes" && (
          <>
            {/* Day Dropdown */}
            <p className="p-0 m-0 b-0 text-primary">
              *Enter the month and amount from which HMA is changed*
            </p>

            {/* Month Dropdown */}
            <div className="col-12 col-sm-6">
              <BasicSelect
                label="Month"
                name="hmamon"
                value={formData.hmamon}
                options={[
                  "Mar-24",
                  "Apr-24",
                  "May-24",
                  "Jun-24",
                  "Jul-24",
                  "Aug-24",
                  "Sep-24",
                  "Oct-24",
                  "Nov-24",
                  "Dec-24",
                  "Jan-24",
                  "Feb-24",
                ]}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 col-sm-6 ">
              <BasicTextField
                label="Enter HMA Amount"
                name="hmaamt"
                value={formData.hmaamt}
                type="number"
                onChange={handleChange}
              />
            </div>
          </>
        )}
        <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="Other Allowance"
            name="otherallowance"
            value={formData.otherallowance}
            type="number"
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="PP/SPA/Add.Income"
            name="ppsp"
            value={formData.ppsp}
            type="number"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Allowances;
