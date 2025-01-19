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
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const AnnexureIItable = () => {
  const [details, setDetails] = useState({
    empname: "",
    age: "",
    office: "",
    desg: "",
    add: "",
    pan: "",
    treasuryid: "",
    livingin: "",
  });

  const location = useLocation(); // Access the state passed from the form
  const navigate = useNavigate();

  const handletable = () => {
    navigate("/table", { state: location.state }); // Navigate back to the form with previous data
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

        setDetails({
          empname: formData.personalDetails.employeeName || "",
          age: formData.personalDetails.age || "",
          office: formData.personalDetails.workingPlace || "",
          desg: formData.personalDetails.designation,
          add: formData.personalDetails.mandalDistrict,
          pan: formData.personalDetails.panNumber,
          treasuryid: formData.personalDetails.employeeId,
          livingin: formData.payParticulars.housetype,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSalaryData();
  }, []);

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
                colSpan={6}
                align="center"
                style={{ fontWeight: "bold", textAlign: "center" }}
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
              <TableCell colSpan={2} align="center">
                Name : {details.empname}
              </TableCell>
              <TableCell colSpan={2} align="center">
                Age : {details.age}
              </TableCell>
              <TableCell colSpan={2} align="center">
                Office : {details.office}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} align="center">
                Designation : {details.desg}
              </TableCell>
              <TableCell colSpan={3} align="center">
                Address : {details.add}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} align="center">
                Living in : {details.livingin}
              </TableCell>
              <TableCell colSpan={2} align="center">
                PAN : {details.pan}
              </TableCell>
              <TableCell colSpan={2} align="center">
                Treasury ID : {details.treasuryid}
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell colSpan={3}>Gross Salary</TableCell>
              <TableCell >Rs.</TableCell>
              <TableCell colSpan={2}></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AnnexureIItable;
