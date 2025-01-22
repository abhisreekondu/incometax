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
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import useFormStore from "../store/formStore";
import useSalaryDataStore from "../store/salaryDataStore";
import usetotalsumStore from "../store/totalsumsStore";


const SalaryTable = () => {
  const [rows, setRows] = useState([]);
  const [otherRows, setOtherRows] = useState({}); // Define otherRows state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);
 
  const formData = useFormStore((state) => state.formData);
  const salaryData = useSalaryDataStore((state) => state.salaryData);
  const navigate = useNavigate();
  const sums = usetotalsumStore((state) => state.sums);
const setSums = usetotalsumStore((state) => state.setSums);


  useEffect(() => {
    const fetchSums =  async() => {
      setLoading(true); // Start loading
      setError(null); // Reset error before the new fetch attempt
  
      try {
        const computedSums = await calculateSumsUsingAPI(rows, otherRows);
        if (computedSums) {
          setSums(computedSums); // Update sums if successful
        } else {
          setError("Failed to fetch sums from the server."); // Set an error message if API returns null
        }
      } catch (error) {
        setError("An error occurred while fetching sums."); // Handle unexpected errors
        console.error("Error in fetchSums:", error);
      } finally {
        setLoading(false); // End loading
      }
    };
  
    fetchSums();
  }, [rows, otherRows]);
  

  // Function to calculate financial year months dynamically
  const getFinancialYearMonths = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0 (Jan) to 11 (Dec)

    // Determine financial year start and end
    const financialYearStart = currentMonth < 3 ? currentYear - 1 : currentYear;
    const financialYearEnd = financialYearStart + 1;

    // Generate months from March to February
    return [
      `Mar-${(financialYearEnd - 1).toString().slice(-2)}`,
      `Apr-${(financialYearEnd - 1).toString().slice(-2)}`,
      `May-${(financialYearEnd - 1).toString().slice(-2)}`,
      `Jun-${(financialYearEnd - 1).toString().slice(-2)}`,
      `Jul-${(financialYearEnd - 1).toString().slice(-2)}`,
      `Aug-${(financialYearEnd - 1).toString().slice(-2)}`,
      `Sep-${(financialYearEnd - 1).toString().slice(-2)}`,
      `Oct-${(financialYearEnd - 1).toString().slice(-2)}`,
      `Nov-${(financialYearEnd - 1).toString().slice(-2)}`,
      `Dec-${(financialYearEnd - 1).toString().slice(-2)}`,
      `Jan-${financialYearEnd.toString().slice(-2)}`,
      `Feb-${financialYearEnd.toString().slice(-2)}`,
    ];
  };

  // Fixed months for the table
  const months = getFinancialYearMonths();

  const handleEdit = () => {
    navigate("/"); // Navigate back to the form with previous data
  };
  const handleAnnexure = () => {
  
    navigate("/annexureii"); // Navigate back to the form with previous data
  };
  const handleForm16 = () => {
  
    navigate("/form-16"); // Navigate back to the form with previous data
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

      const horizontalMargin = 10;
      // Set the image width to the PDF page width
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const scaledWidth = pdfWidth - 2 * horizontalMargin; 
      const scaleFactor = scaledWidth / canvasWidth; 
      const scaledHeight = canvasHeight * scaleFactor;
      const x = horizontalMargin; 
      const y = (pdfHeight - scaledHeight) / 2;
      // Check if the scaled height exceeds the page height
      if (scaledHeight > pdfHeight) {
        const heightScaleFactor = pdfHeight / scaledHeight;
        scaledHeight = pdfHeight;
        scaledWidth = scaledWidth * heightScaleFactor; // Adjust width to maintain aspect ratio
      }

      pdf.addImage(imgData, "PNG", x, y, scaledWidth, scaledHeight);

      // Save the PDF
      pdf.save("SalaryTable.pdf");
    } catch (error) {
      console.error("Error capturing the page:", error);
    }
  };

  const getTableData = () => {
    return months.map((month, index) => ({
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
      pf:formData.salaryDeductions.pfamt||0,
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
        200 +
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
          200 +
          parseInt(formData.advanceTax[month] || 0) +
          parseInt(formData.salaryDeductions.ehsamt || 0) +
          parseInt(salaryData.ewfswf[month] || 0) +
          parseInt(formData.salaryDeductions.otherdeductions || 0)),
    }))
  };

  const getOtherData = () => {
    return {
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
        "",
      empid:
        formData.personalDetails.employeeId || "",
    }
  };




  useEffect(() => {
    if(salaryData === null || salaryData.basesalary === null) { 
      navigate("/");
    } else {
      const tableData = getTableData();
      const otherData = getOtherData();
      console.log(tableData);
      console.log(otherData);
      setRows(tableData);
      setOtherRows(otherData);
    }
  }, [salaryData, formData]);
  

  const calculateSumsUsingAPI = async (rows, otherRows) => {
    try {
      const response = await fetch("http://localhost:3002/calculate-sums", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows, otherRows }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const sums = await response.json();
      return sums;
    } catch (error) {
      console.error("Error calculating sums using API:", error);
      return null;
    }
  };

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
          width: "83%",
          margin: "0 auto",
          overflowX: "auto",
        }}
      >
        <Table
          stickyHeader
          aria-label="salary table"
          id="page-content"
          sx={{
            borderCollapse: "collapse",
            "& td, & th": {
              border: "1px solid black",
              padding: "7px",  
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
               style={{ width: "0.2%" }}
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
              {formData.salaryDeductions.pensiontype === "CPS" ? "CPS" : "GPF"}
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
                <TableCell align="right"> {formData.salaryDeductions.pensiontype === "CPS" ? row.cps : row.pf}</TableCell>
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
              {formData.salaryDeductions.pensiontype === "CPS" ? sums.cps : sums.pf}
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
          <tfoot>
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
          </tfoot>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        style={{ marginTop: "20px", marginLeft: "10px",marginBottom:"10px" }}
        onClick={handleEdit}
      >
        Edit Form
      </Button>

      <Button
        variant="contained"
        style={{ marginTop: "20px", marginLeft: "10px" ,marginBottom:"10px"}}
        onClick={handleDownload}
      >
        Download
      </Button>

      <Button
        variant="contained"
        style={{ marginTop: "20px", marginLeft: "10px", marginBottom:"10px"}}
        onClick={handleAnnexure}
      >
        Annexure-II
      </Button>
      <Button
        variant="contained"
        style={{ marginTop: "20px", marginLeft: "10px", marginBottom:"10px"}}
        onClick={handleForm16}
      >
        Form-16
      </Button>
    </div>
  );
};

export default SalaryTable;
