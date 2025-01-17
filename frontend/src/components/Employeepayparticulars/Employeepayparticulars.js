import React, { useState } from "react";
import BasicSelect from "../BasicSelect";
import BasicTextField from "../BasicTextField";


const Employeepayparticulars = ({ data = {}, onUpdate }) => {
  const [formData, setFormData] = useState({
    basicpay: "",
    incrementmonth: "",
    aas: "",
    aasbasic: 0,
    aasmonth: "",
    aasda:0,
    aashra:0,
    promotion: "",
    promomon:"",
   promobasic:0,
   promoda:0,
   promohra:0,
    surrenderleave: "Not Taken",
    slbasic: 0,
    slhra:0,
    slda:0,
    availhalfpayleave: "",
    incomefromothersources: 0,
    twochildrenfee: 0,
    housetype: "",
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
      <h4 className="text-center  bg-primary  text-white mb-4 p-2">Employee Pay Particulars</h4>
      <div className="row g-3">
        {/* Promotion */}
        <div className="col-12 col-sm-6 col-md-4">
          <BasicSelect
            label="Basic Pay on Mar 2024"
            name="basicpay"
            value={formData.basicpay}
            options={[
              20000, 20600, 21200, 21800, 22460, 23120, 23780, 24500, 25220,
              25940, 26720, 27500, 28280, 29130, 29980, 30830, 31750, 32670,
              33590, 34580, 35570, 36560, 37640, 38720, 39800, 40970, 42140,
              43310, 44570, 45830, 47090, 48440, 49790, 51140, 52600, 54060,
              55520, 57100, 58680, 60260, 61960, 63660, 65360, 67190, 69020,
              70850, 72810, 74770, 76730, 78820, 80910, 83000, 85240, 87480,
              89720, 92110, 94500, 96890, 99430, 101970, 104510, 107210, 109910,
              112610, 115500, 118390, 121280, 124380, 127480, 130580, 133900,
              137220, 140540, 144150, 147760, 151370, 154980, 158880, 162780,
              166680, 170580
            ]}
            onChange={handleChange}
            native // Enable native HTML select behavior
            inputProps={{
              required: true,
            }}
          />
        </div>

        {/* Increment Month */}
        <div className="col-12 col-sm-6 col-md-4">
          <BasicSelect
            label="Increment Month"
            name="incrementmonth"
            value={formData.incrementmonth}
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
              "Jan-25",
              "Feb-25",
            ]}
            onChange={handleChange}
            native // Enable native HTML select behavior
            inputProps={{
              required: true,
            }}
          />
        </div>

        {/* AAS */}
        <div className="col-12">
          <BasicSelect
            label="AAS (Advanced Allowance Scheme)"
            name="aas"
            value={formData.aas}
            options={["Not Taken", "Taken"]}
            onChange={handleChange}
          />
        </div>

        {formData.aas === "Taken" && (
          <>
           
            <p className="p-0 m-0 b-0 text-primary" style={{textAlign:"center"}}>
              *Enter the Arrears of AAS taken*
            </p>
            
            {/* Month Dropdown */}
            <div className="col-12 col-sm-6 col-md-3 " >
              <BasicSelect
                label="Month"
                name="aasmonth"
                value={formData.aasmonth}
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
                  "Jan-25",
                  "Feb-25",
                ]}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 col-sm-6 col-md-3 ">
          <BasicTextField
            label="AAS Basic"
            name="aasbasic"
            value={formData.aasbasic}
            type="number"
            onChange={handleChange}
          />
</div>
<div className="col-12 col-sm-6 col-md-3">
          <BasicTextField
            label="AAS DA"
            name="aasda"
            value={formData.aasda}
            type="number"
            onChange={handleChange}
          />
</div>
<div className="col-12 col-sm-6 col-md-3">
          <BasicTextField
            label="AAS HRA"
            name="aashra"
            value={formData.aashra}
            type="number"
            onChange={handleChange}
          />
</div>






          </>
        )}
        {/* Promotion */}
        <div className="col-12">
          <BasicSelect
            label="Are you taken Promotion"
            name="promotion"
            value={formData.promotion}
            options={["No", "Yes"]}
            onChange={handleChange}
          />
        </div>

        {formData.promotion === "Yes" && (
          <>
            <p className="p-0 m-0 b-0 text-primary"  style={{textAlign:"center"}}>
              *Enter the Arrears of promotion taken*
            </p>
           <div className="col-12 col-sm-6 col-md-3">
              <BasicSelect
                label="Month"
                name="promomon"
                value={formData.promomon}
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
                  "Jan-25",
                  "Feb-25",
                ]}
                onChange={handleChange}
              />
              </div>
               <div className="col-12 col-sm-6 col-md-3">
               <BasicTextField
            label="Promo Basic"
            name="promobasic"
            value={formData.promobasic}
            type="number"
            onChange={handleChange}
          />
          </div>
          <div className="col-12 col-sm-6 col-md-3">
          <BasicTextField
            label="Promo DA"
            name="promoda"
            value={formData.promoda}
            type="number"
            onChange={handleChange}
          />
          </div>
          <div className="col-12 col-sm-6 col-md-3">
          <BasicTextField
            label="Promo HRA"
            name="promohra"
            value={formData.promohra}
            type="number"
            onChange={handleChange}
          />
          </div>
          </>
        )}
        {/* surrenderleave */}
        <div className="col-12">
          <BasicSelect
            label="Surrender Leave"
            name="surrenderleave"
            value={formData.surrenderleave}
            options={["Not Taken", "Taken"]}
            onChange={handleChange}
          />
        </div>

        {formData.surrenderleave === "Taken" && (
          <>
            {/* Month Dropdown */}
            <p className="p-0 m-0 b-0 text-primary" style={{textAlign:"center"}}>
              *Enter the Details of Surrender leave taken *
            </p>
            <div className="col-12 col-sm-6 col-md-3">
          <BasicTextField
            label="SL Basic"
            name="slbasic"
            value={formData.slbasic}
            type="number"
            onChange={handleChange}
          />
          </div>
            <div className="col-12 col-sm-6 col-md-3">
          <BasicTextField
            label="SL DA"
            name="slda"
            value={formData.slda}
            type="number"
            onChange={handleChange}
          />
</div>


<div className="col-12 col-sm-6 col-md-3">
          <BasicTextField
            label="SL HRA"
            name="slhra"
            value={formData.slhra}
            type="number"
            onChange={handleChange}
          />
</div>
              

          </>
        )}

        <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="Income from other sources"
            name="incomefromothersources"
            value={formData.incomefromothersources}
            type="number"
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-sm-6 col-md-4">
          <BasicTextField
            label="Two children tution fee"
            name="twochildrenfee"
            value={formData.twochildrenfee}
            type="number"
            onChange={handleChange}
          />
        </div>
        <div className="col-12 col-sm-6 col-md-4">
          <BasicSelect
            label="House Type"
            name="housetype"
            value={formData.housetype}
            options={["Own House", "Rented House"]}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Employeepayparticulars;
