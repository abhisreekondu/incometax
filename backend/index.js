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
    origin:[ "http://localhost:3000", "http://localhost:3001"], // Allow requests from this origin
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
    res.json(salaryData);
  } catch (error) {
    console.error("Error in calculateBaseSalary:", error.message);
    res.status(500).json({
      error: "Failed to calculate salary data",
      error: error.message,
      backtrace: error.backtrace,
    });
  }
});


app.post("/calculate-sums", (req, res) => {
  const { rows, otherRows } = req.body;

  if (!Array.isArray(rows) || typeof otherRows !== "object") {
    return res.status(400).json({ error: "Invalid input data" });
  }

  const sums = {
    basic: 0,
    da: 0,
    hra: 0,
    ir: 0,
    hma: 0,
    cca: 0,
    pha: 0,
    others: 0,
    gross: 0,
    cps: 0,
    pf:0,
    apgli: 0,
    gis: 0,
    pt: 0,
    itadv: 0,
    ehf: 0,
    ewfswf: 0,
    otherdeductions: 0,
    totaldeductions: 0,
    net: 0,
  };

 
 rows.forEach((row) => {
      sums.basic += parseInt(row.basic || 0);
      sums.da += parseInt(row.da || 0);
      sums.hra += parseInt(row.hra || 0);
      sums.ir += parseInt(row.ir || 0);
      sums.hma += parseInt(row.hma || 0);
      sums.cca += parseInt(row.cca || 0);
      sums.pha += parseInt(row.pha || 0);
      sums.others += parseInt(row.others || 0);
      sums.gross += parseInt(row.gross || 0); 
      sums.pf += parseInt(row.pf || 0);
      sums.cps += parseInt(row.cps || 0);
      sums.apgli += parseInt(row.apgli || 0);
      sums.gis += parseInt(row.gis || 0);
      sums.pt += 200; // PT is constant
      sums.itadv += parseInt(row.itadv || 0);
      sums.ehf += parseInt(row.ehf || 0);
      sums.ewfswf += parseInt(row.ewfswf || 0);
      sums.otherdeductions += parseInt(row.otherdeductions || 0);
      sums.totaldeductions += parseInt(row.totaldeductions || 0);
      sums.net += parseInt(row.net || 0);
    });

    // Add values from otherRows
    sums.basic +=
      parseInt(otherRows.aasbasic || 0) +
      parseInt(otherRows.promobasic || 0) +
      parseInt(otherRows.slbasic || 0) +
      parseInt(otherRows.othbasic || 0);
    sums.da +=
      parseInt(otherRows.aasda || 0) +
      parseInt(otherRows.promoda || 0) +
      parseInt(otherRows.slda || 0) +
      parseInt(otherRows.othda || 0);
    sums.hra +=
      parseInt(otherRows.aashra || 0) +
      parseInt(otherRows.promohra || 0) +
      parseInt(otherRows.slhra || 0) +
      parseInt(otherRows.othhra || 0);

    // Calculate gross explicitly only once
    sums.gross +=
      parseInt(otherRows.aasbasic || 0) +
      parseInt(otherRows.promobasic || 0) +
      parseInt(otherRows.slbasic || 0) +
      parseInt(otherRows.othbasic || 0) +
      parseInt(otherRows.aasda || 0) +
      parseInt(otherRows.promoda || 0) +
      parseInt(otherRows.slda || 0) +
      parseInt(otherRows.othda || 0) +
      parseInt(otherRows.aashra || 0) +
      parseInt(otherRows.promohra || 0) +
      parseInt(otherRows.slhra || 0) +
      parseInt(otherRows.othhra || 0);

    // Calculate net explicitly (gross - total deductions)
    sums.net +=
      parseInt(otherRows.aasbasic || 0) +
      parseInt(otherRows.promobasic || 0) +
      parseInt(otherRows.slbasic || 0) +
      parseInt(otherRows.othbasic || 0) +
      parseInt(otherRows.aasda || 0) +
      parseInt(otherRows.promoda || 0) +
      parseInt(otherRows.slda || 0) +
      parseInt(otherRows.othda || 0) +
      parseInt(otherRows.aashra || 0) +
      parseInt(otherRows.promohra || 0) +
      parseInt(otherRows.slhra || 0) +
      parseInt(otherRows.othhra || 0);

    return res.json(sums);
}
)

// Start the server
app.listen(3002, () => console.log("Server running on http://localhost:3002"));
