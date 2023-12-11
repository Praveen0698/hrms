import React from "react";
import RoutingOrganisation from "../pages/oganisation/RoutingOrganisation";
import RoutingEmployee from "../pages/employee/RoutingEmployee";

const MainRouting = () => {
  return (
    <div className="main-container">
      <RoutingOrganisation />
      <RoutingEmployee/>
      
      
    </div>
  );
};

export default MainRouting;
