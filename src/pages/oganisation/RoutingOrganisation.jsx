import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../components/Dashboard";
import CompanyView from "./company/CompanyView";
import LocationView from "./location/LocationView";
import DepartmentView from "./department/DepartmentView";
import DesignationView from "./designation/DesignationView";
import PoliciesView from "./Policies/PoliciesView";
import AnnouncementsView from "./announcements/AnnouncementsView";
import ExpensesView from "./expenses/ExpensesView";

const RoutingOrganisation = () => {
  return (
    <div>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/organisation/company" exact element={<CompanyView />} />
          <Route
            path="/organisation/location"
            exact
            element={<LocationView />}
          />
          <Route
            path="/organisation/department"
            exact
            element={<DepartmentView />}
          />
          <Route
            path="/organisation/designation"
            exact
            element={<DesignationView />}
          />
          <Route
            path="/organisation/policies"
            exact
            element={<PoliciesView />}
          />
          <Route
            path="/organisation/announcements"
            exact
            element={<AnnouncementsView />}
          />
          <Route
            path="/organisation/expenses"
            exact
            element={<ExpensesView />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default RoutingOrganisation;
