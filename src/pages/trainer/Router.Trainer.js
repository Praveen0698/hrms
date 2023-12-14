import React from 'react'
import {Route, Routes} from "react-router-dom"
import EditTrainer from './EditTrainer';

const RouteTrainer = () => {
  return (
    <div>
        <Routes>
            <Route path={"/ticket/edittrainer/:id"} element={<EditTrainer/>}/>
        </Routes>
    </div>
  )
}

export default RouteTrainer;