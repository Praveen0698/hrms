import React from 'react'
import {Route, Routes} from 'react-router-dom';
import EditEmployeeExit from './EditEmployeeExit';
import EmployeeExitPofile from './EmployeeExitPofile';

const RouteEmployeeExit = () => {
  return (
    <div>
        <Routes>
        <Route path={"/employee/editemployeeexit/:id"} element={<EditEmployeeExit />} />
        <Route
          path={"/employee/employeeexitpofile"}
          element={<EmployeeExitPofile />}
        />
      </Routes>
       
    </div>
  )
}

export default RouteEmployeeExit

