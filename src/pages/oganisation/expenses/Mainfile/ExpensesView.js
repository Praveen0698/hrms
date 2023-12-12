import React, { useEffect} from "react";


import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";

import { MdAdd } from "react-icons/md";

import StateExpenses from "../StateExpenses";
import ExpensesTable from "../ExpensesTable";
import * as api from "../ExpensesApi"
import ExpensesForm from "../ExpensesForm";

const ExpensesView = () => {
  

  const {expenses,setExpenses,open,setOpen,formData,setFormData,recDelete,setRecDelete} = StateExpenses()

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    const response = await api.loadExpenses()
    setExpenses(response);
  };

  const handleDelete = async () => {
    await api.deleteExpenses(recDelete)
    loadExpenses()
  };

  useEffect(() => {
    if (recDelete !== "") {
      handleDelete()
      setRecDelete("")
    }
  })

  console.log(formData)
  console.log(expenses)

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
              <div className="add">
                <Button
                  variant="outlined"
                  onClick={handleOpen}
                  style={{ height: "35px", marginBottom: "10px" }}
                >
                  <MdAdd />
                  ADD EXPENSES
                </Button>
              </div>
            </div>
            <ExpensesTable expenses={expenses} setRecDelete={setRecDelete}/>
            <div>
              <Dialog open={open} onClose={handleClose}>
                <h3 style={{ textAlign: "center", marginTop: "30px" }}>
                  EXPENSE FORM
                </h3>
                <DialogContent
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ExpensesForm />
                </DialogContent>
              </Dialog>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ExpensesView;
