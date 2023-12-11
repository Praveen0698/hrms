import React from 'react';
import { Route, Routes } from "react-router-dom";
import  Dashboard from "../../components/Dashboard";
import EmployeeView from '../employee/employees/EmployeeView';
import AwardView from '../employee/awards/AwardView';
import PromotionView from '../employee/promotions/PromotionView';

import ComplaintView from '../employee/complaints/ComplaintView';
import ResignationView from '../employee/resignation/ResignationView';
import TravelView from '../employee/travels/TravelView';
import TransferView from '../employee/transfers/TransferView';
import SetRoleView from '../employee/setroles/SetRoleView';
import TerminationView from '../employee/termination/TerminationView';
import EmployeeExitView from '../employee/employeeexit/EmployeeExitView';
import EmployeeLastLoginView from '../employee/lastlogin/EmployeeLastLoginView';
import WarningView from '../employee/warnings/WarningView';



const RoutingEmployee = () => {
  return (
    <div>
<div className="App">

<Routes>
          
          <Route path="/employee/employees" exact element={<EmployeeView/>} />
          
          <Route
            path="/employee/setroles"
            exact
            element={<SetRoleView/>}
          />

<Route
            path="/employee/awards"
            exact
            element={<AwardView/>}
          />
          <Route
            path="/employee/transfers"
            exact
            element={<TransferView />}
          />
          <Route
            path="/employee/resignation"
            exact
            element={<ResignationView />}
          />
         
          <Route
            path="/employee/travels"
            exact
            element={<TravelView/>}
          />
          
          <Route
            path="/employee/promotions"
            exact
            element={<PromotionView/>}
          />
           <Route
            path="/employee/complaints"
            exact
            element={<ComplaintView/>}
          />
           <Route
            path="/employee/warnings"
            exact
            element={<WarningView/>}
          />
           <Route
            path="/employee/termination"
            exact
            element={<TerminationView/>}
          />
          <Route
            path="/employee/lastLogin"
            exact
            element={<EmployeeLastLoginView/>}
          />
          
          <Route
            path="/employee/employeeExit"
            exact
            element={<EmployeeExitView/>}
          />
          





        

        </Routes>



</div>
    </div>
  )
}

export default RoutingEmployee;