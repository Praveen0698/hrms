import React from 'react'
import { Route, Routes } from 'react-router-dom';
import EditTransfer from "./EditTransfer";
import TransferPofile from "./TransferPofile";


const RouteTransfer = () => {
  return (
    <div>
<Routes>
<Route path={"/employee/editransfer"} element={<EditTransfer/>} />
        <Route
          path={"/employee/transferpofile"}
          element={<TransferPofile />}
        />
      </Routes>

    </div>
  )
}

export default RouteTransfer;