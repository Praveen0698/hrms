import React from "react";
import { Route, Routes } from "react-router-dom";
import EditCompany from "./EditCompany";
import CompanyPofile from "./CompanyPofile";

const RouteCompany = () => {
  return (
    <div>
      <Routes>
        <Route path={"/organisation/editcompany"} element={<EditCompany />} />
        <Route
          path={"/organisation/companyprofile"}
          element={<CompanyPofile />}
        />
      </Routes>
    </div>
  );
};

export default RouteCompany;
