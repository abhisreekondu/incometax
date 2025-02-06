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

const Form16 = () => {
  const formData = useFormStore((state) => state.formData);
  const salaryData = useSalaryDataStore((state) => state.salaryData);
  let idx = 1;
  let idx1=1
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
                  12BA, Wherver applicable){" "}
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
            <Button>Download front page</Button>

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

          

          </TableContainer>
          </div>
    </div>
  );
};

export default Form16;
