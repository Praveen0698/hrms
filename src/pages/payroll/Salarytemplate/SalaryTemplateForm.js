import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import * as api from "./api";
import { useNavigate } from "react-router-dom";
import StateSalaryTemplate from "./StateSalaryTemplate";

const DepartmentForm = () => {
  const navigate = useNavigate();

  const {
    recDelete,
    setRecDelete,
    basicSalary,
    setBasicSalary,
    formVisible,
    setFormVisible,
    toggle,
    setToggle,
    payroll,
    setPayroll,
    search,
    setSearch,
    open,
    setOpen,
    grossSal,
    setGrossSal,
    deduction,
    setDeduction,
    netAmount,
    setNetAmount,
    formData,
    setFormData,
    pfVal, 
    setPfVal
  } = StateSalaryTemplate();

  const loadPayroll = async () => {
    const result = await api.loadSalaryTemplate();
    setPayroll(result);
  };

  useEffect(() => {
    loadPayroll();
    calculatePf();
    calculateGross();
    calculateDeduction();
    netSalary();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    calculateGross();
    calculateDeduction();
    netSalary();
  };

  const savePayroll = async () => {
    await api.saveSalaryTemplate(formData);
    alert("Added successfully");
    navigate("/payroll/salaryTemplate ");

    setFormData({
      basicSalary:"",
      houseRentAllowance:"",
      medicalAllowance:"",
      transportAllowance:"",
      taxDeduction:"",
      dearnessAllowance:"",
      grossSal:"",
      deduction:"",
      netAmount:"",
      payrollTemplate:"",
      createdDate:""
    });
  };

  const handleSubmit = (e) => {
    loadPayroll();
  };

  const calculateGross = () => {
    let grossTotal =
      parseInt(formData.basicSalary) +
      parseInt(formData.houseRentAllowance) +
      parseInt(formData.transportAllowance);
    setGrossSal(grossTotal);
  };

  const calculatePf = () => {
    let pfvalue = parseInt(formData.basicSalary * 0.12);
    setPfVal(pfvalue);
  };

  const calculateDeduction = () => {
    let deductionTotal =
      parseInt(formData.medicalAllowance) +
      parseInt(pfVal) +
      parseInt(formData.taxDeduction) +
      parseInt(formData.dearnessAllowance);
    setDeduction(deductionTotal);
  };

  const netSalary = () => {
    let netTotal = grossSal - deduction;
    setNetAmount(netTotal);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex" }}>
        <TextField
          margin="dense"
          label="Basic Salary"
          type="number"
          fullWidth
          name="basicSalary"
          id="basicSalary"
          value={formData.basicSalary}
          onChange={(e) => {
            handleInputChange(e);
          }}
          required
          style={{ margin: "8px 3px" }}
        />
        <TextField
          margin="dense"
          label="House Rent Allowance"
          type="number"
          fullWidth
          name="houseRentAllowance"
          id="houseRentAllowance"
          value={formData.houseRentAllowance}
          onChange={(e) => handleInputChange(e)}
          required
          style={{ margin: "8px 3px" }}
        />
      </div>
      <div style={{ display: "flex" }}>
        <TextField
          margin="dense"
          label="Medical Allowance"
          type="number"
          fullWidth
          name="medicalAllowance"
          id="medicalAllowance"
          value={formData.medicalAllowance}
          onChange={(e) => {
            handleInputChange(e);
          }}
          required
          style={{ margin: "8px 3px" }}
        />
        <TextField
          margin="dense"
          label="PF"
          type="number"
          fullWidth
          name="pf"
          id="pf"
          value={pfVal}
          onChange={(e) => {
            handleInputChange(e);
          }}
          required
          disabled
          style={{ margin: "8px 3px" }}
        />

        <TextField
          margin="dense"
          label="Travelling/Transport Allowance"
          type="number"
          fullWidth
          name="transportAllowance"
          id="transportAllowance"
          value={formData.transportAllowance}
          onChange={(e) => {
            handleInputChange(e);
          }}
          required
          style={{ margin: "8px 3px" }}
        />
      </div>
      <div style={{ display: "flex" }}>
        <TextField
          margin="dense"
          label="Tax Deduction"
          type="number"
          fullWidth
          name="taxDeduction"
          id="taxDeduction"
          value={formData.taxDeduction}
          onChange={(e) => handleInputChange(e)}
          required
          style={{ margin: "8px 3px" }}
        />
        <TextField
          margin="dense"
          label="Dearness Allowance"
          type="number"
          fullWidth
          name="dearnessAllowance"
          id="dearnessAllowance"
          value={formData.dearnessAllowance}
          onChange={(e) => {
            handleInputChange(e);
          }}
          required
          style={{ margin: "8px 3px" }}
        />
        <TextField
          margin="dense"
          label="Gross Salary"
          type="number"
          fullWidth
          name="grossSalary"
          id="grossSalary"
          value={grossSal}
          onChange={(e) => handleInputChange(e)}
          required
          disabled
          style={{ margin: "2px 3px" }}
        />
      </div>
      <div style={{ display: "flex" }}>
        <TextField
          margin="dense"
          label="Total Deduction"
          type="number"
          fullWidth
          name="totalDeduction"
          id="totalDeduction"
          value={deduction}
          disabled
          onChange={(e) => {
            handleInputChange(e);
          }}
          required
          style={{ margin: "4px 3px", width: "365px" }}
        />
        <TextField
          margin="dense"
          label="Net Salary"
          type="number"
          fullWidth
          name="netSalary"
          id="netSalary"
          value={netAmount}
          disabled
          onChange={(e) => handleInputChange(e)}
          required
          style={{ margin: "4px 3px", width: "365px" }}
        />
        <TextField
          margin="dense"
          label="Payroll Template(e.g CEO/MANAGER/EMPLOYEE)"
          type="text"
          fullWidth
          name="payrollTemplate"
          id="payrollTemplate"
          value={formData.payrollTemplate}
          onChange={(e) => handleInputChange(e)}
          required
          style={{ margin: "4px 3px", width: "365px" }}
        />
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
          style={{ margin: "4px 3px", width: "365px" }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <Button
          type="submit"
          onClick={savePayroll}
          style={{
            background: "linear-gradient(to right, #1cb5e0, #000046)",
            height: "35px",
            width: "700px",
            color: "white",
            margin: "0 5px",
          }}
          variant="outlined"
        >
          Submit
        </Button>
        <Button
          onClick={"/payroll"}
          style={{
            background: "linear-gradient(to left, #1cb5e0, #000046)",
            height: "35px",
            width: "700px",
            color: "white",
            margin: "0 5px",
          }}
          variant="outlined"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default DepartmentForm;
