import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import useFormStore from "../store/formStore";
import Button from "@mui/material/Button";
import useSalaryDataStore from "../store/salaryDataStore";
import usetotalsumStore from "../store/totalsumsStore";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const AnnexureIItable = () => {
  const [details, setDetails] = useState([]); 
  const formData = useFormStore((state) => state.formData);
  const salaryData = useSalaryDataStore((state) => state.salaryData);
  const sums = usetotalsumStore((state) => state.sums);
  const navigate = useNavigate();

  const handleback = () => {
    navigate("/table");
  };

  const handleDownload = async () => {
    const element = document.getElementById("page-content");
    console.log(element);
    if (!element) {
      console.error("Element #page-content not found!");
    }
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
      pdf.save("Annexure-16.pdf");
    } catch (error) {
      console.error("Error capturing the page:", error);
    }
  };

  // Extract employee details
  const getDetails = () => {
    const netincsal = (sums.gross || 0) - 75000; 
    const muloften = Math.round(netincsal / 10) * 10; 
    return {
      empname: formData?.personalDetails?.employeeName || "N/A",
      age: formData?.personalDetails?.age || "N/A",
      office: formData?.personalDetails?.workingPlace || "N/A",
      desg: formData?.personalDetails?.designation || "N/A",
      add: formData?.personalDetails?.mandalDistrict || "N/A",
      pan: formData?.personalDetails?.panNumber || "N/A",
      treasuryid: formData?.personalDetails?.employeeId || "N/A",
      livingin: formData?.payParticulars?.housetype || "N/A",
      netincsal, // Use the calculated value
      gross: sums.gross || 0,
      hra: sums.hra || 0,
      ewfswf: sums.ewfswf || 0,
      ehf: sums.ehf || 0,
      apgli: sums.apgli || 0,
      gis: sums.gis || 0,
      fee: formData?.payParticulars?.twochildrenfee || 0,
      muloften, // Use the pre-calculated muloften
    };
  };
  

  useEffect(() => {
    // Redirect to the form page if salaryData is not available
    if (!salaryData || !salaryData.basesalary) {
      navigate("/");
    } else {
    
      setDetails( getDetails());
    }
  }, []);

  if (!details) {
    return null;
  }
  let index = 1;
  return (
    <div>
      <div
        id="
    page-content"
        style={{
          width: "80%",
          margin: "0 auto",
        }}
      >
        <TableContainer
          component={Paper}
          style={{
            width: "100%",
            margin: "0 auto",
            border: "none",
          }}
        >
          <Table
            stickyHeader
            aria-label="salary table"
            sx={{
              width: "100%",
              borderCollapse: "collapse",
              "& td, & th": {
                border: "1px solid black",
                padding: "5px",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  style={{ fontWeight: "bold" }}
                >
                  <h3>INCOME TAX CALCULATION 2024-25 (NEW TAX REGIME)</h3>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  colSpan={2}
                  align="center"
                  style={{ fontWeight: "bold", textAlign: "center" }}
                >
                  <h3>Financial Year 2024-25</h3>
                </TableCell>
                <TableCell
                  colSpan={2}
                  align="center"
                  style={{ fontWeight: "bold", textAlign: "center" }}
                >
                  <h3>ANNEXURE-II</h3>
                </TableCell>
                <TableCell
                  colSpan={2}
                  align="center"
                  style={{ fontWeight: "bold", textAlign: "center" }}
                >
                  <h3>Assessment Year 2025-26</h3>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Name : {details.empname}</TableCell>
                <TableCell colSpan={2}>Age : {details.age}</TableCell>
                <TableCell colSpan={2}>Office : {details.office}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}>Designation : {details.desg}</TableCell>
                <TableCell colSpan={3}>Address : {details.add}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>
                  Living in : {details.livingin}
                </TableCell>
                <TableCell colSpan={2}>PAN Number: {details.pan}</TableCell>
                <TableCell colSpan={2}>
                  Treasury ID : {details.treasuryid}
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        <TableContainer
          component={Paper}
          style={{
            width: "100%", // Ensure it matches the width of the first table
            margin: "0 auto",
            border: "none",
          }}
        >
          <Table
            stickyHeader
            aria-label="salary table"
            sx={{
              width: "99.9%",
              borderCollapse: "collapse",
              "& td, & th": {
                border: "1px solid black",
                padding: "3px", // Ensure consistent padding
              },
            }}
          >
            <TableBody>
              <TableRow>
                <TableCell sx={{ width: "5%" }} align="left">
                  {index++}
                </TableCell>
                <TableCell colSpan={3} sx={{ width: "50%" }}>
                  Gross Salary
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>

                <TableCell colSpan={2} align="right">{details.gross}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "5%" }} align="left">
                  {index++}
                </TableCell>
                <TableCell colSpan={6} sx={{ width: "95%" }}>
                  H.R.A.Exemption as per eligibility U/s 10(13-A)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "1%" }}>a)</TableCell>
                <TableCell sx={{ width: "60%" }} colSpan={2}>
                  Actual HRA received
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell align="right">{details.hra}</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "1%" }}>b)</TableCell>
                <TableCell colSpan={2}>
                  Rent paid in excess of 10% Salary :(Rent Rs.18700
                  Monthly)*12-10%(PAY+DA)
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "1%" }}>c)</TableCell>
                <TableCell colSpan={2}>
                  {" "}
                  40% of Salary (Salary means Basic Pay + D.A)
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">0</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "5%" }} align="left">
                  {index++}
                </TableCell>
                <TableCell colSpan={3} sx={{ width: "50%" }}>
                  Total Salary (1-2)
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell align="right"> </TableCell>
                <TableCell align="right"> {details.gross}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "5%" }} align="left">
                  {index++}
                </TableCell>
                <TableCell colSpan={6} sx={{ width: "95%" }}>
                  Deductions from Salary Income
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "1%" }}>a)</TableCell>
                <TableCell colSpan={2} sx={{ width: "60%" }}>
                  Exemption from Conveyance Allowance U/s. 10(14) (i)
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell align="right">0</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "1%" }}>b)</TableCell>
                <TableCell colSpan={2} sx={{ width: "60%" }}>
                  Profession Tax U/s 16 (3) B
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell align="right">0</TableCell>
                <TableCell align="right">0</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "5%" }} align="left">
                  {index++}
                </TableCell>
                <TableCell colSpan={3} sx={{ width: "50%" }}>
                  Income From Salary (3-4(a & b))
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell sx={{ width: "15%" }} align="right"></TableCell>
                <TableCell align="right">{details.gross}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "5%" }} align="left">
                  {index++}
                </TableCell>
                <TableCell
                  colSpan={3}
                  sx={{ width: "50%", fontWeight: "bold" }}
                >
                  Less: Standard deduction- u/s16 (Ia)
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell sx={{ width: "15%" }} align="right"></TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">75000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "5%" }} align="left">
                  {index++}
                </TableCell>
                <TableCell colSpan={3} sx={{ width: "50%" }}>
                  Net Income from Salary (5-6)
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell sx={{ width: "15%" }} align="right"></TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">{details.netincsal}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{index++}</TableCell>
                <TableCell sx={{ width: "1%" }}>a)</TableCell>
                <TableCell colSpan={2} sx={{ width: "60%" }}>
                  Income from Other Source
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell align="right">0</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "1%" }}>b)</TableCell>
                <TableCell colSpan={2} sx={{ width: "60%" }}>
                  Employer Contribution Towards NPS U/s 80CCD2
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>      
                <TableCell colSpan={3} sx={{ width: "60%" }}>
                  Net Income from Salary (7+8)
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">{details.netincsal}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "5%" }} align="left">
                  {index++}
                </TableCell>
                <TableCell colSpan={6} sx={{ width: "95%" }}>
                  Deductions
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "1%" }}>a)</TableCell>
                <TableCell colSpan={2} sx={{ width: "60%" }}>
                  E.W.F. / S.W.F / CMRF
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell align="right">{details.ewfswf}</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "1%" }}>b)</TableCell>
                <TableCell colSpan={2} sx={{ width: "60%" }}>
                  Interest of Housing Loan U/s 24
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell align="right">0</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "1%" }}>c)</TableCell>
                <TableCell colSpan={2} sx={{ width: "60%" }}>
                  {" "}
                  80G Donations to Charities
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell align="right">0</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "1%" }}>d)</TableCell>
                <TableCell colSpan={2} sx={{ width: "60%" }}>
                  80DD/80U Self/Dependent Expenditure
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell align="right">0</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "1%" }}>e)</TableCell>
                <TableCell colSpan={2} sx={{ width: "60%" }}>
                  Employees Health Cards Premium in AP
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell align="right">{details.ehf}</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "1%" }}>f)</TableCell>
                <TableCell colSpan={2} sx={{ width: "60%" }}>
                  Employer Contribution Towards NPS U/s 80CCD2
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell align="right">0</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell colSpan={3} sx={{ width: "60%" }}>
                  Total Deductions
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell align="right">0</TableCell>
                <TableCell align="right">0</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "5%" }} align="left">
                  {index++}
                </TableCell>
                <TableCell colSpan={3} sx={{ width: "50%" }}>
                  Gross Total Income (8-9)
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell sx={{ width: "15%" }} align="right"></TableCell>
                <TableCell align="right">{details.netincsal}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ width: "5%" }} align="left">
                  {index++}
                </TableCell>
                <TableCell colSpan={6} sx={{ width: "95%" }}>
                  Savings U/s 80C ( Limited to Rs.1,50,000 )
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "1%" }}>a)</TableCell>
                <TableCell colSpan={2} sx={{ width: "60%" }}>
                  {" "}
                  GPF/ZPPF/CPS
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell align="right">{}</TableCell>
                <TableCell align="right">{}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "1%" }}>b)</TableCell>
                <TableCell colSpan={2} sx={{ width: "60%" }}>
                  APGLI
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell align="right">{details.apgli}</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "1%" }}>c)</TableCell>
                <TableCell colSpan={2} sx={{ width: "60%" }}>
                  GIS
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell align="right">{details.gis}</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "1%" }}>d)</TableCell>
                <TableCell colSpan={2} sx={{ width: "60%" }}>
                  {" "}
                  LIC Policies premium Yearly
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell align="right">0</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "1%" }}>e)</TableCell>
                <TableCell colSpan={2} sx={{ width: "60%" }}>
                  {" "}
                  Tuition Fee for Two children
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell align="right">{details.fee}</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell colSpan={3} sx={{ width: "60%" }}>
                  {" "}
                  Total Savings (Deductions) u/s 80C, 80CCC, 80CCD
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell align="right">0</TableCell>
                <TableCell align="right">0</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "5%" }} align="left">
                  {index++}
                </TableCell>
                <TableCell colSpan={3} sx={{ width: "50%" }}>
                  Additional Benefit CPS Employee U/s 80CCD (1B) (upto
                  Rs.50,000/-)
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell sx={{ width: "15%" }} align="right">0</TableCell>
                <TableCell  align="right">0</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "5%" }} align="left">
                  {index++}
                </TableCell>
                <TableCell colSpan={3} sx={{ width: "50%" }}>
                  Gross Total Income (10-(11+12))
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell sx={{ width: "15%" }} align="right"></TableCell>
                <TableCell  align="right">{details.netincsal}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ width: "5%" }} align="left">
                  {index++}
                </TableCell>
                <TableCell colSpan={3} sx={{ width: "50%" }}>
                  Net Taxable Income (12-13) Rounded to multiples of 10
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell sx={{ width: "15%" }} align="right"></TableCell>
                <TableCell  align="right">{details.muloften}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "5%" }} align="left">
                  {index++}
                </TableCell>
                <TableCell colSpan={6} sx={{ width: "95%" }}>
                  Tax on Net Income (i.e on {details.muloften})
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "1%" }}>a)</TableCell>
                <TableCell colSpan={2} sx={{ width: "20%" }}>
                  {" "}
                  Upto-3,00,000
                </TableCell>

                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "1%" }}>b)</TableCell>
                <TableCell sx={{ width: "20%" }}>
                  {" "}
                  3,00,001/- to 6,00,000/- 5%
                </TableCell>
                <TableCell> (40000@5%)</TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "1%" }}>c)</TableCell>
                <TableCell sx={{ width: "50%" }}>
                  {" "}
                  6,00,001/- to 9,00,000/- 10%
                </TableCell>
                <TableCell>(300000@10%)</TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "1%" }}>d)</TableCell>
                <TableCell sx={{ width: "20%" }}>
                  {" "}
                  Above 9,00,001/ to 12,00,000/- 15%
                </TableCell>
                <TableCell> (198770@15%)</TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "1%" }}>e)</TableCell>
                <TableCell sx={{ width: "20%" }}>
                  {" "}
                  Above 12,00,001/ to 15,00,000/- 20%
                </TableCell>
                <TableCell>(0@20%)</TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "1%" }}>f)</TableCell>
                <TableCell sx={{ width: "20%" }}>
                  {" "}
                  Above 15,00,000/- 30%
                </TableCell>
                <TableCell>(0@30%)</TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ width: "5%" }} align="left">
                  {index++}
                </TableCell>
                <TableCell colSpan={3} sx={{ width: "50%" }}>
                  Tax on Income
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell sx={{ width: "15%" }} align="right"></TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right"></TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ width: "5%" }} align="left">
                  {index++}
                </TableCell>
                <TableCell colSpan={3} sx={{ width: "50%" }}>
                  Tax Rebate(U/s 87A-Rs.25000) below Rs.7,00,000
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell sx={{ width: "15%" }} align="right"></TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right"></TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ width: "5%" }} align="left">
                  {index++}
                </TableCell>
                <TableCell colSpan={3} sx={{ width: "50%" }}>
                  Cess(Health 1% + Education 3% )
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell sx={{ width: "15%" }}></TableCell>
                <TableCell sx={{ fontWeight: "bold" }}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "5%" }} align="left">
                  {index++}
                </TableCell>
                <TableCell colSpan={3} sx={{ width: "50%" }}>
                  Net Tax Payable (16+17)
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell sx={{ width: "15%" }} align="right"></TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "5%" }} align="left">
                  {index++}
                </TableCell>
                <TableCell colSpan={6} sx={{ width: "95%" }}>
                  Details of Adv.Tax Deductions
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell colSpan={3} sx={{ width: "60%" }}>
                  Q1:(7500+7500+7500=22500) Q2: (7500+7500+7500 = 22500)
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell rowSpan={2}>Total Advance Tax</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell colSpan={3} sx={{ width: "60%" }}>
                  Q3:(7500+7500+7500 = 22500) Q4: (7500+0+0 = 7500)
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>

                <TableCell align="right"></TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ width: "5%" }} align="left">
                  {index++}
                </TableCell>
                <TableCell colSpan={3} sx={{ width: "50%" }}>
                  Tax to be Paid Amount (18-19)
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                <TableCell sx={{ width: "15%" }} align="right"></TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right"></TableCell>
              </TableRow>
              <TableRow style={{ height: "120px", border: "none" }}>
                <TableCell
                  align="center"
                  style={{
                    fontWeight: "bold",
                    verticalAlign: "bottom",
                    border: "none",
                  }}
                  colSpan={4}
                >
                  Signature of the Employee
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    verticalAlign: "bottom",
                    border: "none",
                  }}
                  colSpan={4}
                >
                  Signature of the DDO
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Button
        variant="contained"
        style={{
          marginTop: "20px",
          marginLeft: "10px",
          padding: "10px",
          marginBottom: "10px",
        }}
        onClick={handleback}
      >
        Back to Main Page for Form-16
      </Button>

      <Button
        variant="contained"
        style={{
          marginTop: "20px",
          marginLeft: "10px",
          padding: "10px",
          marginBottom: "10px",
        }}
        onClick={handleDownload}
      >
        Download Annexue PDF
      </Button>
    </div>
  );
};

export default AnnexureIItable;
