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
import useTaxStore from "../store/taxStore";

const Form16 = () => {
    const navigate = useNavigate();
  const formData = useFormStore((state) => state.formData);
  const salaryData = useSalaryDataStore((state) => state.salaryData);
  const taxDetails = useTaxStore((state) => state.taxDetails); 
  let idx = 1;
  let idx1=1
  const annexure = () => {
  
    navigate("/annexureii"); 
  };
    const handleback = () => {
      navigate("/table");
    };
  return (
    <div>
      <div
        id="page-1"
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
            aria-label="first table"
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
                  <h3>FORM No.16</h3>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={6} align="center">
                  ( Vide rule 31(1)(a) of Income Tax Rules, 1962 ) <br />
                  for Tax deducted at source from income chargeable under the
                  head salaries
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}>Name and Adress of the DDO</TableCell>
                <TableCell colSpan={3}>
                  Name and Address of the Employee
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}>
                  {formData.ddoDetails.ddoname} {formData.ddoDetails.ddooffice}
                </TableCell>
                <TableCell colSpan={3}>
                  {formData.personalDetails.employeeName}{" "}
                  {formData.personalDetails.workingPlace}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>TAN No. of Deductor</TableCell>
                <TableCell colSpan={2}>PAN No. of Deductor</TableCell>
                <TableCell colSpan={2}>Treasury ID No.</TableCell>
              </TableRow>
              <TableCell colSpan={2}>{formData.ddoDetails.ddotanno}</TableCell>
              <TableCell colSpan={2}>
                {formData.personalDetails.panNumber}
              </TableCell>
              <TableCell colSpan={2}>
                {formData.personalDetails.employeeId}
              </TableCell>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Acknowledgement Nos.of allquarterly statements of TDS under
                  sub-section 200
                  <br />
                  as provided by TIN facilitation center or NSDL web-site
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" sx={{ width: "11%" }}>
                  Quarter
                </TableCell>
                <TableCell sx={{ width: "29%" }}>Acknowledgement No </TableCell>
                <TableCell align="center" sx={{ width: "13%" }}>
                  Amount
                </TableCell>
                <TableCell colSpan={2} align="center">
                  Period
                </TableCell>
                <TableCell align="center">Assessment Year</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1. (Mar to May) </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2. (Jun to Aug) </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell rowSpan={3} sx={{ width: "17%" }}>
                  01-Mar-{new Date().getFullYear() - 1}
                </TableCell>
                <TableCell rowSpan={3}>
                  29-Feb-{new Date().getFullYear()}
                </TableCell>
                <TableCell rowSpan={3}>
                  {new Date().getFullYear()}-{new Date().getFullYear() + 1}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>3. (Sep to Nov) </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>4. (Dec to Feb) </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Table
            stickyHeader
            aria-label="first table"
            sx={{
              width: "100%",
              borderCollapse: "collapse",
              "& td, & th": {
                border: "1px solid black",
                padding: "5px",
              },
            }}
          >
            <TableBody>
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Details of Salary Paid and any Other Income and Tax Deducted
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Gross Salary
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ width: "2%" }}>{idx++}</TableCell>
                <TableCell sx={{ width: "2%" }}>a)</TableCell>
                <TableCell sx={{ width: "60%" }}>
                  {" "}
                  Salary as per provisions cotained in section 17 (1){" "}
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell sx={{ width: "15%" }}></TableCell>
                <TableCell sx={{ width: "15%" }}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "5%" }}>b)</TableCell>
                <TableCell>
                  {" "}
                  Value of percuisites under section 17(2) (As Per Form No.
                  12BA, Wherever applicable){" "}
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell sx={{ width: "15%" }}></TableCell>
                <TableCell sx={{ width: "15%" }}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>c)</TableCell>
                <TableCell>
                  Profits in lieu of salary under section 17(3) (as per Form No.
                  12BA, Wherever applicable){" "}
                </TableCell>
                <TableCell>Rs</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "5%" }}>d)</TableCell>
                <TableCell> Total</TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell sx={{ width: "15%" }}></TableCell>
                <TableCell sx={{ width: "15%" }}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "5%" }}>{idx++}</TableCell>
                <TableCell colSpan={2}>
                  Reported Total amount of salary received{" "}
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell sx={{ width: "15%" }}></TableCell>
                <TableCell sx={{ width: "15%" }}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "5%" }}>{idx++}</TableCell>
                <TableCell colSpan={2}>
                  Less: Allowance to the extent exempted U/s 10{" "}
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell sx={{ width: "15%" }}></TableCell>
                <TableCell sx={{ width: "15%" }}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "5%" }}>a)</TableCell>
                <TableCell>Travel concession or assistance us 10(5) </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell sx={{ width: "15%" }}></TableCell>
                <TableCell sx={{ width: "15%" }}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "5%" }}>b)</TableCell>
                <TableCell>
                  Death-cum-retirement gratuity under section 10(10){" "}
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell sx={{ width: "15%" }}></TableCell>
                <TableCell sx={{ width: "15%" }}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "5%" }}>c)</TableCell>
                <TableCell>
                  {" "}
                  Commuted value of pension under section 10(10A){" "}
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell sx={{ width: "15%" }}></TableCell>
                <TableCell sx={{ width: "15%" }}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "5%" }}>d)</TableCell>
                <TableCell>
                  {" "}
                  Cash equivalent of leave salary encash u/s 10 AA{" "}
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell sx={{ width: "15%" }}></TableCell>
                <TableCell sx={{ width: "15%" }}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "5%" }}>e)</TableCell>
                <TableCell>PH Allowence </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell sx={{ width: "15%" }}></TableCell>
                <TableCell sx={{ width: "15%" }}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "5%" }}>f)</TableCell>
                <TableCell>
                  House rent allowance under section 10(13A){" "}
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell sx={{ width: "15%" }}></TableCell>
                <TableCell sx={{ width: "15%" }}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell colSpan={2}>
                  Total amount of exemption claimed u/s 3 (a+f){" "}
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell sx={{ width: "15%" }}></TableCell>
                <TableCell sx={{ width: "15%" }}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "5%" }}>{idx++}</TableCell>
                <TableCell colSpan={2}>
                  Income under the Head Salaries (2-3){" "}
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell sx={{ width: "15%" }}></TableCell>
                <TableCell sx={{ width: "15%" }}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "5%" }}>{idx++}</TableCell>
                <TableCell colSpan={5}>
                  Less: Standard deduction- u/s 16{" "}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "5%" }}></TableCell>
                <TableCell colSpan={2} sx={{ fontWeight: "bold" }}>
                  Standard deduction under section 16(ia){" "}
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell
                  sx={{ width: "15%", fontWeight: "bold" }}
                ></TableCell>
                <TableCell
                  sx={{ width: "15%", fontWeight: "bold" }}
                ></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "5%" }}></TableCell>
                <TableCell colSpan={2}>
                  Entertainment allowance under section 16(ii){" "}
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell sx={{ width: "15%" }}></TableCell>
                <TableCell sx={{ width: "15%" }}></TableCell>
              </TableRow>
              <TableCell sx={{ width: "5%" }}></TableCell>
              <TableCell colSpan={2}>
                Tax on employment under section 16(iii){" "}
              </TableCell>
              <TableCell sx={{ width: "5%" }}>Rs</TableCell>
              <TableCell sx={{ width: "15%" }}></TableCell>
              <TableCell sx={{ width: "15%" }}></TableCell>
              <TableRow>
                <TableCell sx={{ width: "5%" }}>{idx++}</TableCell>
                <TableCell colSpan={4}>Net Income from Salary </TableCell>
                <TableCell sx={{ width: "15%" }}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "5%" }}>{idx++}</TableCell>
                <TableCell colSpan={5}>
                  Any other income reported by the employee under as per section
                  192 (2B)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "5%" }}></TableCell>
                <TableCell colSpan={3}> Income From other sources </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell sx={{ width: "25%" }}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "5%" }}></TableCell>
                <TableCell colSpan={3}>
                  Employer Contribution Towards NPS U/s 80CCD2{" "}
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell sx={{ width: "25%" }}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "5%" }}></TableCell>
                <TableCell colSpan={3}>
                  {" "}
                  Income from House Property U/s 24 (vi){" "}
                </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell sx={{ width: "25%" }}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "5%" }}>{idx++}</TableCell>
                <TableCell colSpan={3}> Gross Total Income (6+7) </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell sx={{ width: "25%" }}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "5%" }}>{idx++}</TableCell>
                <TableCell colSpan={5}>Deductions Under Chapter VI-A</TableCell>
              </TableRow>
            </TableBody>
          </Table>
  
          <Table
            stickyHeader
            aria-label="first table"
            sx={{
              width: "100%",
              borderCollapse: "collapse",
              "& td, & th": {
                border: "1px solid black",
                padding: "5px",
              },
            }}
          >
            <TableBody>
              <TableRow>
                <TableCell sx={{ width: "5%" }}>A)</TableCell>
                <TableCell sx={{ width: "55%" }}>
                  Under Section 80C,80CCC,80CCD, 80CCF
                </TableCell>
                <TableCell colSpan={2}>Gross Amount</TableCell>
                <TableCell colSpan={2}>Qualifying Amount </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{width:"5%"}}>{idx1++}</TableCell>
                <TableCell sx={{width:"55%"}}> a)Section 80C</TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell></TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{width:"5%"}}>{idx1++}</TableCell>
                <TableCell sx={{width:"55%"}}> CPS</TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell></TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{width:"5%"}}>{idx1++}</TableCell>
                <TableCell sx={{width:"55%"}}> APGLI</TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell></TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{width:"5%"}}>{idx1++}</TableCell>
                <TableCell sx={{width:"55%"}}> GIS</TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell></TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{width:"5%"}}>{idx1++}</TableCell>
                <TableCell sx={{width:"55%"}}> LIC Policies premium Yearly </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell></TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{width:"5%"}}>{idx1++}</TableCell>
                <TableCell sx={{width:"55%"}}> Tuition Fee for Two children </TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell></TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{width:"5%"}}>{idx1++}</TableCell>
                <TableCell sx={{width:"55%"}}>Repayment of Housing Loan installments</TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell></TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{width:"5%"}}>{idx1++}</TableCell>
                <TableCell sx={{width:"55%"}}>	PLI (Postal Life Insurance)</TableCell> 
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell></TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{width:"5%"}}>{idx1++}</TableCell>
                <TableCell sx={{width:"55%"}}>Stamp Duty and Registration Charges</TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell></TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{width:"5%"}}>{idx1++}</TableCell>
                <TableCell sx={{width:"55%"}}>Fixed deposit in banks more than 5-Years</TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell></TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{width:"5%"}}>{idx1++}</TableCell>
                <TableCell sx={{width:"55%",fontWeight:"bold"}} > Total Under Section 80C,80CCC,80CCD,80CC</TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell></TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{width:"5%"}}>{idx1++}</TableCell>
                <TableCell sx={{width:"55%",fontWeight:"bold"}}> Intrest on Saving Account 80TTA</TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell></TableCell>
                <TableCell sx={{ width: "5%" }}>Rs</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

      </div>
      <div
        id="page-2"
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
            aria-label="first table"
            sx={{
              width: "100%",
              borderCollapse: "collapse",
              "& td, & th": {
                border: "1px solid black",
                padding: "5px",
              },
            }}
          >
            

            <TableBody>
              <TableRow>
              <TableCell sx={{ width: "5%" }}></TableCell>
              <TableCell sx={{ width: "5%" }}>b)</TableCell>
              <TableCell sx={{ width: "50%" }}>NPS U/s 80CCD (1)</TableCell>
              <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
              <TableCell></TableCell>

              <TableCell></TableCell>
              </TableRow>
              <TableRow>
              <TableCell sx={{ width: "5%" }}></TableCell>
              <TableCell sx={{ width: "5%" }}></TableCell>
              <TableCell sx={{ width: "50%" }}> National Pension Scheme U/s 80CCD (1B)</TableCell>
              <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              </TableRow>
              <TableRow>
              <TableCell sx={{ width: "5%" }}></TableCell>
              <TableCell colSpan={2}>Total Amount of Section a and b</TableCell>
              <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              </TableRow>

            </TableBody>
            
          
          </Table>
          <Table
            stickyHeader
            aria-label="second table"
            sx={{
              width: "100%",
              borderCollapse: "collapse",
              "& td, & th": {
                border: "1px solid black",
                padding: "5px",
              },
            }}
          >
            <TableRow>
              <TableCell sx={{width:"5%"}}>B)</TableCell>
              <TableCell sx={{width:"40%"}} colSpan={3}>Other Section Under Chapter VI A <br/>
              ( Under Section 80E, 80G, 80TTA, 80G, 80DD etc. )</TableCell>
              <TableCell sx={{width:"15%"}}>Gross Amount</TableCell>
              <TableCell sx={{width:"15%"}}>Qualifying Amount</TableCell>
              <TableCell sx={{width:"15%"}}></TableCell>
            </TableRow>
            <TableRow>
            <TableCell sx={{width:"5%"}}></TableCell>
            <TableCell sx={{width:"5%"}}>80G</TableCell>
              <TableCell sx={{width:"40%"}}>EWF, SWF & CMRF</TableCell>
              <TableCell sx={{width:"5%"}}>Rs.</TableCell>
              <TableCell sx={{width:"15%"}}></TableCell>
              <TableCell sx={{width:"15%"}}></TableCell>
              <TableCell sx={{width:"15%"}}></TableCell>
            </TableRow>
            <TableRow>
            <TableCell sx={{width:"5%"}}></TableCell>
            <TableCell sx={{width:"5%"}}>24B</TableCell>
              <TableCell sx={{width:"40%"}}>Interest of Housing Loan U/s 24</TableCell>
              <TableCell sx={{width:"5%"}}>Rs.</TableCell>
              <TableCell sx={{width:"15%"}}></TableCell>
              <TableCell sx={{width:"15%"}}></TableCell>
              <TableCell sx={{width:"15%"}}></TableCell>
            </TableRow>
            <TableRow>
            <TableCell sx={{width:"5%"}}></TableCell>
            <TableCell sx={{width:"5%"}}></TableCell>
              <TableCell sx={{width:"40%"}}>80G Donations to Charities</TableCell>
              <TableCell sx={{width:"5%"}}>Rs.</TableCell>
              <TableCell sx={{width:"15%"}}></TableCell>
              <TableCell sx={{width:"15%"}}></TableCell>
              <TableCell sx={{width:"15%"}}></TableCell>
            </TableRow>
            <TableRow>
            <TableCell sx={{width:"5%"}}></TableCell>
            <TableCell sx={{width:"5%"}}>80U/80DD</TableCell>
              <TableCell sx={{width:"40%"}}>Self/Dependent Expenditure of Disabled</TableCell>
              <TableCell sx={{width:"5%"}}>Rs.</TableCell>
              <TableCell sx={{width:"15%"}}></TableCell>
              <TableCell sx={{width:"15%"}}></TableCell>
              <TableCell sx={{width:"15%"}}></TableCell>
            </TableRow>
            <TableRow>
            <TableCell sx={{width:"5%"}}></TableCell>
            <TableCell sx={{width:"5%"}}>80D</TableCell>
              <TableCell sx={{width:"40%"}}>Employees Health Cards Premium in AP</TableCell>
              <TableCell sx={{width:"5%"}}>Rs.</TableCell>
              <TableCell sx={{width:"15%"}}></TableCell>
              <TableCell sx={{width:"15%"}}></TableCell>
              <TableCell sx={{width:"15%"}}></TableCell>
            </TableRow>
            <TableRow>
            <TableCell sx={{width:"5%"}}></TableCell>
            <TableCell sx={{width:"5%"}}>80CCD(2)	</TableCell>
              <TableCell sx={{width:"40%"}}>Employer Contribution Towards CPS</TableCell>
              <TableCell sx={{width:"5%"}}>Rs.</TableCell>
              <TableCell sx={{width:"15%"}}></TableCell>
              <TableCell sx={{width:"15%"}}></TableCell>
              <TableCell sx={{width:"15%"}}></TableCell>
            </TableRow>
            <TableRow>
            <TableCell sx={{width:"5%"}}></TableCell>
            <TableCell sx={{width:"5%"}}></TableCell>
              <TableCell sx={{width:"40%"}}>80E Interest of Educational Loan</TableCell>
              <TableCell sx={{width:"5%"}}>Rs.</TableCell>
              <TableCell sx={{width:"15%"}}></TableCell>
              <TableCell sx={{width:"15%"}}></TableCell>
              <TableCell sx={{width:"15%"}}></TableCell>
            </TableRow>
            <TableRow>
            <TableCell sx={{width:"5%"}}></TableCell>
            <TableCell sx={{width:"5%"}}></TableCell>
              <TableCell sx={{width:"40%"}}>Additional Benefit CPS Employee U/s 80CCD (1B)(upto Rs.50,000/-)</TableCell>
              <TableCell sx={{width:"5%"}}>Rs.</TableCell>
              <TableCell sx={{width:"15%"}}></TableCell>
              <TableCell sx={{width:"15%"}}></TableCell>
              <TableCell sx={{width:"15%"}}></TableCell>
            </TableRow>
            </Table>
            <Table 
             stickyHeader
             aria-label="second table"
             sx={{
               width: "100%",
               borderCollapse: "collapse",
               "& td, & th": {
                 border: "1px solid black",
                 padding: "5px",
               },
             }}
            >

            <TableRow>

            <TableCell sx={{width:"5%"}}></TableCell>
              <TableCell sx={{width:"75.2%"}} colSpan={4}>Total Under Sections 80G,80E,80DD etc..</TableCell>
              <TableCell sx={{width:"5%"}}>Rs.</TableCell>
              <TableCell sx={{width:"15%"}}></TableCell>
            </TableRow>
            <TableRow>
            <TableCell sx={{width:"5%"}}>{idx1++}</TableCell>
              <TableCell sx={{width:"75.2%"}} colSpan={4}>Aggregate of Deductible Amounts U/Chapter VIA (A+B)</TableCell>
              <TableCell sx={{width:"5%"}}>Rs.</TableCell>
              <TableCell sx={{width:"15%"}}></TableCell>
            </TableRow>
            <TableRow>
            <TableCell sx={{width:"5%"}}>{idx1++}</TableCell>
              <TableCell sx={{width:"75.2%"}} colSpan={4}>Net Taxable Income (Column 8- Column 10)</TableCell>
              <TableCell sx={{width:"5%"}}>Rs.</TableCell>
              <TableCell sx={{width:"15%"}}></TableCell>
            </TableRow>
            <TableRow>
            <TableCell sx={{width:"5%"}}>{idx1++}</TableCell>
              <TableCell sx={{width:"75.2%"}} colSpan={4}>Tax on Income(Rounded)</TableCell>
              <TableCell sx={{width:"5%"}}>Rs.</TableCell>
              <TableCell sx={{width:"15%"}}></TableCell>
            </TableRow>  
            </Table>
         
         <Table
         aria-label="second table"
         sx={{
           width: "100%",
           borderCollapse: "collapse",
           "& td, & th": {
             border: "1px solid black",
             padding: "5px",
           },
         }}
         >
            <TableBody>
            <TableRow>
                            <TableCell></TableCell>
                            <TableCell sx={{ width: "3%" }}>a)</TableCell>
                            <TableCell colSpan={2} sx={{ width: "20%" }}>
                              {" "}
                              Upto-3,00,000
                            </TableCell>
            
                            <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">0</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell></TableCell>
                            <TableCell sx={{ width: "3%" }}>b)</TableCell>
                            <TableCell sx={{ width: "20%" }}>
                              {" "}
                              3,00,001/- to 7,00,000/- 5%
                            </TableCell>
                            <TableCell> ({taxDetails?.b.taxable}@5%)</TableCell>
                            <TableCell sx={{ width: "5%" }}>Rs.</TableCell>
                            <TableCell align="right" sx={{width:"10%"}} ></TableCell>
                            <TableCell align="right">{taxDetails?.b.tax}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell></TableCell>
                            <TableCell sx={{ width: "3%" }}>c)</TableCell>
                            <TableCell sx={{ width: "50%" }}>
                              {" "}
                              7,00,001/- to 10,00,000/- 10%
                            </TableCell>
                            <TableCell>({taxDetails?.c.taxable}@10%)</TableCell>
                            <TableCell >Rs.</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">{taxDetails?.c.tax}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell></TableCell>
                            <TableCell >d)</TableCell>
                            <TableCell sx={{ width: "20%" }}>
                              {" "}
                              Above 10,00,001/ to 12,00,000/- 15%
                            </TableCell>
                            <TableCell> ({taxDetails?.d.taxable}@15%)</TableCell>
                            <TableCell >Rs.</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">{taxDetails?.d.tax}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell></TableCell>
                            <TableCell >e)</TableCell>
                            <TableCell sx={{ width: "20%" }}>
                              {" "}
                              Above 12,00,001/ to 15,00,000/- 20%
                            </TableCell>
                            <TableCell>({taxDetails?.e.taxable}@20%)</TableCell>
                            <TableCell >Rs.</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">{taxDetails?.e.tax}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell></TableCell>
                            <TableCell >f)</TableCell>
                            <TableCell sx={{ width: "20%" }}>
                              {" "}
                              Above 15,00,000/- 30%
                            </TableCell>
                            <TableCell>({taxDetails?.f.taxable}@30%)</TableCell>
                            <TableCell >Rs.</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">{taxDetails?.f.tax}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{width:"5%"}}>{idx1++}</TableCell>
                            <TableCell colSpan={3}>Tax on Income </TableCell>
                            <TableCell >Rs.</TableCell>
                            <TableCell colSpan={2}></TableCell>
                          </TableRow>
                          </TableBody>
                          
                          </Table>
                          <Table
                          aria-label="second table"
                          sx={{
                            width: "100%",
                            borderCollapse: "collapse",
                            "& td, & th": {
                              border: "1px solid black",
                              padding: "5px",
                            },
                          }}
                          >
                            <TableBody>
                              <TableRow>
                                <TableCell sx={{width:"5%"}}>{idx1++}</TableCell>
                                <TableCell>Tax Rebate(U/s 87A-Rs.25000) below Rs.7,00,000</TableCell>
                                <TableCell sx={{width:"5%"}}>Rs.</TableCell>
                                <TableCell sx={{width:"18.6%"}}></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell sx={{width:"5%"}}>{idx1++}</TableCell>
                                <TableCell>TAX PAYBLE (12-13)</TableCell>
                                <TableCell sx={{width:"5%"}}>Rs.</TableCell>
                                <TableCell sx={{width:"18.6%"}}></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell sx={{width:"5%"}}>{idx1++}</TableCell>
                                <TableCell>Health Cess @ 1% + Education Cess @ 3%</TableCell>
                                <TableCell sx={{width:"5%"}}>Rs.</TableCell>
                                <TableCell sx={{width:"18.6%"}}></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell sx={{width:"5%"}}>{idx1++}</TableCell>
                                <TableCell>TAX PAYABLE (14+15)</TableCell>
                                <TableCell sx={{width:"5%"}}>Rs.</TableCell>
                                <TableCell sx={{width:"18.6%"}}></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell sx={{width:"5%"}}>{idx1++}</TableCell>
                                <TableCell>Less: (a) Tax deducted at source U/s 192(1))</TableCell>
                                <TableCell sx={{width:"5%"}}>Rs.</TableCell>
                                <TableCell sx={{width:"18.6%"}}></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell sx={{width:"5%"}}></TableCell>
                                <TableCell>(b)Tax Paid by the Employer on behalf of the Employee U/S 192 (1A) on perquisited U/S 17 (2)</TableCell>
                                <TableCell sx={{width:"5%"}}>Rs.</TableCell>
                                <TableCell sx={{width:"18.6%"}}></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell sx={{width:"5%"}}>{idx1++}</TableCell>
                                <TableCell>Less: Relief under section 89 (1) (attach details)</TableCell>
                                <TableCell sx={{width:"5%"}}>Rs.</TableCell>
                                <TableCell sx={{width:"18.6%"}}></TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell sx={{width:"5%"}}>{idx1++}</TableCell>
                                <TableCell>	Net Tax to be Paid</TableCell>
                                <TableCell sx={{width:"5%"}}>Rs.</TableCell>
                                <TableCell sx={{width:"18.6%"}}></TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                          <Table
                          aria-label="second table"
                          sx={{
                            width: "100%",
                            borderCollapse: "collapse",
                            "& td, & th": {
                              border: "1px solid black",
                              padding: "5px",
                            },
                          }}
                          >
                            <TableBody>
                              <TableRow>
                                <TableCell sx={{textAlign:"center"}} colSpan={9}>DETAILS OF TAX DEDUCTED AND DEPOSITED INTO CENTRAL GOVERNMENT ACCOUNT (The employer is provide tranction - wise details of tax deducted and deposited )</TableCell>

                              </TableRow>
                              <TableRow>
                                <TableCell sx={{width:"11%"}}>Sl. No</TableCell>
                                <TableCell sx={{width:"11%"}}>TDS Rs.</TableCell>
                                <TableCell sx={{width:"11%"}}>Surcharge Rs.	</TableCell>
                                <TableCell sx={{width:"11%"}}>Education Cess Rs.</TableCell>
                                <TableCell sx={{width:"11%"}}>Total Tax Deposited Rs.</TableCell>
                                <TableCell sx={{width:"11%"}}>Cheque/DD No. (if any)</TableCell>
                                <TableCell sx={{width:"11%"}}>	BSR Code of Bank Branch</TableCell>
                                <TableCell sx={{width:"11%"}}>Date on Which Tax Deposited</TableCell>
                                <TableCell sx={{width:"11%"}}>Transfer vocher/chalana Identification No</TableCell>
                              </TableRow>
                              {[...Array(12)].map((_, index) => (
      <TableRow key={index}>
        <TableCell>{index + 1}</TableCell> {/* Serial number */}
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
      </TableRow>
    ))}
        <TableRow >  
          <TableCell colSpan={9} sx={{textAlign:"center"}}> 
            I Sri./Smt. working in the capacity of do hereby certify that the sum of Rupess stated above deducted at source and paid to the credit of the central <br/> Government. I further certify that the Information given above is true and correct based on the books of account, documents and other available records.                    
          </TableCell>
          </TableRow> 
          <TableRow>
          <TableCell  colSpan={5}></TableCell>
            <TableCell  colSpan={4}>Sign--</TableCell>
              </TableRow> 
              <TableRow>
          <TableCell  colSpan={5}>Place:</TableCell>
            <TableCell  colSpan={4}>Sign of the person responsible for deduction of tax :</TableCell>
              </TableRow>
              <TableRow>
          <TableCell  colSpan={5}>Date:</TableCell>
            <TableCell  colSpan={4}>Full Name:</TableCell>
              </TableRow>
              </TableBody>
          </Table>
          </TableContainer>
          <Button  variant="contained"
        style={{
          marginTop: "20px",
          marginLeft: "10px",
          padding: "10px",
          marginBottom: "10px",
           width:"17%"
        }} 
        onClick={handleback}>Back to Salary Table
        </Button>
        <Button  variant="contained"
        style={{
          marginTop: "20px",
          marginLeft: "10px",
          padding: "10px",
          marginBottom: "10px",
           width:"17%"
        }}onClick={annexure}>Back to Annexure-II</Button>
          <Button  variant="contained"
        style={{
          marginTop: "20px",
          marginLeft: "10px",
          padding: "10px",
          marginBottom: "10px",
           width:"17%"
        }}>Download front page</Button>
          <Button  variant="contained"
        style={{
          marginTop: "20px",
          marginLeft: "10px",
          padding: "10px",
          marginBottom: "10px",
           width:"17%"
        }}>Download second page</Button>
       
          </div>
    </div>
  );
};

export default Form16;
