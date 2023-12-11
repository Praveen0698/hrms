import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Recuitmentfile = () => {
    const [reqDropdown, setReqDropdown] = useState("org-dropdown");
    const handleReqclick = () => {
        if (reqDropdown === "org-dropdown") {
          setReqDropdown("org-open");
        } else {
          setReqDropdown("org-dropdown");
        }
      };

      const navigation = useNavigate()
  return (
    <div>
      <p id="dropdown" onClick={handleReqclick}>
        Recruitment<i className="fa-solid fa-caret-down"></i>
      </p>
      <div className={reqDropdown}>
        <p onClick={() => navigation("/recruitment/job-posts")}>Job Posts</p>
        <p onClick={() => navigation("/recruitment/job-listing-frontend")}>Job Listing Frontend</p>
        <p onClick={() => navigation("/recruitment/job-candidates")}>Job Candidates</p>
        <p onClick={() => navigation("/recruitment/job-interview")}>Job Interviews</p>
      </div>
    </div>
  );
};

export default Recuitmentfile;
