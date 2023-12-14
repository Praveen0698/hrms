import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import {Link}from 'react-router-dom';
import Button from "@mui/material/Button";
// import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { MdAdd } from "react-icons/md";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import { Card } from "@mui/material";
import SideBar from "../../../components/SideBar";
import Header from "../../../components/Header";

import * as api from "../api"
import StateAdvanceSalary from "../StateAdvanceSalary";
import AdvanceSalaryTable from "../AdvanceSalaryTable";
import AdvanceSalaryForm from "../AdvanceSalaryForm";


const AdvanceSalaryView = () => {
 
  
 
  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

  const {
   payroll,dueSalary,advanceSalary, setDueSalary, setPayroll,recDelete,setRecDelete,department,setDepartment, formVisible,setFormVisible,toggle,setToggle,company,setCompany,location,setLocation,dateError,setDateError

 } = StateAdvanceSalary();

 
  const [formData, setFormData] = useState({
   
  createdDate: " ",
	employeeName: " ",
	salary: " ",
	advanceAmount: " ",
	salaryDue: " ",
	monthAndYear: " ",

  });

 

  const CalculateDueSalary = ()=> {
    let Duesalary = parseInt(formData.salary) - parseInt(formData.advanceAmount)
    setDueSalary(Duesalary);
  }
 

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,

    });
    CalculateDueSalary()
  };
  console.log(formData)


  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // handleClose();
  };

  useEffect(() => {
    loadAdvanceSalary();
   
  }, []);

  useEffect(() => {
    CalculateDueSalary();
  })

  const loadAdvanceSalary = async () => {
    const result = await api.loadAdvanceSalary()
    console.log("rec", result);
    setDepartment(result);
  };

  

  return (
    <div>
    <Header />
    <div className="dashboard-container">
      <SideBar />
      <div className="head-foot-part">
    <section>
      <div
        className="above-table"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>
          <Button
            variant="outlined"
            onClick={() => {
              setToggle(!toggle);
              handleButtonClick();
            }}
            style={{ height: "35px" }}
          >
            {toggle ? (
              <div>
                <BiSolidHide style={{ fontSize: "14px", marginRight: "3px" }} />
                HIDE
              </div>
            ) : (
              <div>
                <MdAdd style={{ fontSize: "14px", marginRight: "3px" }} />
                ADD ADVANCE SALARY
              </div>
            )}
          </Button>
        </div>
      </div>
      <Collapse in={formVisible}>
        <Card variant="outlined" style={{ boxShadow: ' 1px 1px 10px black' }}>
          <div style={{ marginTop: "20px" }}>
            <h3
              style={{
                textAlign: "center",
                marginTop: "25px",
                fontWeight: "600",
              }}
            >
           Advance Salary Form
            </h3>
            <DialogContent>
              {/* <form onSubmit={handleSubmit}>
                <div style={{ display: "flex" }}>
                <TextField
                    margin="dense"
                    label="Created Date"
                    type="date"
                    fullWidth
                    name="createdDate"
                    id="createdDate"
                    value={formData.createdDate}
                    onChange={(e) => handleInputChange(e)}
                    required
                    style={{ margin: "0 3px" }}
                  />
                  <TextField
                    margin="dense"
                    label="Employee Name"
                    type="text"
                    fullWidth
                    name="employeeName"
                    id="employeeName"
                    value={formData.employeeName}
                    onChange={(e) => handleInputChange(e)}
                    required
                    style={{ margin: "0 3px" }}
                  />
                </div>

                <div style={{ display: "flex" }}>
                <TextField
                    margin="dense"
                    label="Salary"
                    type="number"
                    fullWidth
                    name="salary"
                    id="salary"
                    value={formData.salary}
                    onChange={(e) => handleInputChange(e)}
                    required
                    style={{ margin: "8px 3px" }}
                  />
                  <TextField
                    margin="dense"
                    label="Advance Amount"
                    type="number"
                    fullWidth
                    name="advanceAmount"
                    id="advanceAmount"
                    value={formData.advanceAmount}
                    onChange={(e) => handleInputChange(e)}
                    required
                    style={{ margin: "8px 3px" }}
                  />
                  </div>
                  <div style={{ display: "flex" }}>
                  
                   <TextField
                    margin="dense"
                    label="Salary Month & Year"
                    type="date"
                    fullWidth
                    name="monthAndYear"
                    id="monthAndYear"
                    value={formData.monthAndYear}
                    onChange={(e) => handleInputChange(e)}
                    required
                    style={{ margin: "8px 3px" }}
                  />
                  <TextField
                    margin="dense"
                    label="Rest Salary Due"
                    type="number"
                    fullWidth
                    name="salaryDue"
                    id="salaryDue"
                    value={dueSalary}
                    disabled
                    onChange={(e) => handleInputChange(e)}
                    required
                    style={{ margin: "8px 3px" }}
                  />
                  </div>
                 

                <div style={{ display:"flex", flexDirection:"row", gap:"10px"}}>
                <Button
                  type="submit"
                  onClick={savePayroll}
                  style={{
                    background: "linear-gradient(to right, #1cb5e0, #000046)",
                    height: "35px",
                    width: "49%",
                    color: "white",
                    margin: "0 5px",
                  }}
                  variant="outlined"
                >
                  Submit
                </Button>
                <Button
                  onClick={'/payroll'}
                  style={{
                    background: "linear-gradient(to left, #1cb5e0, #000046)",
                    height: "35px",
                    width: "49%",
                    color: "white",
                    margin: "0 5px",
                  }}
                  variant="outlined"
                >
                  Cancel
                </Button>
                </div>
               
              </form> */}
              <AdvanceSalaryForm/>
            </DialogContent>
          </div>
        </Card>
      </Collapse><br />

        <AdvanceSalaryTable advanceSalary={advanceSalary} setRecDelete={setRecDelete}/>
    </section>
    </div>
    </div>
    </div>
  );
};

export default AdvanceSalaryView;