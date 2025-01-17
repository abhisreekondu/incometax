const express = require("express");
const cors = require("cors");
const app = express();
const { calculateBaseSalary } = require("./services/addtosalary/baseSalary");
const { getDAMap } = require("./services/addtosalary/da");
const { getHRAMap } = require("./services/addtosalary/hra");
const { getHMAMap } = require("./services/addtosalary/hma");
const { getCPS } = require("./services/deductions/cps");
const { getAPGLI } = require("./services/deductions/apgli");
const { getGIS } = require("./services/deductions/gis");
const { getewfswf } = require("./services/deductions/ewfswf");

// Global variables to hold salary data and form data
let salaryData = null; // Initialize salaryData
let formData = null; // Initialize formData

// Middleware to parse JSON
app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST"], // Specify allowed HTTP methods
    credentials: true, // Allow cookies if needed
  })
);

// POST API to handle form data submission
app.post("/submit-salary-data", (req, res) => {
  console.log("Request Headers:", req.headers);

  formData = req.body; // Assign the form data to the global variable
  console.log("Received Form Data:", formData);

  try {
    // Call your calculation methods
    const basesalary = calculateBaseSalary(
      formData.payParticulars.incrementmonth,
      formData.payParticulars.promomon,
      formData.payParticulars.aasmonth,
      formData.payParticulars.basicpay
    );

    const da = getDAMap(basesalary);
    const hra = getHRAMap(
      basesalary,
      formData.allowances.hra,
      formData.allowances.hramon,
      formData.allowances.hraper
    );
    const hma = getHMAMap(
      formData.allowances.hma,
      formData.allowances.hmamon,
      formData.allowances.hmaamt,
      formData.allowances.ppsp
    );
    const cps = getCPS(basesalary, da);
    const apgli = getAPGLI(
      formData.salaryDeductions.apglisub,
      formData.salaryDeductions.apglimon,
      formData.salaryDeductions.apgliamt
    );
    const gis = getGIS(
      formData.salaryDeductions.gissub,
      formData.salaryDeductions.gismon,
      formData.salaryDeductions.gischangedamt
    );
    const ewfswf = getewfswf(
      formData.salaryDeductions.ewf,
      formData.salaryDeductions.swf
    );
    // Save the result in global storage
    salaryData = {
      basesalary,
      da,
      hra,
      hma,
      cps,
      apgli,
      gis,
      ewfswf,
    };

    // Send success response with calculated data
    res.json({ message: "Success", basesalary, da, hra, hma });
  } catch (error) {
    console.error("Error in calculateBaseSalary:", error.message);
    res.status(500).json({
      error: "Failed to calculate salary data",
      error: error.message,
      backtrace: error.backtrace,
    });
  }
});

// GET API to fetch the calculated salary data
app.get("/get-salary-data", (req, res) => {
  if (!salaryData) {
    return res
      .status(404)
      .json({ error: "Salary data not found. Please submit the form first." });
  }
  res.json(salaryData);
});

// GET API to fetch form data
app.get("/get-form-data", (req, res) => {
  console.log("Current Form Data:", formData); // Log the current form data
  if (!formData) {
    return res.status(404).json({ error: "Form Data not found" });
  }
  res.json(formData);
});

// Start the server
app.listen(3002, () => console.log("Server running on http://localhost:3002"));
