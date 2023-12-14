import React, { useEffect} from "react";
import SideBar from "../../../../components/SideBar";
import Header from "../../../../components/Header";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { MdAdd } from "react-icons/md";


import StateDesignation from "../StateDesignation";
import * as api from "../DesignationApi"
import DesignationTable from "../DesignationTable";
import Designationform from "../Designationform";


const DesignationView = () => {
 
  const {designation,setDesignation,open,setOpen,recDelete,setRecDelete} = StateDesignation()

  


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 
  useEffect(() => {
    loadDesignation();
  }, []);

  const loadDesignation = async () => {
    const result = await api.loadDesignation()
    setDesignation(result);
  };

 

  console.log(designation)

  const handleDelete = async () => {
    await api.deleteDesignation(recDelete)
    loadDesignation();
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
                    // handleButtonClick();
                    handleOpen();
                  }}
                  style={{ height: "35px", marginBottom: "10px" }}
                >
                  <div className="add">
                    <MdAdd />
                    ADD DESIGNATION
                  </div>
                </Button>
              </div>
            </div>
           <DesignationTable designation={designation} setRecDelete={setRecDelete}/>

            <div>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{ textAlign: "center" }}>
                  DESIGNATION FORM
                </DialogTitle>
                <DialogContent>
                  <Designationform />
                </DialogContent>
              </Dialog>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DesignationView;
