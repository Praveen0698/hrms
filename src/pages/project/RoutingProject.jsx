import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../components/Dashboard";
import ProjectView from "../project/Mainfile/ProjectView";
const RoutingProject = () => {
  return (
    <div>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/project/project" exact element={<ProjectView/>} />
          
        </Routes>
      </div>
    </div>
  );
};

export default RoutingProject;
