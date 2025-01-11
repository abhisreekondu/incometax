import React, { useState } from "react";
import BasicSelect from "../BasicSelect";
import BasicTextField from "../BasicTextField";

const EmployeePersonalDetails = () => {
  const [formData, setFormData] = useState({
    employeeName: "",
    designation: "",
    employeeId: "",
    workingPlace: "",
    panNumber: "",
    mandalDistrict: "",
    age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container border p-4 rounded">
      {/* Outer container with Bootstrap styles */}
      <h4 className="text-center bg-primary text-white mb-4">Employee Personal Details</h4>

      <div className="row g-3">
        {/* Name of the Employee */}
        <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="Name of the Employee"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
          />
        </div>

        {/* Designation */}
        <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="Designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
          />
        </div>

        {/* Employee ID */}
        <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="Employee ID"
            name="employeeId"
            placeholder="Treasury ID Number"
            value={formData.employeeId}
            onChange={handleChange}
          />
        </div>

        {/* Working Place */}
        <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="Working Place"
            name="workingPlace"
            placeholder="Ex: ZPHS-Thugundram"
            value={formData.workingPlace}
            onChange={handleChange}
          />
        </div>

        {/* Employee PAN No */}
        <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="Employee PAN No"
            name="panNumber"
            placeholder="PAN Number"
            value={formData.panNumber}
            onChange={handleChange}
          />
        </div>

        {/* Mandal & District */}
        <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="Mandal & District"
            name="mandalDistrict"
            placeholder="Mandal, District"
            value={formData.mandalDistrict}
            onChange={handleChange}
          />
        </div>

        {/* Age Select */}
        <div className="col-12 col-sm-6 col-md-4">
          <BasicSelect
            label="Your Age"
            name="age"
            value={formData.age}
            options={["Below 60 Years", "Above 60 Years"]}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeePersonalDetails;
