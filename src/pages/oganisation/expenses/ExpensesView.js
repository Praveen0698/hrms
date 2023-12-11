import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import SideBar from "../../../components/SideBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { MdAdd } from "react-icons/md";

const ExpensesView = () => {
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    expenceType: "",
    purchaseDate: "",
    amount: "",
    purchaseBy: "",
    remarks: "",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveExpenses = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.post("http://localhost:8081/expence/create/expence", formData);
      alert("Added Successfully");
      handleClose();
      loadExpenses();
      navigate("/organisation/expenses");
    } catch (error) {
      console.error("Error saving expenses:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    handleClose();
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/expence/get/expence"
      );
      setExpenses(response.data);
    } catch (error) {
      console.error("Error loading expenses:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/expence/delete/${id}`);
      loadExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

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
            <table className="table table-bordered table-hover shadow">
              <thead>
                <tr className="text-center">
                  <th>SL.</th>
                  <th>Expense Type</th>
                  <th>Purchase Date</th>
                  <th>Amount</th>
                  <th>Purchased By</th>
                  <th>Remarks</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {expenses
                  .filter(
                    (st) =>
                      st.expenceType &&
                      st.expenceType.toLowerCase().includes(search)
                  )
                  .map((expense, index) => (
                    <tr key={expense.expenceId}>
                      <th scope="row" key={index}>
                        {index + 1}
                      </th>
                      <td>{expense.expenceType}</td>
                      <td>{expense.purchaseDate}</td>
                      <td>{expense.amount}</td>
                      <td>{expense.purchaseBy}</td>
                      <td>{expense.remarks}</td>
                      <td>{expense.status}</td>
                      <td className="mx-2">
                        <Link
                          to={`/expenses-profile/${expense.expenceId}`}
                          className="btn btn-info"
                        >
                          <FaEye />
                        </Link>
                      </td>
                      <td className="mx-2">
                        <Link
                          to={`/edit-Expenses/${expense.expenceId}`}
                          className="btn btn-warning"
                        >
                          <FaEdit />
                        </Link>
                      </td>
                      <td className="mx-2">
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(expense.expenceId)}
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
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
