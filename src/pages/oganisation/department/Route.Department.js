import React from 'react'
import {Route, Routes} from "react-router-dom"
import DepartmentProfile from './DepartmentProfile';
import EditDepartment from './EditDepartment';

const RouteDepartment = () => {
  return (
    <div>
        <Routes>
            <Route path={"/organisation/editdepartment/:id"} element={<EditDepartment />}/>

            <Route path={"/organisation/departmentprofile/:id"} element={<DepartmentProfile />}/>
        </Routes>
    </div>
  )
}

export default RouteDepartment;