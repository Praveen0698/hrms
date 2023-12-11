import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Organisationfile = () => {
  const [dropdown, setDropdown] = useState("org-dropdown");
  const handleOrgclick = () => {
    if (dropdown === "org-dropdown") {
      setDropdown("org-open");
    } else {
      setDropdown("org-dropdown");
    }
  };

  const navigation = useNavigate();
  return (
    <div>
      <p id="dropdown" onClick={handleOrgclick}>
        Organisation<i className="fa-solid fa-caret-down"></i>
      </p>
      <div className={dropdown}>
        <p onClick={() => navigation("/organisation/company")}>Company</p>

        <p onClick={() => navigation("/organisation/location")}>Location</p>

        <p onClick={() => navigation("/organisation/department")}>Department</p>

        <p onClick={() => navigation("/organisation/designation")}>
          Designation
        </p>

        <p onClick={() => navigation("/organisation/policies")}>Policies</p>

        <p onClick={() => navigation("/organisation/announcements")}>
          Announcements
        </p>

        <p onClick={() => navigation("/organisation/expenses")}>Expenses</p>
      </div>
    </div>
  );
};

export default Organisationfile;
