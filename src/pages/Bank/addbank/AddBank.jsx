import React, { useEffect } from "react";
import axios from "axios";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import TextField from "@mui/material/TextField";
import { MdAdd } from "react-icons/md";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import { Card } from "@mui/material";

import Header from "../../../components/Header";
import SideBar from "../../../components/SideBar";
import BankState from "../BankState";
import BankTable from "../BankTable";
import BankForm from "../BankForm";
import * as bankapi from "../bankapi";



const AddBankView = () => {
 

  const {formData,setFormData,formVisible,setFormVisible,toggle,setToggle,addbank,setAddBank, open, setOpen, bankNameError,  setBankNameError,   accountNameError, setAccountNameError, setAccountNumberError, branchNameError, setBranchNameError,recDelete, setRecDelete} = BankState();

  
 

  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  useEffect(() => {
    loadAddbank();
  }, []);

  
  const loadAddbank = async () => {
    const result = await bankapi.loadAddbank()
    console.log("rec", result);
    setAddBank(result);
  };
  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };


  const deleteBank= async () => {
    await bankapi.deleteBank(recDelete)
    bankapi.loadAddbank();
  };

  console.log(bankNameError)

  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <SideBar />
        <div className="head-foot-part" style={{ padding: "0",marginTop:"10px" }}>
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
                  style={{ height: "35px",marginBottom: "10px" }}
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
                      ADD BANK
                    </div>

                  )}
                </Button>
              </div>
            </div>

            <Collapse in={formVisible}>
              <Card variant="outlined" style={{ boxShadow: ' 1px 1px 10px black' }}>

                <div style={{ marginTop: "20px" }}>
                  <h3
                    style={{
                      textAlign: "center",
                      marginTop: "25px",
                      fontWeight: "600",
                    }}
                  >
                    ADD BANK FORM
                  </h3>
                  <DialogContent>
                    <BankForm/>
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <BankTable addbank={addbank} setRecDelete={setRecDelete} />
            <br />
            
          </section>
        </div>
      </div>
    </div>

  );
};

export default AddBankView;
