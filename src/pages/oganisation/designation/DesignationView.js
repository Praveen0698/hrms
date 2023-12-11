import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../../../components/SideBar";
import Header from "../../../components/Header";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { MdAdd } from "react-icons/md";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const DesignationView = () => {
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, '0');
    const day = `${now.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [dateError, setDateError] = useState("");
  const [designation, setDesignation] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [open, setOpen] = useState(false);

  let navigate = useNavigate();
  const onSelectDepartment = (selectedDepartment) => {
    setSelectedDepartment(selectedDepartment);

    // Redirect to the selected department page
    navigate("/department"); // Update the path accordingly
  };

  const [formData, setFormData] = useState({
    departmentName: "",
    designationType: "",
    createdDate: getCurrentDate(),
  });

  const { departmentName, designationName } = formData;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'createdDate') {
      const isValidDate = value === getCurrentDate();
      setDateError(!isValidDate);
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      [name]: value,
      

    });
  };

  const saveDesignation = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8081/designation/create/designation", {
      ...formData,
      departmentId: selectedDepartment, // Assuming the field name is 'departmentId'
    });
    alert("Designation is added successfully");
    navigate("/organisation/designation");
    loadDesignation();
    handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
  };

  // useEffect(() => {
  //   loadDesignation();
  // }, []);
  useEffect(() => {
    loadDesignation();
    fetchDepartment(); // Moved fetchCompanies into useEffect
  }, []);

  const loadDesignation = async () => {
    const result = await axios.get(
      "http://localhost:8081/designation/get/designation",
      {
        validateStatus: () => true,
      }
    );
    setDesignation(result.data);
  };

  const fetchDepartment = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/department/get/department"
      );
      console.log(response.data); // Log the response data
      setDepartment(response.data);
    } catch (error) {
      console.error("Error fetching department data", error);
    }
  };

  console.log(department)

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8081/designation/delete/${id}`);
    loadDesignation();
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
            <table className="table table-bordered table-hover shadow">
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>Department Name</th>
                  <th>Designation Type</th>
                  <th>created Date</th> 
                  <th>Status</th>
                  <th colSpan="3">Actions</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {designation
                  .filter(
                    (st) =>
                      st.departmentName &&
                      st.departmentName.toLowerCase().includes(search)
                  )
                  .map((designation, index) => (
                    <tr key={designation.designationId}>
                      <th scope="row" key={index}>
                        {index + 1}
                      </th>
                      <td>{designation.departmentName}</td>
                      <td>{designation.designationType}</td>
                      <td>{designation.createdDate}</td>
                      <td>{designation.status}</td>
                      {/* <td className="mx-2">
                  <Link
                    to={`/designation-profile/${designation.designationId}`}
                    className="btn btn-info"
                  >
                    <FaEye />
                  </Link>
                </td> */}
                      <td className="mx-2">
                        <Link
                          to={`/edit-designation/${designation.designationId}`}
                          className="btn btn-warning"
                        >
                          <FaEdit />
                        </Link>
                      </td>
                      <td className="mx-2">
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            handleDelete(designation.designationId)
                          }
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
                <DialogTitle style={{ textAlign: "center" }}>
                  DESIGNATION FORM
                </DialogTitle>
                <DialogContent>
                  <form onSubmit={handleSubmit}>
                  <div className="data-input-fields">
                  <TextField
                          id="departmentHead"
                          margin="dense"
                          select
                          label="Department Head"
                          fullWidth
                          defaultValue="Choose"
                          SelectProps={{
                            native: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={formData.departmentHead}
                          onChange={(e) => handleInputChange(e)}
                          name="companyType"
                        >
                        {department.map((option,index) => (
                              <MenuItem key={index} value={option.departmentName}>
                                {option.departmentName}
                              </MenuItem>
                            ))}
                          
                        </TextField>
                        


                    <TextField
                      margin="dense"
                      label="Designation "
                      type="text"
                      fullWidth
                      name="designationType"
                      value={formData.designationType}
                      onChange={(e) => handleInputChange(e)}
                      required
                    />
                    <TextField
                        margin="dense"
                        label="Create Date"
                        type="date"
                        fullWidth
                        name="createdDate"
                        id="createdDate"
                        value={formData.createdDate}
                        onChange={(e) => handleInputChange(e)}
                        required
                        error={dateError}
                        helperText={dateError && "Please select the current date"}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                  </div>
                 

                    <DialogActions>
                      <div className="data-buttons">
                        <Button
                          type="submit"
                          onClick={saveDesignation}
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
                      </div>
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

export default DesignationView;
