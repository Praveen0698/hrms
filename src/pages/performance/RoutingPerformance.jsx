import React from "react";
import { Route, Routes } from "react-router-dom";
// import Dashboard from "../../components/Dashboard";
import PerformanceIndicatorView from "./PerformanceIndicator/PerformanceIndicatorView";
import PerformancesAppraisalView from "./PerformanceAppraisal/PerformancesAppraisalView";


const RoutingPerformance = () => {
  return (
    <div>
      <div className="App">
        <Routes>
          <Route path="/performance/PerformanceIndicator" exact element={<PerformanceIndicatorView />} />
          <Route path="/performance/PerformanceAppraisal" exact element={<PerformancesAppraisalView />} />
        </Routes>
      </div>
    </div>
  );
};

export default RoutingPerformance;
