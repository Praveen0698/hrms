import React from "react";
import { Route, Routes } from "react-router-dom";
import EditEmployee from "../employees/EditEmployee";
import EmployeeProfile from "../employees/EmployeeProfile";

const RouteEmployee = () => {
  return (
    <div>
      <Routes>
        <Route path={"/employee/editemployee"} element={<EditEmployee />} />
        <Route
          path={"/employee/employeeprofile"}
          element={<EmployeeProfile />}
        />
      </Routes>
    </div>
  );
};

export default RouteEmployee;
