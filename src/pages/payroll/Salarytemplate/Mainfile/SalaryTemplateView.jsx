import React, { useEffect, useState } from "react";

import SideBar from "../../../../components/SideBar";
import Header from "../../../../components/Header";

import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import { MdAdd } from "react-icons/md";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import { Card } from "@mui/material";



import * as api from "../api"
import StateSalaryTemplate from "../StateSalaryTemplate";
import SalaryTemplateTable from "../SalaryTemplateTable";
import SalaryTemplateForm from "../SalaryTemplateForm";

const SalaryTemplateView = () => {

  const { recDelete, setRecDelete, basicSalary, setBasicSalary,formVisible, setFormVisible,toggle, setToggle,payroll, setPayroll,search, setSearch,open, setOpen,grossSal, setGrossSal,deduction, setDeduction,netAmount, setNetAmount,formData, setFormData
  } = StateSalaryTemplate()

  
  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

  useEffect(() => {
    loadPayroll();
  }, []);

  const loadPayroll = async () => {
    const result = await api.loadSalaryTemplate()
    console.log("rec", result);
    setPayroll(result);
  };



  const handleDelete = async () => {
    await api.deleteSalaryTemplate(recDelete)
    loadPayroll();
  };

  useEffect(() => {
    if (recDelete !== "") {
      handleDelete()
      setRecDelete("")
    }
  })
 
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
                  style={{ height: "35px", marginBottom: "10px" }}
                >
                  {toggle ? (
                    <div className="hide">
                      <BiSolidHide
                      />
                      HIDE
                    </div>
                  ) : (
                    <div className="add">
                      <MdAdd />
                      ADD SALARY TEMPLATE
                    </div>
                  )}
                </Button>
              </div>
            </div>
            <Collapse in={formVisible}>
              <Card
                variant="outlined"
                style={{ boxShadow: " 1px 1px 10px black" }}
              >
                <div style={{ marginTop: "20px" }}>
                  <h3
                    style={{
                      textAlign: "center",
                      marginTop: "25px",
                      fontWeight: "600",
                    }}
                  >
                    <h3> DEPARTMENT FORM</h3>
                  </h3>
                  <DialogContent>
                    {/* <form onSubmit={handleSubmit}>
                      <div className="data-input-fields">
                        <TextField
                          id="departmentName"
                          margin="dense"
                          select
                          label="Department Name"
                          fullWidth
                          defaultValue="Choose"
                          SelectProps={{
                            native: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={formData.departmentName}
                          onChange={(e) => handleInputChange(e)}
                          name="departmentName"
                        >
                          {Type.map((option, index) => (
                            <option key={index} value={option.label}>
                              {option.label}
                            </option>
                          ))}
                        </TextField>

                        <TextField
                          id="companyName"
                          margin="dense"
                          select
                          label="Company Name"
                          fullWidth
                          defaultValue="Choose"
                          SelectProps={{
                            native: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={formData.companyName}
                          onChange={(e) => handleInputChange(e)}
                          name="companyName"
                        >
                          {
                            company.map((option, index) => (
                              <option key={index} value={option.companyName}>
                                {option.companyName}
                              </option>
                            ))}
                        </TextField>
                      </div>
                      <div className="data-input-fields">
                        <TextField
                          id="departmentHead"
                          margin="dense"
                          select
                          label="Department Head"
                          fullWidth
                          defaultValue="Choose"
                          SelectProps={{
                            native: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={formData.departmentHead}
                          onChange={(e) => handleInputChange(e)}
                          name="departmentHead"
                        >
                          {Head.map((option, index) => (
                            <option key={index} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </TextField>

                        <TextField
                          margin="dense"
                          label="Create Date"
                          type="date"
                          fullWidth
                          name="createdDate"
                          id="createdDate"
                          value={formData.createdDate}
                          onChange={(e) => handleInputChange(e)}
                          required
                          error={dateError}
                          helperText={dateError && "Please select the current date"}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        <TextField
                          id="locationName"
                          margin="dense"
                          select
                          label="Location Name"
                          fullWidth
                          defaultValue="Choose"
                          SelectProps={{
                            native: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={formData.locationName}
                          onChange={(e) => handleInputChange(e)}
                          name="locationName"
                        >
                          {location.map((option, index) => (

                            <option key={index} value={option.locationName}>
                              {option.locationName}
                            </option>
                          ))}
                        </TextField>


                      </div>

                      <div className="data-buttons">

                        <Button id="input-btn"
                          variant="outlined"
                          type="submit"
                          onClick={saveDepartment}

                        >
                          Submit
                        </Button>
                        <Button id="input-btn"
                          variant="outlined"
                          onClick={() => setFormVisible(false)}

                        >
                          Cancel
                        </Button>
                      </div>


                    </form> */}
                    <SalaryTemplateForm />
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <SalaryTemplateTable payroll={payroll} setRecDelete={setRecDelete} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default SalaryTemplateView;
