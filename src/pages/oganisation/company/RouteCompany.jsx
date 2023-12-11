import React from "react";
import { Route, Routes } from "react-router-dom";
import EditCompany from "./EditCompany";
import CompanyPofile from "./CompanyPofile";

const RouteCompany = () => {
  return (
    <div>
      <Routes>
        <Route path={"/organisation/editcompany/:id"} element={<EditCompany />} />
        <Route
          path={"/organisation/companypofile"}
          element={<CompanyPofile />}
        />
      </Routes>
    </div>
  );
};

export default RouteCompany;
