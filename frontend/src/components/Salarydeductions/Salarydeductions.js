import React, { useState,useEffect } from "react";
import BasicSelect from "../BasicSelect";
import BasicTextField from "../BasicTextField";

const Salarydeductions = ({ data = {}, onUpdate }) => {
  const [formData, setFormData] = useState({
    pensiontype: "",
    pfamt: 0,
    pfchange: "",
    pfmon: "",
    changedpfamt: 0,
    apglisub: 0,
    apglichange: "",
    apglimon: "",
    apgliamt: 0,
    gissub: 0,
    gischange: "",
    gismon: "",
    gischangedamt: 0,
    ehsamt: 0,
    ewf: 0,
    swf: 0,
    otherdeductions: 0,
    ...DataTransfer,
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
      <h4 className="text-center bg-primary text-white mb-4 p-2">Salary Deductions (Monthly)</h4>
      <div className="row g-3">
        {/* Pension Type Selection */}
        <div className="col-12 col-sm-6 col-md-4">
          <BasicSelect
            label="Select Pension Type (CPS/PF)"
            name="pensiontype"
            value={formData.pensiontype}
            options={["CPS", "PF"]}
            onChange={handleChange}
          />
        </div>

        {formData.pensiontype === "PF" && (
          <>
            {/* Instruction Text */}
            <p className="p-0 m-0 b-0 text-primary">
              *Enter PF Amount and Select whether it is changed or not*
            </p>

            {/* PF Amount Input */}
            <div className="col-12 col-sm-6 col-md-4">
              <BasicTextField
                label="Enter PF Amount"
                name="pfamt"
                value={formData.pfamt}
                type="number"
                onChange={handleChange}
              />
            </div>

            {/* PF Change Selection */}
            <div className="col-12">
              <BasicSelect
                label="Is PF Changed?"
                name="pfchange"
                value={formData.pfchange}
                options={["Yes", "No"]}
                onChange={handleChange}
              />
            </div>

            {formData.pfchange === "Yes" && (
              <>
                {/* Instruction Text */}
                <p className="p-0 m-0 b-0 text-primary ">
                  *Enter the Month and Amount from which PF is changed*
                </p>

                {/* Month Dropdown */}
                <div className="col-12 col-sm-6">
                  <BasicSelect
                    label="Select Month"
                    name="pfmon"
                    value={formData.pfmon}
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

                {/* Changed PF Amount Input */}
                <div className="col-12 col-sm-6 col-md-4">
                  <BasicTextField
                    label="Enter Changed PF Amount"
                    name="changedpfamt"
                    value={formData.changedpfamt}
                    type="number"
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
          </>
        )}
        <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="Enter APGLI Subscription"
            name="apglisub"
            value={formData.apglisub}
            type="number"
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <BasicSelect
            label="Is APGLI Changed?"
            name="apglichange"
            value={formData.apglichange}
            options={["Yes", "No"]}
            onChange={handleChange}
          />
        </div>
        {formData.apglichange === "Yes" && (
          <>
            {/* Instruction Text */}
            <p className="p-0 m-0 b-0 text-primary">
              *Enter the Month and Amount from which APGLI is changed*
            </p>

            {/* Month Dropdown */}
            <div className="col-12 col-sm-6">
              <BasicSelect
                label="Select Month"
                name="apglimon"
                value={formData.apglimon}
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

            <div className="col-12 col-sm-6 col-md-4">
              <BasicTextField
                label="Enter APGLI Amount"
                name="apgliamt"
                value={formData.apgliamt}
                type="number"
                onChange={handleChange}
              />
            </div>
          </>
        )}
  <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="Enter GIS Subscription"
            name="gissub"
            value={formData.gissub}
            type="number"
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <BasicSelect
            label="Is GIS Changed?"
            name="gischange"
            value={formData.gischange}
            options={["Yes", "No"]}
            onChange={handleChange}
          />
        </div>
        {formData.gischange === "Yes" && (
          <>
            {/* Instruction Text */}
            <p className="p-0 m-0 b-0 text-primary">
              *Enter the Month and Amount from which GIS is changed*
            </p>

            {/* Month Dropdown */}
            <div className="col-12 col-sm-6">
              <BasicSelect
                label="Select Month"
                name="gismon"
                value={formData.gismon}
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

            <div className="col-12 col-sm-6 col-md-4">
              <BasicTextField
                label="Enter GIS Changed Amount"
                name="gischangedamt"
                value={formData.gischangedamt}
                type="number"
                onChange={handleChange}
              />
            </div>
          </>
        )}

<div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="Enter EHS Premium"
            name="ehsamt"
            value={formData.ehsamt}
            type="number"
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="Enter EWF (Mar-24)"
            name="ewf"
            value={formData.ewf}
            type="number"
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="Enter SWF (Mar-24)"
            name="swf"
            value={formData.swf}
            type="number"
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="Enter Other any Deductions"
            name="otherdeductions"
            value={formData.otherdeductions}
            type="number"
            onChange={handleChange}
          />
        </div>

      </div>
    </div>
  );
};

export default Salarydeductions;
