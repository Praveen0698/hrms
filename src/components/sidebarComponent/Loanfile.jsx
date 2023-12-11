import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Loanfile = () => {
  const [loanDropdown, setLoanDropdown] = useState("org-dropdown");
  const handleLoanclick = () => {
    if (loanDropdown === "org-dropdown") {
      setLoanDropdown("org-open");
    } else {
      setLoanDropdown("org-dropdown");
    }
  };
  const navigation = useNavigate();

  return (
    <div>
      <p id="dropdown" onClick={handleLoanclick}>
        Loan<i className="fa-solid fa-caret-down"></i>
      </p>
      <div className={loanDropdown}>
        <p onClick={() => navigation("/loan/grant-loan")}>Grant Loan</p>
      </div>
    </div>
  );
};

export default Loanfile;
