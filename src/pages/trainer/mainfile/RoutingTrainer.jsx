import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../components/Dashboard";
import TrainerView from "../trainer/mainfile/TrainerView";

const RoutingTicket = () => {
  return (
    <div>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/tickets" exact element={<TrainerView/>} />
        
        </Routes>
      </div>
    </div>
  );
};

export default RoutingTicket;
