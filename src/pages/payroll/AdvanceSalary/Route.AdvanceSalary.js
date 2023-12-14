import React from 'react'
import {Route, Routes} from "react-router-dom"

import EditAdvanceSalary from './EditAdvanceSalary';

const RouteAdvanceSalary = () => {
  return (
    <div>
        <Routes>
            <Route path={"/payroll/editAdvanceSalary/:id"} element={<EditAdvanceSalary/>}/>

        
        </Routes>
    </div>
  )
}

export default RouteAdvanceSalary;