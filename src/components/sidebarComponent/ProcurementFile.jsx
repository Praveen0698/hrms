import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProcurementFile = () => {
    const [procurementDropdown, setProcurementDropdown] = useState("org-dropdown");

    const handleProcurementclick = () => {
        if (procurementDropdown === "org-dropdown") {
          setProcurementDropdown("org-open");
        } else {
          setProcurementDropdown("org-dropdown");
        }
      };
      const navigation = useNavigate()
  return (
    <div>
         <p id="dropdown" onClick={handleProcurementclick}>
          Procurement<i className="fa-solid fa-caret-down"></i>
        </p>
        <div className={procurementDropdown}>
          <p onClick={() => navigation("/procurement/bid-analysis")}>Bid Analysis</p>
          <p onClick={() => navigation("/procurement/commuitee")}>Commuitee</p>
          <p onClick={() => navigation("/procurement/description-of-material")}>Description of Material</p>
          <p onClick={() => navigation("/procurement/purchase-order")}>Purchase Order</p>
          <p onClick={() => navigation("/procurement/request")}>Request</p>
          <p onClick={() => navigation("/procurement/units")}>Units</p>
          <p onClick={() => navigation("/procurement/vendor")}>Vendor</p>
        </div>

    </div>
  )
}

export default ProcurementFile