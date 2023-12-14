import React from "react";
import { Route, Routes } from "react-router-dom";

import AddBank from "../Bank/addbank/AddBank";
import EditBank from "../Bank/addbank/EditBank";

const RoutinBank = () => {
  return (
    <div>
      <div className="App">
        <Routes>
          <Route path="bank/addbank" exact element={<AddBank />} />
          <Route path="bank/editbank" exact element={<EditBank />} />
        </Routes>
      </div>
    </div>
  );
};

export default RoutinBank;
