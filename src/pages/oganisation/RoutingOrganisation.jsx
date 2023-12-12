import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../components/Dashboard";
import CompanyView from "./company/CompanyView";
import LocationView from "./location/LocationView";
import DepartmentView from "./department/Mainfile/DepartmentView";
import DesignationView from "./designation/Mainfile/DesignationView";
import PoliciesView from "./Policies/Mainfile/PoliciesView";
import AnnouncementsView from "./announcements/Mainfile/AnnouncementsView";
import ExpensesView from "./expenses/Mainfile/ExpensesView";
import DepartmentProfile from "./department/Mainfile/DepartmentProfile";
import EditDepartment from "./department/Mainfile/EditDepartment";
import EditDesignation from "./designation/Mainfile/EditDesignation";
import EditExpenses from "./expenses/Mainfile/EditExpenses";
import ExpensesProfile from "./expenses/Mainfile/ExpensesProfile";
import EditPolicies from "./Policies/Mainfile/EditPolicies"
import PoliciesProfile from "./Policies/Mainfile/PoliciesProfile"
import EditAnnouncements from "./announcements/Mainfile/EditAnnnouncements"
import AnnouncementsProfile from "./announcements/Mainfile/AnnouncementsProfile"

const routesData = [
  { path: "/", element: <Dashboard /> },
  { path: "/organisation/company", element: <CompanyView /> },
  {
    path: "/organisation/department-profile/:id",
    element: <DepartmentProfile />,
  },
  { path: "/organisation/edit-department/:id", element: <EditDepartment /> },
  { path: "/organisation/location", element: <LocationView /> },
  { path: "/organisation/department", element: <DepartmentView /> },
  { path: "/organisation/designation", element: <DesignationView /> },
  { path: "/organisation/policies", element: <PoliciesView /> },
  { path: "/organisation/announcements", element: <AnnouncementsView /> },
  { path: "/organisation/expenses", element: <ExpensesView /> },
  { path: "/organisation/edit-designation/:id", element:<EditDesignation /> },
  { path: "/organisation/edit-expenses/:id", element:<EditExpenses />},
  { path: "/organisation/expenses-profile/:id", element:<ExpensesProfile />},
  { path: "/organisation/policies-profile/:id", element:<EditPolicies />},
  { path: "/organisation/edit-policies/:id", element:<PoliciesProfile/>},
  { path: "/organisation/edit-announcements/:id", element:<EditAnnouncements/>},
  { path: "/organisation/announcements-profile/:id", element:<AnnouncementsProfile/>},
];

const RoutingOrganisation = () => {
  return (
    <div>
      <div className="App">
        <Routes>
          {routesData.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default RoutingOrganisation;

