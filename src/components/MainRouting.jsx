import React from "react";
import RoutingOrganisation from "../pages/oganisation/RoutingOrganisation";
import RoutingPerformance from "../pages/performance/RoutingPerformance";

const MainRouting = () => {
  return (
    <div className="main-container">
      <RoutingOrganisation />
      <RoutingPerformance/>
    </div>
  );
};

export default MainRouting;
