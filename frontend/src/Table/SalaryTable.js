import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const SalaryTable = () => {
  const [rows, setRows] = useState([]);
  const [otherRows, setOtherRows] = useState({}); // Define otherRows state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const location = useLocation(); // Access the state passed from the form
  const navigate = useNavigate();

  // Fixed months for the table
  const months = [
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
  ];

  const handleEdit = () => {
    navigate("/", { state: location.state }); // Navigate back to the form with previous data
  };
  const handleAnnexure = () => {
    navigate("/annexureii", { state: location.state }); // Navigate back to the form with previous data
  };
  const handleDownload = async () => {
    const element = document.getElementById("page-content"); // Target the element
    try {
      // Capture the element as a canvas
      const canvas = await html2canvas(element, {
        scrollX: 0,
        scrollY: -window.scrollY,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");

      // Create a jsPDF instance in landscape mode
      const pdf = new jsPDF("l", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth(); // Width of the PDF
      const pdfHeight = pdf.internal.pageSize.getHeight(); // Height of the PDF

      // Set the image width to the PDF page width
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const scaleFactor = pdfWidth / canvasWidth; // Scale to fit the width

      let scaledWidth = pdfWidth; // Set to PDF page width
      let scaledHeight = canvasHeight * scaleFactor; // Maintain aspect ratio

      // Check if the scaled height exceeds the page height
      if (scaledHeight > pdfHeight) {
        const heightScaleFactor = pdfHeight / scaledHeight;
        scaledHeight = pdfHeight;
        scaledWidth = scaledWidth * heightScaleFactor; // Adjust width to maintain aspect ratio
      }

      // Calculate the x and y positions to center the image
      const x = (pdfWidth - scaledWidth) / 2; // Center horizontally
      const y = (pdfHeight - scaledHeight) / 2; // Center vertically

      // Add the scaled image to the PDF
      pdf.addImage(imgData, "PNG", x, y, scaledWidth, scaledHeight);

      // Save the PDF
      pdf.save("SalaryTable.pdf");
    } catch (error) {
      console.error("Error capturing the page:", error);
    }
  };

  useEffect(() => {
    const fetchSalaryData = async () => {
      try {
        const [salaryResponse, formResponse] = await Promise.all([
          fetch("http://localhost:3002/get-salary-data"), // Fetch salary data
          fetch("http://localhost:3002/get-form-data"), // Fetch form data
        ]);

        if (!salaryResponse.ok) {
          throw new Error(`Salary data error: ${salaryResponse.status}`);
        }
        if (!formResponse.ok) {
          throw new Error(`Form data error: ${formResponse.status}`);
        }

        const salaryData = await salaryResponse.json();
        const formData = await formResponse.json();

        const tableData = months.map((month, index) => ({
          sno: index + 1,
          month,
          basic: salaryData.basesalary[month] || "N/A",
          da: salaryData.da[month] || "N/A",
          hra: salaryData.hra[month] || 0,
          ir: 0,
          hma: salaryData.hma[month] || 0,
          cca: formData.allowances.cca || 0,
          pha: formData.allowances.pha || 0,
          others: formData.allowances.otherallowance || 0,
          gross:
            parseInt(salaryData.basesalary[month] || 0) +
              parseInt(salaryData.da[month] || 0) +
              parseInt(salaryData.hra[month] || 0) +
              parseInt(salaryData.hma[month] || 0) +
              parseInt(formData.allowances.cca || 0) +
              parseInt(formData.allowances.pha || 0) +
              parseInt(formData.allowances.otherallowance || 0) || 0,

          cps: salaryData.cps[month] || 0,
          apgli: salaryData.apgli[month] || 0,
          gis: salaryData.gis[month] || 0,
          pt: 200,
          itadv: formData.advanceTax[month] || 0,
          ehf: formData.salaryDeductions.ehsamt || 0,
          ewfswf: salaryData.ewfswf[month] || 0,
          otherdeductions: formData.salaryDeductions.otherdeductions || 0,
          totaldeductions:
            parseInt(salaryData.cps[month] || 0) +
            parseInt(salaryData.apgli[month] || 0) +
            parseInt(salaryData.gis[month] || 0) +
            200 + // PT is a constant value
            parseInt(formData.advanceTax[month] || 0) +
            parseInt(formData.salaryDeductions.ehsamt || 0) +
            parseInt(salaryData.ewfswf[month] || 0) +
            parseInt(formData.salaryDeductions.otherdeductions || 0),

          net:
            parseInt(salaryData.basesalary[month] || 0) +
            parseInt(salaryData.da[month] || 0) +
            parseInt(salaryData.hra[month] || 0) +
            parseInt(salaryData.hma[month] || 0) +
            parseInt(formData.allowances.cca || 0) +
            parseInt(formData.allowances.pha || 0) +
            parseInt(formData.allowances.otherallowance || 0) -
            (parseInt(salaryData.cps[month] || 0) +
              parseInt(salaryData.apgli[month] || 0) +
              parseInt(salaryData.gis[month] || 0) +
              200 + // PT is constant
              parseInt(formData.advanceTax[month] || 0) +
              parseInt(formData.salaryDeductions.ehsamt || 0) +
              parseInt(salaryData.ewfswf[month] || 0) +
              parseInt(formData.salaryDeductions.otherdeductions || 0)),
        }));

        const otherRows = {
          aasbasic: formData.payParticulars.aasbasic || 0,
          aasda: formData.payParticulars.aasda || 0,
          aashra: formData.payParticulars.aashra || 0,
          promobasic: formData.payParticulars.promobasic || 0,
          promoda: formData.payParticulars.promoda || 0,
          promohra: formData.payParticulars.promohra || 0,
          slbasic: formData.payParticulars.slbasic || 0,
          slda: formData.payParticulars.slda || 0,
          slhra: formData.payParticulars.slhra || 0,
          othbasic: formData.arrears.arrearpay || 0,
          othda: formData.arrears.arrearda || 0,
          othhra: formData.arrears.arrearhra || 0,
          empname:
            formData.personalDetails.employeeName ||
            "mention name in personal details",
          empid:
            formData.personalDetails.employeeId ||
            "mention id in personal details",
        };

        setRows(tableData); // Only set the main rows
        setOtherRows(otherRows); // Store other rows separately
        setLoading(false); // Data successfully loaded
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
        setLoading(false); // Stop loading on error
      }
    };

    fetchSalaryData();
  }, []);

  const calculateSums = (rows, otherRows) => {
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
      sums.gross += parseInt(row.gross || 0); // Ensure no double counting here
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

    return sums;
  };
  
  const sums = calculateSums(rows, otherRows);
  // Render loading spinner
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Render error message
  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  // Render the salary table
  return (
    <div>
      <TableContainer
        component={Paper}
        style={{
          width: "97%",
          margin: "0 auto",
          height: "90%",
          overflowX: "auto",
        }}
      >
        <Table
          stickyHeader
          aria-label="salary table"
          id="page-content"
          sx={{
            borderCollapse: "collapse", // Ensures no gaps between borders
            "& td, & th": {
              border: "1px solid black", // Apply thick border to all cells
              textAlign: "center",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={21}
                align="center"
                style={{ fontWeight: "bold", textAlign: "center" }}
              >
                <h3>ANNEXURE-I (FY:2024-25)</h3>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={21}
                align="center"
                style={{ fontWeight: "bold", textAlign: "center" }}
              >
                <h3>
                  Month Wise Salary Particulars of {otherRows.empname} (
                  {otherRows.empid})
                </h3>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" style={{ width: "0.2%" }}>
                Sno
              </TableCell>
              <TableCell
                style={{
                  position: "sticky",
                  left: 0,
                  background: "#fff",
                  zIndex: 2,
                  width: "0.2%",
                }}
              >
                Month
              </TableCell>
              <TableCell align="right" style={{ width: "0.5%" }}>
                Basic
              </TableCell>
              <TableCell align="right" style={{ width: "0.5%" }}>
                DA
              </TableCell>
              <TableCell align="right" style={{ width: "0.5%" }}>
                HRA
              </TableCell>
              <TableCell align="right" style={{ width: "0.5%" }}>
                IR
              </TableCell>
              <TableCell align="right" style={{ width: "0.5%" }}>
                HMA/PP/FP
              </TableCell>
              <TableCell align="right" style={{ width: "0.5%" }}>
                CCA
              </TableCell>
              <TableCell align="right" style={{ width: "0.5%" }}>
                PHA
              </TableCell>
              <TableCell align="right" style={{ width: "0.5%" }}>
                Others
              </TableCell>
              <TableCell align="right" style={{ width: "0.5%" }}>
                Gross
              </TableCell>
              <TableCell align="right" style={{ width: "0.5%" }}>
                CPS
              </TableCell>
              <TableCell align="right" style={{ width: "0.5%" }}>
                APGLI
              </TableCell>
              <TableCell align="right" style={{ width: "0.5%" }}>
                GIS
              </TableCell>
              <TableCell align="right" style={{ width: "0.5%" }}>
                PT
              </TableCell>
              <TableCell align="right" style={{ width: "0.5%" }}>
                IT Adv
              </TableCell>
              <TableCell align="right" style={{ width: "0.5%" }}>
                EHF
              </TableCell>
              <TableCell align="right" style={{ width: "0.5%" }}>
                EWF/SWF
              </TableCell>
              <TableCell align="right" style={{ width: "0.5%" }}>
                Other Deductions
              </TableCell>
              <TableCell align="right" style={{ width: "0.5%" }}>
                Total Deductions
              </TableCell>
              <TableCell align="right" style={{ width: "0.5%" }}>
                Net
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.month}>
                <TableCell align="right">{row.sno}</TableCell>
                <TableCell
                  style={{
                    position: "sticky",
                    left: 0,
                    background: "#fff",
                    zIndex: 1,
                  }}
                >
                  {row.month}
                </TableCell>
                <TableCell align="right">{row.basic}</TableCell>
                <TableCell align="right">{row.da}</TableCell>
                <TableCell align="right">{row.hra}</TableCell>
                <TableCell align="right">{row.ir}</TableCell>
                <TableCell align="right">{row.hma}</TableCell>
                <TableCell align="right">{row.cca}</TableCell>
                <TableCell align="right">{row.pha}</TableCell>
                <TableCell align="right">{row.others}</TableCell>
                <TableCell align="right">{row.gross}</TableCell>
                <TableCell align="right">{row.cps}</TableCell>
                <TableCell align="right">{row.apgli}</TableCell>
                <TableCell align="right">{row.gis}</TableCell>
                <TableCell align="right">200</TableCell>
                <TableCell align="right">{row.itadv}</TableCell>
                <TableCell align="right">{row.ehf}</TableCell>
                <TableCell align="right">{row.ewfswf}</TableCell>
                <TableCell align="right">{row.otherdeductions}</TableCell>
                <TableCell align="right">{row.totaldeductions}</TableCell>
                <TableCell align="right">{row.net}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2} align="right">
                AAS
              </TableCell>
              <TableCell align="right">{otherRows.aasbasic}</TableCell>
              <TableCell align="right">{otherRows.aasda}</TableCell>
              <TableCell align="right">{otherRows.aashra}</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">
                {parseInt(otherRows.aasbasic) +
                  parseInt(otherRows.aasda) +
                  parseInt(otherRows.aashra)}
              </TableCell>
              <TableCell align="right">
                {parseInt(otherRows.aasbasic) +
                  parseInt(otherRows.aasda) +
                  parseInt(otherRows.aashra)}
              </TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>

              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>

              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>

              <TableCell align="right"></TableCell>

              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} align="right">
                Promo
              </TableCell>
              <TableCell align="right">{otherRows.promobasic}</TableCell>
              <TableCell align="right">{otherRows.promoda}</TableCell>
              <TableCell align="right">{otherRows.promohra}</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">
                {parseInt(otherRows.promobasic) +
                  parseInt(otherRows.promoda) +
                  parseInt(otherRows.promohra)}
              </TableCell>
              <TableCell align="right">
                {parseInt(otherRows.promobasic) +
                  parseInt(otherRows.promoda) +
                  parseInt(otherRows.promohra)}
              </TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>

              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>

              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>

              <TableCell align="right"></TableCell>

              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} align="right">
                SL
              </TableCell>
              <TableCell align="right">{otherRows.slbasic}</TableCell>
              <TableCell align="right">{otherRows.slda}</TableCell>
              <TableCell align="right">{otherRows.slhra}</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">
                {parseInt(otherRows.slbasic) +
                  parseInt(otherRows.slda) +
                  parseInt(otherRows.slhra)}
              </TableCell>
              <TableCell align="right">
                {parseInt(otherRows.slbasic) +
                  parseInt(otherRows.slda) +
                  parseInt(otherRows.slhra)}
              </TableCell>

              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>

              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>

              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>

              <TableCell align="right"></TableCell>

              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} align="right">
                Any Arrears
              </TableCell>
              <TableCell align="right">{otherRows.othbasic}</TableCell>
              <TableCell align="right">{otherRows.othda}</TableCell>
              <TableCell align="right">{otherRows.othhra}</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">
                {parseInt(otherRows.othbasic) +
                  parseInt(otherRows.othda) +
                  parseInt(otherRows.othhra)}
              </TableCell>
              <TableCell align="right">
                {parseInt(otherRows.othbasic) +
                  parseInt(otherRows.othda) +
                  parseInt(otherRows.othhra)}
              </TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>

              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>

              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>

              <TableCell align="right"></TableCell>

              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow sx={{ fontWeight: "bold" }}>
              <TableCell colSpan={2} align="right">
                <strong>Totals</strong>
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                {sums.basic}
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                {sums.da}
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                {sums.hra}
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                {sums.ir}
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                {sums.hma}
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                {sums.cca}
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                {sums.pha}
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                {sums.others}
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                {sums.gross}
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                {sums.cps}
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                {sums.apgli}
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                {sums.gis}
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                {sums.pt}
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                {sums.itadv}
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                {sums.ehf}
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                {sums.ewfswf}
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                {sums.otherdeductions}
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                {sums.totaldeductions}
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                {sums.net}
              </TableCell>
            </TableRow>
          </TableBody>
          <TableRow style={{ height: "120px", border: "none" }}>
            <TableCell
              colSpan={11}
              align="right"
              style={{
                fontWeight: "bold",
                verticalAlign: "bottom",
                border: "none", // Remove the border for this cell
              }}
            >
              Signature of the Teacher
            </TableCell>
            <TableCell
              colSpan={18}
              align="right"
              style={{
                fontWeight: "bold",
                verticalAlign: "bottom",
                border: "none", // Remove the border for this cell
              }}
            >
              Signature of the DDO
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        style={{ marginTop: "20px", marginLeft: "10px" }}
        onClick={handleEdit}
      >
        Edit Form
      </Button>

      <Button
        variant="contained"
        style={{ marginTop: "20px", marginLeft: "10px" }}
        onClick={handleDownload}
      >
        Download
      </Button>

      <Button
        variant="contained"
        style={{ marginTop: "20px", marginLeft: "10px" }}
        onClick={handleAnnexure}
      >Annexue-II
      </Button>
    </div>
  );
};

export default SalaryTable;
