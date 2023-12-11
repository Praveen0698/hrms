import React from 'react'
import {Route, Routes} from 'react-router-dom';
import EditPolicies from './EditPolicies';
import PoliciesProfile from './PoliciesProfile';
const RoutePolicies = () => {
  return (
    <div>
     <Routes>
        <Route path={"/organisation/editpolicies/:id"} element={<EditPolicies />} />
        <Route
          path={"/organisation/policiesprofile"}
          element={<PoliciesProfile />}
        />
      </Routes>
    </div>
  )
}

export default RoutePolicies