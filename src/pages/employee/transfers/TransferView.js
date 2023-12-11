import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
//import Search from "../../common/Search";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";
import { MdAdd } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import Header from "../../../components/Header";
import SideBar from "../../../components/SideBar";

const TransferView = () => {
  const [transfer, settransfer] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeName: "",
    transferDate: "",
    transferToDepartment: "",
    transferToLocation: "",
  });

  const {
    employeeName,
    transferDate,
    transferToDepartment,
    transferToLocation,
  } = transfer;
  // name: '',
  // email: '',
  // message: '',
  const dept = [
    {
      value: "Exempt Organization",
      label: "Exempt Organization",
    },
    {
      value: "Partnership",
      label: "Partnership",
    },
    {
      value: "Private Foundation",
      label: "Private Foundation",
    },
    {
      value: "Limited Liability Company",
      label: "Limited Liability Company",
    },
  ];
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

  const saveTransfer = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:8083/transfer/create/transfer",
      formData
    );
    alert('Transfer added successfully');
    navigate("/transfer");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    handleClose();
  };

  useEffect(() => {
    loadtransfer();
    fetchEmployee()
  }, []);

  const loadtransfer = async () => {
    const result = await axios.get(
      "http://localhost:8083/transfer/get/transfer",
      {
        validateStatus: () => {
          return true;
        },
      }
    );
    settransfer(result.data);
    console.log(result.data);
  };

  const handleDelete = async (id) => {
    console.log(id);
    await axios.delete(`http://localhost:8083/transfer/delete/${id}`);
    loadtransfer();
  };

  const [employee, setEmployee] = useState([])
  
  const fetchEmployee = async () => {
    const result = await axios.get(
      "http://localhost:8082/employees/get/employees",
      {
        validateStatus: () => {
          return true;
        },
      }
    );
    setEmployee(result.data);
    console.log(result.data);
  };

  console.log("hi",employee)

  console.log(formData)

  return (

    <div>
      <Header />
      <div className="dashboard-container">
        <SideBar />
        <div className="head-foot-part" style={{ padding: "0" }}>
        <section>
      <p>
        <IoMdHome style={{ fontSize: "25px", marginTop: "-8px" }} />{" "}
        <span style={{ fontWeight: "600", fontSize: "18px" }}>/Employees/</span>
        <span style={{ fontSize: "18px" }}>transfer</span>
      </p>
      <div
        className="above-table"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        {/* <Search search={search} setSearch={setSearch} /> */}
        <Button
          variant="outlined"
          onClick={handleOpen}
          style={{ height: "35px" }}
        >
          <MdAdd style={{ fontSize: "14px", marginRight: "3px" }} />
          Add transfer
        </Button>
      </div>
      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr className="text-center">
            <th>Employee Name</th>
            <th>Transfer Date</th>
            <th>Transfer To Department</th>
            <th>Transfer To Location</th>
            <th colSpan="3">Actions</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {transfer
            .filter(
              (st) =>
                st.transferName &&
                st.transferName.toLowerCase().includes(search)
            )
            .map((transfer, index) => (
              <tr key={transfer.id}>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{transfer.transferName}</td>
                <td>{transfer.transferType}</td>
                <td>{transfer.email}</td>
                <td>{transfer.website}</td>
                <td className="mx-2">
                  <Link
                    to={`/transfer-profile/${transfer.transferId}`}
                    className="btn btn-info"
                  >
                    <FaEye />
                  </Link>
                </td>
                <td className="mx-2">
                  <Link
                    to={`/edit-transfer/${transfer.transferId}`}
                    className="btn btn-warning"
                  >
                    <FaEdit />
                  </Link>
                </td>
                <td className="mx-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(transfer.transferId)}
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
          {/* <DialogTitle>POLICY FORM</DialogTitle> */}
          <h3
            style={{
              textAlign: "center",
              marginTop: "25px",
              fontWeight: "600",
            }}
          >
            TRANSFER
          </h3>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <div className="data-input-fields">
             

<TextField
                id="employeeName"
                select
                margin="dense"
                label="Employee Name"
                fullWidth
                defaultValue="EUR"
                SelectProps={{
                  native: true,
                }}
                value={employeeName}
                onChange={(e) => handleInputChange(e)}
                name="employeeName"
              >
                {employee.map((option,index) => (
                  <option key={index} value={option.employeeName}>
                    {option.employeeName}
                  </option>
                ))}
              </TextField>
              
              <TextField
                margin="dense"
                label="dd-mm-yyyy"
                type="text"
                fullWidth
                name="transferDate"
                id="transferDate"
                value={transferDate}
                onChange={(e) => handleInputChange(e)}
                required
              />
              </div>

             <div className="data-input-fields">
             <TextField
                id="transferToDepartment"
                select
                margin="dense"
                label="Transfer To Department"
                fullWidth
                defaultValue="EUR"
                SelectProps={{
                  native: true,
                }}
                value={transferToDepartment}
                onChange={(e) => handleInputChange(e)}
                name="transferToDepartment"
              >
                {dept.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>

              <TextField
                margin="dense"
                label="Transfer To Location"
                type="text"
                fullWidth
                name="transferToLocation"
                id="transferToLocation"
                value={transferToLocation}
                onChange={(e) => handleInputChange(e)}
                required
              />
             </div>
              <DialogActions>
              <Button
                  type="submit"
                  onClick={saveTransfer}
                  style={{
                    background: "linear-gradient(to right, #1cb5e0, #000046)",
                    height: "35px",
                    width: "49%",
                    color: "white",
                    margin: "0 5px",
                  }}
                  variant="outlined"
                >
                  Submit
                </Button>
                <Button
                  onClick={handleClose}
                  style={{
                    background: "linear-gradient(to left, #1cb5e0, #000046)",
                    height: "35px",
                    width: "49%",
                    color: "white",
                    margin: "0 5px",
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

export default TransferView;

