import React, { useEffect, useState } from "react";

import SideBar from "../../../components/SideBar";
import Header from "../../../components/Header";

import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import { MdAdd } from "react-icons/md";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import { Card } from "@mui/material";



import * as api from "../api"
import StateTrainer from "../StateTrainer";
import TrainerForm from "../TrainerForm";
import TrainerTable from "../TrainerTable";

const TrainerView = () => {

    const { formVisible,
        setFormVisible,
        toggle,
        setToggle,
        overallTrainerRating,
        setOverallTrainerRating,
        uploadCertificate,
        setUploadCertificate,
        formControl,
        setFormControl,
        formData,
        setFormData,
        trainer,
        setTrainer,
        search,
        setSearch,
        open,
        setOpen,
        recDelete,
        setRecDelete,
    } = StateTrainer()

  
  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

 

  useEffect(() => {
    loadTrainer();
  }, []);

  const  loadTrainer = async () => {
    const result = await api.loadTrainer()
    console.log("rec", result);
    setTrainer(result);
  };



  const handleDelete = async () => {
    await api.deleteTrainer(recDelete)
    loadTrainer();
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
                      ADD TRAINER
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
                    <h3> TRAINER FORM</h3>
                  </h3>
                  <DialogContent>
                  
                  <TrainerForm />
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <TrainerTable trainer={trainer} setRecDelete={setRecDelete} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default TrainerView;
