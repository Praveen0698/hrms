import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../../../components/SideBar";
import Header from "../../../components/Header";

import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { MdAdd } from "react-icons/md";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import { Card } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const DepartmentView = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [department, setDepartment] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState([]);
  const [location, setLocation] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    departmentName: "",
    companyName: "",
    locationName: "",
    departmentHead: "",
    createdDate: "",
  });

  const {
    departmentName,
    companyName,
    locationName,
    departmentHead,
    createdDate,
  } = department;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveDepartment = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:8081/department/create/department",
      formData
    );
    alert("Department added successfully");
    navigate("/department ");
    loadDepartment();
    setFormData({
      locationName: "",
      departmentName: "",
      companyName: "",
      locationName: "",
      departmentHead: "",
      createdDate: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  useEffect(() => {
    loadDepartment();
    fetchCompany();
  }, []);

  // company.map((item)=> {
  //   console.log(item)
  // })
  console.log(department);

  const loadDepartment = async () => {
    const result = await axios.get(
      "http://localhost:8081/department/get/department",
      {
        validateStatus: () => {
          return true;
        },
      }
    );
    // console.log(result.data);
    setDepartment(result.data);
  };

  const fetchCompany = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/company/get/company"
      );
      // console.log(response.data); // Log the response data
      setCompany(response.data);
    } catch (error) {
      console.error("Error fetching department data", error);
    }
  };

  const fetchLocation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/location/get/location"
      );
      // console.log(response.data); // Log the response data
      setLocation(response.data);
    } catch (error) {
      console.error("Error fetching department data", error);
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    await axios.delete(`http://localhost:8081/department/delete/${id}`);
    loadDepartment();
  };

  const Type = [
    {
      value: "Choose",
      label: "Select Depatment Name",
    },
    {
      value: "Human Resources Department",
      label: "Human Resources Department",
    },
    {
      value: "Marketing Department",
      label: "Marketing Department",
    },
    {
      value: "Finance Department",
      label: "Finance Department",
    },
    {
      value: "Information Technology Department",
      label: "Information Technology Department",
    },
    {
      value: "Customer Service Department",
      label: "Customer Service Department",
    },
    {
      value: "Research and Development Department",
      label: "Research and Development Department",
    },
    {
      value: "Legal Department",
      label: "Legal Department",
    },
  ];

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
                  style={{ height: "35px" }}
                >
                  {toggle ? (
                    <div>
                      <BiSolidHide
                        style={{ fontSize: "14px", marginRight: "3px" }}
                      />
                      HIDE
                    </div>
                  ) : (
                    <div>
                      <MdAdd style={{ fontSize: "14px", marginRight: "3px" }} />
                      ADD DEPARTMENT
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
                    <h3> DEPARTMENT FORM</h3>
                  </h3>
                  <DialogContent>
                    <form onSubmit={handleSubmit}>
                      <div style={{ display: "flex" }}>
                        <FormControl fullWidth style={{ margin: "0 3px" }}>
                          <InputLabel id="departmentName-label">
                            Department Name
                          </InputLabel>
                          <Select
                            labelId="departmentName-label"
                            id="departmentName"
                            value={departmentName}
                            onChange={(e) => handleInputChange(e)}
                            name="departmentName"
                          >
                            {Type.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <FormControl fullWidth>
                          <InputLabel id="demo-company-select-label">
                            Company Name
                          </InputLabel>
                          <Select
                            labelId="demo-company-select-label"
                            id="selectedCompany"
                            value={formData.companyName}
                            label="Company Name"
                            onChange={(e) => handleInputChange(e.target.value)}
                            required
                          >
                            {company.map((item, index) => {
                              return (
                                <MenuItem key={index} value={item.companyName}>
                                  {item.companyName}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </div>
                      <div style={{ display: "flex" }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Department Head
                          </InputLabel>
                          <Select
                            margin="dense"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={departmentHead}
                            label="Department Head"
                            onChange={(e) => handleInputChange(e)}
                            required
                          >
                            <MenuItem value={10}>Sarmistha Jena</MenuItem>
                            <MenuItem value={20}>Sumit Rana</MenuItem>
                            <MenuItem value={30}>Smruti Sourav</MenuItem>
                            <MenuItem value={40}>Pritam Behera</MenuItem>
                            <MenuItem value={50}>Praveen Khuntia</MenuItem>
                            <MenuItem value={60}>Hrushikesh Jena</MenuItem>
                            <MenuItem value={70}>Subhashree Das</MenuItem>
                            <MenuItem value={80}>Subham</MenuItem>
                          </Select>
                        </FormControl>

                        <TextField
                          margin="dense"
                          type="date"
                          fullWidth
                          name="createDate"
                          value={createdDate}
                          onChange={(e) => handleInputChange(e)}
                          required
                        />
                      </div>

                      <DialogActions>
                        <Button
                          variant="outlined"
                          type="submit"
                          onClick={saveDepartment}
                          style={{
                            background:
                              "linear-gradient(to right, #1cb5e0, #000046)",
                            height: "35px",
                            width: "100%",
                            color: "white",
                          }}
                        >
                          Submit
                        </Button>
                        <Button
                          variant="outlined"
                          // onClick={}
                          style={{
                            background:
                              "linear-gradient(to left, #1cb5e0, #000046)",
                            height: "35px",
                            width: "100%",
                            color: "white",
                          }}
                        >
                          Cancel
                        </Button>
                      </DialogActions>
                    </form>
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <table className="table table-bordered table-hover shadow">
              <thead>
                <tr className="text-center">
                  <th>SL.</th>
                  <th>Department Name</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Department Head</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {department
                  .filter(
                    (st) =>
                      st.departmentName &&
                      st.departmentName.toLowerCase().includes(search)
                  )
                  .map((department, index) => (
                    <tr key={department.id}>
                      <th scope="row" key={index}>
                        {index + 1}
                      </th>
                      <td>{department.departmentName}</td>
                      <td>{department.companyName}</td>
                      <td>{department.locationName}</td>
                      <td>{department.departmentHead}</td>
                      <td>{department.status}</td>
                      <td className="mx-2">
                        <Link
                          to={`/department-profile/${department.departmentId}`}
                          className="btn btn-info"
                        >
                          <FaEye />
                        </Link>
                      </td>
                      <td className="mx-2">
                        <Link
                          to={`/edit-department/${department.departmentId}`}
                          className="btn btn-warning"
                        >
                          <FaEdit />
                        </Link>
                      </td>
                      <td className="mx-2">
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(department.departmentId)}
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DepartmentView;
