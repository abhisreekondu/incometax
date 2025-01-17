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

const SalaryTable = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

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

  // Fetch data from both APIs and merge
  useEffect(() => {
    const fetchSalaryData = async () => {
      try {
        const [salaryResponse, formResponse] = await Promise.all([
          fetch("http://localhost:3002/get-salary-data"), // Fetch salary data
          fetch("http://localhost:3002/get-form-data"), // Fetch form data
        ]);

        // Handle errors
        if (!salaryResponse.ok) {
          throw new Error(`Salary data error: ${salaryResponse.status}`);
        }
        if (!formResponse.ok) {
          throw new Error(`Form data error: ${formResponse.status}`);
        }

        const salaryData = await salaryResponse.json();
        const formData = await formResponse.json();

        // Transform and merge data for the table
        const tableData = months.map((month) => ({
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
            salaryData.basesalary[month] +
              salaryData.da[month] +
              salaryData.hra[month] +
              salaryData.hma[month] +
              formData.allowances.cca +
              formData.allowances.pha +
              formData.allowances.otherallowance || 0,
          cps: salaryData.cps[month] || 0,
          apgli: salaryData.apgli[month] || 0,
          gis: salaryData.gis[month] || 0,
          pt:200,
          itadv:formData.advanceTax[month]||0,
          ehf:formData.salaryDeductions.ehsamt||0,
          ewfswf:salaryData.ewfswf[month] || 0,
          otherdeductions:formData.salaryDeductions.otherdeductions||0,
          totaldeductions:
          salaryData.cps[month] +salaryData.apgli[month]+salaryData.gis[month]+200+formData.advanceTax[month]+formData.salaryDeductions.ehsamt+salaryData.ewfswf[month]+formData.salaryDeductions.otherdeductions ||0,
          net: salaryData.basesalary[month] +
          salaryData.da[month] +
          salaryData.hra[month] +
          salaryData.hma[month] +
          formData.allowances.cca +
          formData.allowances.pha +
          formData.allowances.otherallowance-( salaryData.cps[month] +salaryData.apgli[month]+salaryData.gis[month]+200+formData.advanceTax[month]+formData.salaryDeductions.ehsamt+salaryData.ewfswf[month]+formData.salaryDeductions.otherdeductions) || 0
        }));

        setRows(tableData);
        setLoading(false); // Data successfully loaded
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
        setLoading(false); // Stop loading on error
      }
    };

    fetchSalaryData();
  }, []);

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
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="salary table">
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                position: "sticky",
                left: 0,
                background: "#fff",
                zIndex: 2,
              }}
            >
              Month
            </TableCell>
            <TableCell align="right">Basic</TableCell>
            <TableCell align="right">DA</TableCell>
            <TableCell align="right">HRA</TableCell>
            <TableCell align="right">IR</TableCell>
            <TableCell align="right">HMA/PP/FP</TableCell>
            <TableCell align="right">CCA</TableCell>
            <TableCell align="right">PHA</TableCell>
            <TableCell align="right">Others</TableCell>
            <TableCell align="right">Gross</TableCell>
            <TableCell align="right">CPS</TableCell>
            <TableCell align="right">APGLI</TableCell>
            <TableCell align="right">GIS</TableCell>
            <TableCell align="right">PT</TableCell>
            <TableCell align="right">IT Adv</TableCell>
            <TableCell align="right">EHF</TableCell>
            <TableCell align="right">EWF/SWF</TableCell>
            <TableCell align="right">Other Deductions</TableCell>
            <TableCell align="right">Total Deductions</TableCell>
            <TableCell align="right">Net</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.month}>
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
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SalaryTable;
