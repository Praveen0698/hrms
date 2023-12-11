import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeesFile = () => {

    const [empDropdown, setEmpDropdown] = useState("org-dropdown");
  const handleEmpclick = () => {
    if (empDropdown === "org-dropdown") {
      setEmpDropdown("org-open");
    } else {
      setEmpDropdown("org-dropdown");
    }
  };

  const navigation = useNavigate()
  return (
    <div>
        <p id="dropdown" onClick={handleEmpclick}>
          Employees<i className="fa-solid fa-caret-down"></i>
        </p>
        <div className={empDropdown}>
         
            <p onClick={() => navigation('/employees/employee')}>Employees</p>
         
            <p onClick={() => navigation('/employees/setroles')}>SetRoles</p>
        
            <p onClick={() => navigation('/employees/awards')}>Awards</p>
         
            <p onClick={() => navigation('/employees/transfers')}>Transfers</p>
         
            <p onClick={() => navigation('/employees/resignation')}>Resignation</p>
          
            <p onClick={() => navigation('/employees/travels')}>Travels</p>
          
            <p onClick={() => navigation('/employees/promotions')}>Promotions</p>
         
            <p onClick={() => navigation('/employees/complaints')}>Complaints</p>
        
            <p onClick={() => navigation('/employees/warnings')}>Warnings</p>
         
            <p onClick={() => navigation('/employees/termination')}>Termination</p>
          
            <p onClick={() => navigation('/employees/last-login')}>Last Login</p>
          
            <p onClick={() => navigation('/employees/employee-exit')}>Employee Exit</p>
          
        </div>
    </div>
  )
}

export default EmployeesFile