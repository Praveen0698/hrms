import React from "react";
import { useNavigate } from "react-router-dom";


const TicketsFile = () => {
    const navigation = useNavigate()
  return (
    <div> <p onClick={() => navigation("/tickets")}>Tickets</p></div>
  )
}

export default TicketsFile