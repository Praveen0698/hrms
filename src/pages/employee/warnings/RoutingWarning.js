import React from 'react';
import {Route, Routes} from 'react-router-dom';
import EditWarning from './EditWarning';
import WarningProfile from './WarningPofile';

const RoutingWarning = () => {
  return (
    <div>
    <Routes>
        <Route path={"/employee/editwarning"} element={<EditWarning />} />
        <Route
          path={"/employee/warningprofile"}
          element={<WarningProfile />}
        />
      </Routes>

    </div>
  )
}

export default RoutingWarning;