import React, { useEffect } from "react";


import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";

import { MdAdd } from "react-icons/md";


import StatePolicies from "../StatePolicies";
import PoliciesTable from "../PoliciesTable";
import * as api from "../PoliciesApi"
import Policiesform from "../PoliciesForm";

const PoliciesView = () => {
  const {
   
    policies,
    setPolicies,
    open,
    setOpen,
    setCompany,
    recDelete,
    setRecDelete,
    
  } = StatePolicies();

 

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 

  useEffect(() => {
    loadPolicies();
  }, []);

  const loadPolicies = async () => {
    const response = await api.loadPolicies()
      setPolicies(response);
  };


  const handleDelete = async () => {
    await api.deletePolicies(recDelete)
    loadPolicies()
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
                  onClick={handleOpen}
                  style={{ height: "35px" }}
                >
                  <MdAdd style={{ fontSize: "14px", marginRight: "3px" }} />
                  ADD POLICIES
                </Button>
              </div>
            </div>
            <PoliciesTable policies={policies} setRecDelete={setRecDelete}/>
            <div>
              <Dialog open={open} onClose={handleClose}>
                <h3 style={{ textAlign: "center", marginTop: "30px" }}>
                  POLICIES FORM
                </h3>
                <DialogContent>
                 <Policiesform />
                </DialogContent>
              </Dialog>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PoliciesView;
