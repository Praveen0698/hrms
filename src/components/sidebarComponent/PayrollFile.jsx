import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PayrollFile = () => {
    const [payDropdown, setPayDropdown] = useState("org-dropdown");
    const handlePayclick = () => {
        if (payDropdown === "org-dropdown") {
          setPayDropdown("org-open");
        } else {
          setPayDropdown("org-dropdown");
        }
      };

      const navigation = useNavigate()
  return (
    <div>
        <p id="dropdown" onClick={handlePayclick}>
          Payroll<i className="fa-solid fa-caret-down"></i>
        </p>
        <div className={payDropdown}>
          <p onClick={() => navigation("/payroll/payroll-templates")}>Payroll Templates</p>
          <p onClick={() => navigation("/payroll/hourly-wages")}>Hourly Wages</p>
          <p onClick={() => navigation("/payroll/manage-salary")}>Manage Salary</p>
          <p onClick={() => navigation("/payroll/advance-salary")}>Advance Salary</p>
          <p onClick={() => navigation("/payroll/generate-payslip")}>Generate Payslip</p>
          <p onClick={() => navigation("/payroll/payment-history")}>Payment History</p>
        </div>
    </div>
  )
}

export default PayrollFile