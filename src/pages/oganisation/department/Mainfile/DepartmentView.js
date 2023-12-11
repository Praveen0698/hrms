import React, { useEffect, useState } from "react";

import SideBar from "../../../../components/SideBar";
import Header from "../../../../components/Header";

import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import { MdAdd } from "react-icons/md";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import { Card } from "@mui/material";



import * as api from "../DepartmentApi"
import StateDepartment from "../StateDepartment";
import DepartmentTable from "../DepartmentTable";
import DepartmentForm from "../DepartmentForm";

const DepartmentView = () => {

  const { department, setDepartment, formVisible, setFormVisible, toggle, setToggle, recDelete, setRecDelete
  } = StateDepartment()

  
  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

 

  useEffect(() => {
    loadDepartment();
  }, []);

  const loadDepartment = async () => {
    const result = await api.loadDepartment()
    console.log("rec", result);
    setDepartment(result);
  };



  const handleDelete = async () => {
    await api.deleteDepartment(recDelete)
    loadDepartment();
  };

  useEffect(() => {
    if (recDelete !== "") {
      handleDelete()
      setRecDelete("")
    }
  })
 


  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <SideBar />
        <div className="head-foot-part">
          <section>
            <div
              className="above-table"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setToggle(!toggle);
                    handleButtonClick();
                  }}
                  style={{ height: "35px", marginBottom: "10px" }}
                >
                  {toggle ? (
                    <div className="hide">
                      <BiSolidHide
                      />
                      HIDE
                    </div>
                  ) : (
                    <div className="add">
                      <MdAdd />
                      ADD DEPARTMENT
                    </div>
                  )}
                </Button>
              </div>
            </div>
            <Collapse in={formVisible}>
              <Card
                variant="outlined"
                style={{ boxShadow: " 1px 1px 10px black" }}
              >
                <div style={{ marginTop: "20px" }}>
                  <h3
                    style={{
                      textAlign: "center",
                      marginTop: "25px",
                      fontWeight: "600",
                    }}
                  >
                    <h3> DEPARTMENT FORM</h3>
                  </h3>
                  <DialogContent>
                    <DepartmentForm />
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <DepartmentTable department={department} setRecDelete={setRecDelete} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default DepartmentView;
