import React from 'react'
import {Route, Routes} from 'react-router-dom';
import EditTermination from './EditTermination';
import TerminationPofile from './TerminationPofile';

const RoutingTermination = () => {
  return (
    <div>
        <Routes>
        <Route path={"/employee/edittermination/:id"} element={<EditTermination/>} />
        <Route
          path={"/employee/terminationpofile"}
          element={<TerminationPofile />}
        />
      </Routes>
    </div>
  )
}

export default RoutingTermination;
