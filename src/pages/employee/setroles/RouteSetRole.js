import React from "react";
import { Route, Routes } from "react-router-dom";
import EditSetRole from "../setroles/EditSetRole";
import SetRolePofile from "../setroles/SetRolePofile";



const RouteSetRole = () => {
  return (
    <div>
    <Routes>
        <Route path ={/setroles/editsetrole} element={<EditSetRole/>}/>

        <Route path ={/setroles/setrolepofile} element ={<SetRolePofile/>}/>
    </Routes>
    </div>
  )
}

export default RouteSetRole;