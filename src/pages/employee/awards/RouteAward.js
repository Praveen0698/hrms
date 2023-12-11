import React from 'react'
import { Route, Routes } from "react-router-dom";
import EditAward from "./EditAward";
import AwardPofile from './AwardPofile';


const RouteAward = () => {
  return (
     <div>
    <Routes>
      <Route path={"/employee/editaward"} element={<EditAward />} />
      <Route
        path={"/employee/awardpofile"}
        element={<AwardPofile />}
      />
    </Routes>
  </div>
  )
}

export default RouteAward;