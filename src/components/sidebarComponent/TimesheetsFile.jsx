import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TimesheetsFile = () => {
    const [timeDropdown, setTimeDropdown] = useState("org-dropdown");

    const handleTimeclick = () => {
        if (timeDropdown === "org-dropdown") {
          setTimeDropdown("org-open");
        } else {
          setTimeDropdown("org-dropdown");
        }
      };

      const navigation = useNavigate()
  return (
    <div>
         <p id="dropdown" onClick={handleTimeclick}>
          Timesheets<i className="fa-solid fa-caret-down"></i>
        </p>
        <div className={timeDropdown}>
          <p onClick={() => navigation("/timesheets/attendance")}>Attendance</p>
          <p onClick={() => navigation("/timesheets/day-wise-attendance")}>Date Wise Attendance</p>
          <p onClick={() => navigation("/timesheets/update-attendance")}>Update Attendance</p>
          <p onClick={() => navigation("/timesheets/leaves")}>Leaves</p>
          <p onClick={() => navigation("/timesheets/office-shifts")}>Office Shifts</p>
          <p onClick={() => navigation("/timesheets/holidays")}>Holidays</p>
        </div>
    </div>
  )
}

export default TimesheetsFile