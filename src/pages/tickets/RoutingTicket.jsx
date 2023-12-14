import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../components/Dashboard";
import TicketView from "../tickets/mainfile/TicketView";

const RoutingTicket = () => {
  return (
    <div>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/tickets" exact element={<TicketView />} />
        
        </Routes>
      </div>
    </div>
  );
};

export default RoutingTicket;
