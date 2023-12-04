import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [dropdown, setDropdown] = useState("org-dropdown");
  const [empDropdown, setEmpDropdown] = useState("org-dropdown");
  const [perDropdown, setPerDropdown] = useState("org-dropdown");
  const [timeDropdown, setTimeDropdown] = useState("org-dropdown");
  const [payDropdown, setPayDropdown] = useState("org-dropdown");
  const [bankDropdown, setBankDropdown] = useState("org-dropdown");
  const [accountDropdown, setAccountDropdown] = useState("org-dropdown");
  const [loanDropdown, setLoanDropdown] = useState("org-dropdown");
  const [procurementDropdown, setProcurementDropdown] =
    useState("org-dropdown");
  const [reqDropdown, setReqDropdown] = useState("org-dropdown");
  const [trainDropdown, setTrainDropdown] = useState("org-dropdown");

  const handleOrgclick = () => {
    if (dropdown === "org-dropdown") {
      setDropdown("org-open");
    } else {
      setDropdown("org-dropdown");
    }
  };
  const handleEmpclick = () => {
    if (empDropdown === "org-dropdown") {
      setEmpDropdown("org-open");
    } else {
      setEmpDropdown("org-dropdown");
    }
  };

  const handlePerclick = () => {
    if (perDropdown === "org-dropdown") {
      setPerDropdown("org-open");
    } else {
      setPerDropdown("org-dropdown");
    }
  };

  const handleTimeclick = () => {
    if (timeDropdown === "org-dropdown") {
      setTimeDropdown("org-open");
    } else {
      setTimeDropdown("org-dropdown");
    }
  };

  const handlePayclick = () => {
    if (payDropdown === "org-dropdown") {
      setPayDropdown("org-open");
    } else {
      setPayDropdown("org-dropdown");
    }
  };
  const handleBankclick = () => {
    if (bankDropdown === "org-dropdown") {
      setBankDropdown("org-open");
    } else {
      setBankDropdown("org-dropdown");
    }
  };
  const handleAccountclick = () => {
    if (accountDropdown === "org-dropdown") {
      setAccountDropdown("org-open");
    } else {
      setAccountDropdown("org-dropdown");
    }
  };
  const handleLoanclick = () => {
    if (loanDropdown === "org-dropdown") {
      setLoanDropdown("org-open");
    } else {
      setLoanDropdown("org-dropdown");
    }
  };
  const handleProcurementclick = () => {
    if (procurementDropdown === "org-dropdown") {
      setProcurementDropdown("org-open");
    } else {
      setProcurementDropdown("org-dropdown");
    }
  };
  const handleReqclick = () => {
    if (reqDropdown === "org-dropdown") {
      setReqDropdown("org-open");
    } else {
      setReqDropdown("org-dropdown");
    }
  };
  const handleTrainclick = () => {
    if (trainDropdown === "org-dropdown") {
      setTrainDropdown("org-open");
    } else {
      setTrainDropdown("org-dropdown");
    }
  };

  return (
    <>
      <div className="sidebar-container">
        <Link style={{ color: "white", textDecoration: "none" }} to={"/"}>
          <p>Dashboard</p>
        </Link>
        <p id="dropdown" onClick={handleOrgclick}>
          Organisation<i className="fa-solid fa-caret-down"></i>
        </p>
        <div className={dropdown}>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to={"/organisation/company"}
          >
            <p>Company</p>
          </Link>

          <Link
            style={{ color: "white", textDecoration: "none" }}
            to={"/organisation/location"}
          >
            <p>Location</p>
          </Link>

          <Link
            style={{ color: "white", textDecoration: "none" }}
            to={"/organisation/department"}
          >
            <p>Department</p>
          </Link>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to={"/organisation/designation"}
          >
            <p>Designation</p>{" "}
          </Link>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to={"/organisation/policies"}
          >
            <p>Policies</p>
          </Link>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to={"/organisation/announcements"}
          >
            <p>Announcements</p>
          </Link>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to={"/organisation/expenses"}
          >
            <p>Expenses</p>
          </Link>
        </div>
        <p id="dropdown" onClick={handleEmpclick}>
          Employees<i className="fa-solid fa-caret-down"></i>
        </p>
        <div className={empDropdown}>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to={"/employee"}
          >
            <p>Employees</p>
          </Link>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to={"/setRole"}
          >
            <p>SetRoles</p>
          </Link>
          <Link style={{ color: "white", textDecoration: "none" }} to="/award">
            <p>Awards</p>
          </Link>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to={"/transfer"}
          >
            <p>Transfers</p>
          </Link>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to={"/resignation"}
          >
            <p>Resignation</p>
          </Link>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to={"/travel"}
          >
            <p>Travels</p>
          </Link>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to={"/promotion"}
          >
            <p>Promotions</p>
          </Link>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to={"/complaint"}
          >
            <p>Complaints</p>
          </Link>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to={"/warning"}
          >
            <p>Warnings</p>
          </Link>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to={"/termination"}
          >
            <p>Termination</p>
          </Link>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to={"/lastLogin"}
          >
            <p>Last Login</p>
          </Link>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to={"/employeeExit"}
          >
            <p>Employee Exit</p>
          </Link>
        </div>
        <p id="dropdown" onClick={handlePerclick}>
          Performance<i className="fa-solid fa-caret-down"></i>
        </p>
        <div className={perDropdown}>
          <p>Indicator</p>
          <p>Appraisel</p>
        </div>
        <p id="dropdown" onClick={handleTimeclick}>
          Timesheets<i className="fa-solid fa-caret-down"></i>
        </p>
        <div className={timeDropdown}>
          <p>Attendance</p>
          <p>Date Wise Attendance</p>
          <p>Update Attendance</p>
          <p>Leaves</p>
          <p>Office Shifts</p>
          <p>Holidays</p>
        </div>
        <p id="dropdown" onClick={handlePayclick}>
          Payroll<i className="fa-solid fa-caret-down"></i>
        </p>
        <div className={payDropdown}>
          <p>Payroll Templates</p>
          <p>Hourly Wages</p>
          <p>Manage Salary</p>
          <p>Advance Salary</p>
          <p>Generate Payslip</p>
          <p>Payment History</p>
        </div>
        <p>Projects</p>
        <p>Tickets</p>
        <p>Worksheet</p>

        <p id="dropdown" onClick={handleBankclick}>
          Bank<i className="fa-solid fa-caret-down"></i>
        </p>
        <div className={bankDropdown}>
          <p>Add Banks</p>
        </div>

        <p id="dropdown" onClick={handleLoanclick}>
          Loan<i className="fa-solid fa-caret-down"></i>
        </p>
        <div className={loanDropdown}>
          <p>Grant Loan</p>
        </div>

        <p id="dropdown" onClick={handleAccountclick}>
          Account<i className="fa-solid fa-caret-down"></i>
        </p>
        <div className={accountDropdown}>
          <p>Account Balance</p>
          <p>Account List</p>
          <p>Contra Voucher</p>
          <p>Debit Voucher</p>
          <p>Credit Voucher</p>
          <p>Financial Year</p>
          <p>Journal Voucher</p>
          <p>Opening Balance</p>
        </div>

        <p id="dropdown" onClick={handleProcurementclick}>
          Procurement<i className="fa-solid fa-caret-down"></i>
        </p>
        <div className={procurementDropdown}>
          <p>Bid Analysis</p>
          <p>Commuitee</p>
          <p>Description of Material</p>
          <p>Purchase Order</p>
          <p>Request</p>
          <p>Units</p>
          <p>Vendor</p>
        </div>

        <p id="dropdown" onClick={handleReqclick}>
          Requirement<i className="fa-solid fa-caret-down"></i>
        </p>
        <div className={reqDropdown}>
          <p>Job Posts</p>
          <p>Job Listing Frontend</p>
          <p>Job Candidates</p>
          <p>Job Interviews</p>
        </div>
        <p id="dropdown" onClick={handleTrainclick}>
          Training<i className="fa-solid fa-caret-down"></i>
        </p>
        <div className={trainDropdown}>
          <p>Training List</p>
          <p>Trainer List</p>
        </div>
      </div>
    </>
  );
};

export default SideBar;
