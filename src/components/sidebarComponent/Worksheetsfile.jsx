import React from "react";
import { useNavigate } from "react-router-dom";


const WorksheetsFile = () => {
    const navigation = useNavigate()
  return (
    <div> <p onClick={() => navigation("/worksheets")}>Worksheets</p></div>
  )
}

export default WorksheetsFile