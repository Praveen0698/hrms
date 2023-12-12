import React from 'react'
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";

import StateExpenses from './StateExpenses'
import * as api from "./ExpensesApi"

const ExpensesForm = () => {
    const navigate = useNavigate();
    const {    expenses,setExpenses,open,setOpen,formData,setFormData,recDelete,setRecDelete
    } = StateExpenses()

    const handleInputChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const saveExpenses = async () => {
        
       await api.saveExpenses(formData)
          alert("Added Successfully");
          handleClose();
         
          navigate("/organisation/expenses");
       
      };
      const handleClose = () => {
        setOpen(false);
      };
    
      const handleSubmit = () => {
       
        
        handleClose();
      };
  return (
    <form onSubmit={handleSubmit}>
                    <div className="data-input-fields">
                      <TextField
                        margin="dense"
                        label="Expense Type"
                        type="text"
                        fullWidth
                        name="expenceType"
                        id="expenceType"
                        value={formData.expenceType}
                        onChange={handleInputChange}
                        required
                      />
                      <TextField
                        margin="dense"
                        label="Purchase Date"
                        type="date"
                        fullWidth
                        name="purchaseDate"
                        id="purchaseDate"
                        value={formData.purchaseDate}
                        onChange={handleInputChange}
                        required
                        InputLabelProps={{ shrink: true }}
                      />
                    </div>

                    <TextField
                      margin="dense"
                      label="Amount"
                      type="number"
                      fullWidth
                      name="amount"
                      id="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      required
                    />
                    <TextField
                      margin="dense"
                      label="Purchased By"
                      type="text"
                      fullWidth
                      name="purchaseBy"
                      id="purchaseBy"
                      value={formData.purchaseBy}
                      onChange={handleInputChange}
                      required
                      style={{ margin: "10px 3px" }}
                    />
                    <TextField
                      margin="dense"
                      label="Remarks"
                      type="text"
                      fullWidth
                      name="remarks"
                      id="remarks"
                      value={formData.remarks}
                      onChange={handleInputChange}
                      required
                      style={{ margin: "0px 3px" }}
                    />

                    <DialogActions>
                      <Button
                        type="submit"
                        onClick={saveExpenses}
                        style={{
                          background:
                            "linear-gradient(to right, #1cb5e0, #000046)",
                          height: "35px",
                          width: "100%",
                          color: "white",
                        }}
                        variant="outlined"
                      >
                        Submit
                      </Button>
                      <Button
                        onClick={handleClose}
                        style={{
                          background:
                            "linear-gradient(to left, #1cb5e0, #000046)",
                          height: "35px",
                          width: "100%",
                          color: "white",
                        }}
                        variant="outlined"
                      >
                        Cancel
                      </Button>
                    </DialogActions>
                  </form>
  )
}

export default ExpensesForm