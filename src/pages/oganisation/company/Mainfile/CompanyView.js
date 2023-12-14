import React, { useEffect } from "react";

import Button from "@mui/material/Button";
import "../../../../../src/styles.css";
import DialogContent from "@mui/material/DialogContent";
import { MdAdd } from "react-icons/md";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import { Card } from "@mui/material";
import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";

import * as api from "../api";
import StateCompany from "../StateCompany";
import CompanyTable from "../CompanyTable";
import CompanyForm from "../CompanyForm";

const CompanyView = () => {

  const { formData,setFormVisible,recDelete,setRecDelete,setToggle,toggle,formVisible,company,setCompany} = StateCompany()

  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };
  
  useEffect(() => {
    handleDelete();
    loadCompany();
  }, []);

  const loadCompany = async () => {
    const result = await api.loadCompany()
    console.log("rec", result);
    setCompany(result);
  }

  const handleDelete = async () => {
    // console.log(id);
    await api.deleteCompany(recDelete)
    loadCompany();
  };

  console.log(company)
  console.log(formData)

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
                      <BiSolidHide />
                      HIDE
                    </div>
                  ) : (
                    <div className="add">
                      <MdAdd />
                      ADD COMPANY
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
                    COMPANY
                  </h3>
                  <DialogContent>
                    <CompanyForm/>
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <CompanyTable company={company} setRecDelete={setRecDelete}/>
            <div></div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CompanyView;
