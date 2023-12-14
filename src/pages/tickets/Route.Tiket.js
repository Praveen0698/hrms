import React from 'react'
import {Route, Routes} from "react-router-dom"
import EditTicket from './EditTicket';

const RouteTicket = () => {
  return (
    <div>
        <Routes>
            <Route path={"/ticket/editdepartment/:id"} element={<EditTicket/>}/>
        </Routes>
    </div>
  )
}

export default RouteTicket;