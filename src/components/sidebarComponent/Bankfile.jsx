import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Bankfile = () => {
    const [bankDropdown, setBankDropdown] = useState("org-dropdown");
    const handleBankclick = () => {
        if (bankDropdown === "org-dropdown") {
          setBankDropdown("org-open");
        } else {
          setBankDropdown("org-dropdown");
        }
      };

      const navigation = useNavigate()
  return (
    <div>
      <p id="dropdown" onClick={handleBankclick}>
        Bank<i className="fa-solid fa-caret-down"></i>
      </p>
      <div className={bankDropdown}>
        <p onClick={() => navigation("/bank/add-bank")}>Add Banks</p>
      </div>
    </div>
  );
};

export default Bankfile;
