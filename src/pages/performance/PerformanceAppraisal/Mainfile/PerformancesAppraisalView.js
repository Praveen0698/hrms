import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
// import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { MdAdd } from "react-icons/md";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import { Card } from "@mui/material";

// import StarIcon from '@mui/icons-material/Star';

import StatePerformance from "../StateAppraisal";
import PerformanceTable from "../AppraisalTable";
import * as api from "../AppraisalApi";
import AppraisalForm from "../AppraisalForm";

const PerformancesAppraisalView = () => {
  const {
    recDelete,
    setRecDelete,
    performances,
    setPerformances,
    formData,
    formVisible,
    setFormVisible,
    toggle,
    setToggle,
  } = StatePerformance();

  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

  useEffect(() => {
    loadPerformances();
  }, []);

  // function getLabelText(value) {
  //   return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  // }

  const loadPerformances = async () => {
    const result = await api.loadPerformances();
    setPerformances(result);
  };

  const handleDelete = async () => {
    await api.deleteDesignation(recDelete);
    loadPerformances();
  };

  useEffect(() => {
    if (recDelete !== "") {
      handleDelete();
      setRecDelete("");
    }
  });

  console.log(formData)
  console.log(performances)
  console.log(formVisible)

  return (
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
            style={{ height: "35px" }}
          >
            {toggle ? (
              <div>
                <BiSolidHide style={{ fontSize: "14px", marginRight: "3px" }} />
                HIDE
              </div>
            ) : (
              <div>
                <MdAdd style={{ fontSize: "14px", marginRight: "3px" }} />
                ADD APPRAISAL
              </div>
            )}
          </Button>
        </div>
      </div>
      <Collapse in={formVisible}>
        <Card variant="outlined" style={{ boxShadow: " 1px 1px 10px black" }}>
          <div style={{ marginTop: "20px" }}>
            <h3
              style={{
                textAlign: "center",
                marginTop: "25px",
                fontWeight: "600",
              }}
            >
              PERFORMANCES APPRAISAL ID
            </h3>
            <DialogContent>
              <AppraisalForm />
            </DialogContent>
          </div>
        </Card>
      </Collapse>
      <br />
      <PerformanceTable
        performances={performances}
        setRecDelete={setRecDelete}
      />

      <div></div>
    </section>
  );
};

export default PerformancesAppraisalView;
