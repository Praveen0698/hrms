import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const PerformanceFile = () => {
    const [perDropdown, setPerDropdown] = useState("org-dropdown");
    const handlePerclick = () => {
        if (perDropdown === "org-dropdown") {
          setPerDropdown("org-open");
        } else {
          setPerDropdown("org-dropdown");
        }
      };

      const navigation = useNavigate()
  return (
    <div>
         <p id="dropdown" onClick={handlePerclick}>
          Performance<i className="fa-solid fa-caret-down"></i>
        </p>
        <div className={perDropdown}>
        
            <p onClick={() => navigation("/performance/indicator")}>Indicator</p>
          
            <p onClick={() => navigation("/performance/appraisal")}>Appraisal</p>
         
        </div>
    </div>
  )
}

export default PerformanceFile