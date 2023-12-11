import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardFile = () => {
  const navigation = useNavigate();
  return (
    <div>
      <p onClick={() => navigation("/")}>Dashboard</p>
    </div>
  );
};

export default DashboardFile;
