import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Trainingfile = () => {
  const [trainDropdown, setTrainDropdown] = useState("org-dropdown");
  const handleTrainclick = () => {
    if (trainDropdown === "org-dropdown") {
      setTrainDropdown("org-open");
    } else {
      setTrainDropdown("org-dropdown");
    }
  };

  const navigation = useNavigate();
  return (
    <div>
      <p id="dropdown" onClick={handleTrainclick}>
        Training<i className="fa-solid fa-caret-down"></i>
      </p>
      <div className={trainDropdown}>
        <p onClick={() => navigation("/training/training-list")}>
          Training List
        </p>
        <p onClick={() => navigation("/training/trainer-list")}>
          Trainer List
        </p>
      </div>
    </div>
  );
};

export default Trainingfile;
