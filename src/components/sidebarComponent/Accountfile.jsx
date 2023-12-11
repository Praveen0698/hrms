import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Accountfile = () => {

    const [accountDropdown, setAccountDropdown] = useState("org-dropdown");
  const handleAccountclick = () => {
 
    if (accountDropdown === "org-dropdown") {
      setAccountDropdown("org-open");
    } else {
      setAccountDropdown("org-dropdown");
    }
  };

  const navigation = useNavigate()
  return (
    <div>
         <p id="dropdown" onClick={handleAccountclick}>
          Account<i className="fa-solid fa-caret-down"></i>
        </p>
        <div className={accountDropdown}>
          <p onClick={() => navigation("/account/account-balance")}>Account Balance</p>
          <p onClick={() => navigation("/account/account-list")}>Account List</p>
          <p onClick={() => navigation("/account/conta-voucher")}>Contra Voucher</p>
          <p onClick={() => navigation("/account/debit-voucher")}>Debit Voucher</p>
          <p onClick={() => navigation("/account/credit-voucher")}>Credit Voucher</p>
          <p onClick={() => navigation("/account/financial-year")}>Financial Year</p>
          <p onClick={() => navigation("/account/journal-voucher")}>Journal Voucher</p>
          <p onClick={() => navigation("/account/opening-balance")}>Opening Balance</p>
        </div>
    </div>
  )
}

export default Accountfile