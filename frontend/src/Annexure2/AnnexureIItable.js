import React from 'react'
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


export const AnnexureIItable = () => {
      const [rows, setRows] = useState([]);
      const [otherRows, setOtherRows] = useState({}); // Define otherRows state
      const [loading, setLoading] = useState(true); // Loading state
      const [error, setError] = useState(null); // Error state
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
            const details={
                empname:formData.personalDetails.employeeName ||"",
                age:formData.personalDetails.age||"",
                office:formData.personalDetails.workingPlace||"",
                desg:formData.personalDetails.designation,
                add:formData.personalDetails.mandalDistrict,
                pan:formData.personalDetails.panNumber,
                treasuryid:formData.personalDetails.employeeId,
                livingin: formData.payParticulars.housetype

            }
    
            // Data successfully loaded
        }catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to load data. Please try again later.");
            setLoading(false); // Stop loading on error
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
</TableHead>


</Table>
</TableContainer>



















    </div>
  )
}
