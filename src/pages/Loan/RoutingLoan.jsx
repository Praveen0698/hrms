import React from "react";
import { Route, Routes } from "react-router-dom";

import GrantLoanView from "../Loan/grantloan/GrantLoanView";

const RoutingLoan = () => {
  return (
    <div>
      <div className="App">
        <Routes>
          <Route path="/loan/grantloan" exact element={<GrantLoanView />} />
         
        </Routes>
      </div>
    </div>
  );
};

export default RoutingLoan;
