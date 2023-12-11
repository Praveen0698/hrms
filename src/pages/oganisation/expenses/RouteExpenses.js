import React from 'react'
import { Route, Routes } from 'react-router-dom';
import EditExpenses from './EditExpenses';
import ExpensesPorfile from './ExpensesProfile';

const RouteExpenses = () => {
  return (
    <div>R
     <Routes>
        <Route path={"/organisation/editexpenses/:id"} element={<EditExpenses />} />
        <Route
          path={"/organisation/editexpenses"}
          element={<ExpensesPorfile />}
        />
      </Routes></div>
  )
}

export default RouteExpenses