import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../components/Dashboard";
import ProjectView from "../project/Mainfile/ProjectView";
import AdvanceSalaryView from "../payroll/Mainfile/AdvanceSalaryView";
const RoutingProject = () => {
  return (
    <div>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/payroll/advanceSalary" exact element={<AdvanceSalaryView/>} />
          
        </Routes>
      </div>
    </div>
  );
};

export default RoutingProject;
