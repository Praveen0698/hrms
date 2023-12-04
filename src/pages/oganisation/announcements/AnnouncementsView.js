import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../components/Header";
import SideBar from "../../../components/SideBar";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
// import Search from "../common/Search";
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

const AnnouncementsView = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [toggle, setToggle] = useState(false);

  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

  const [announcements, setAnnouncements] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [department, setDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [location, setLocation] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  let navigate = useNavigate();
  const onSelectCompany = (selectedCompany) => {
    setSelectedCompany(selectedCompany);
    navigate("/company");
  };

  const onSelectLocation = (selectedLocation) => {
    setSelectedLocation(selectedLocation);
    navigate("/location");
  };
  const onSelectDepartment = (selectedDepartment) => {
    setSelectedDepartment(selectedDepartment);

    // Redirect to the selected department page
    navigate("/department"); // Update the path accordingly
  };

  const [formData, setFormData] = useState({
    title: " ",
    startDate: " ",
    endDate: " ",
    companyName: " ",
    locationName: " ",
    departmentName: " ",
    summary: " ",
    description: " ",
  });

  const {
    title,
    startDate,
    endDate,
    companyName,
    departmentName,
    locationName,
    summary,
    description,
  } = formData;

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

  const saveAnnouncements = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:8081/announcement/create/announcement",
      formData
    );
    navigate("/announcements");
    alert("Added Successfully");
    loadAnnouncements();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted:", formData);
    handleClose();
  };

  useEffect(() => {
    loadAnnouncements();
    fetchCompany();
    fetchLocation();
  }, []);

  const loadAnnouncements = async () => {
    const result = await axios.get(
      "http://localhost:8081/announcement/get/announcement",
      {
        validateStatus: () => {
          return true;
        },
      }
    );
    setAnnouncements(result.data);
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

  const handleDelete = async (id) => {
    console.log(id);
    await axios.delete(`http://localhost:8081/announcement/delete/${id}`);
    loadAnnouncements();
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
              {/* <Search search={search} setSearch={setSearch} /> */}
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
                      ADD ANNOUNCEMENTS
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
                    ANNOUNCEMENTS
                  </h3>
                  <DialogContent>
                    <form onSubmit={handleSubmit}>
                      <div style={{ display: "flex" }}>
                        <TextField
                          margin="dense"
                          label="Title"
                          type="text"
                          fullWidth
                          name="title"
                          id="title"
                          value={title}
                          onChange={(e) => handleInputChange(e)}
                          required
                          style={{ margin: "0 3px" }}
                        />
                        <TextField
                          margin="dense"
                          label="Start-Date"
                          type="date"
                          fullWidth
                          name="startDate"
                          id="startDate"
                          value={startDate}
                          onChange={(e) => handleInputChange(e)}
                          required
                          style={{ margin: "0 3px" }}
                        />
                        <TextField
                          margin="dense"
                          label="End-date"
                          type="date"
                          fullWidth
                          name="endDate"
                          id="endDate"
                          value={endDate}
                          onChange={(e) => handleInputChange(e)}
                          required
                          style={{ margin: "0 3px" }}
                        />
                      </div>
                      <div style={{ display: "flex" }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Department Name
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={departmentName}
                            label="Department Name"
                            onChange={(e) => handleInputChange(e)}
                            required
                          >
                            <MenuItem value={10}>
                              Human Resources Department
                            </MenuItem>
                            <MenuItem value={20}>Marketing Department</MenuItem>
                            <MenuItem value={30}>Finance Department</MenuItem>
                            <MenuItem value={40}>
                              Information Technology Department
                            </MenuItem>
                            <MenuItem value={50}>
                              Customer Service Department
                            </MenuItem>
                            <MenuItem value={60}>
                              Research and Development Department
                            </MenuItem>
                            <MenuItem value={70}>Legal Department</MenuItem>
                            <MenuItem value={80}>
                              Supply Chain Management Department
                            </MenuItem>
                          </Select>
                          <select
                            value={selectedDepartment}
                            onChange={(e) => onSelectDepartment(e.target.value)}
                          >
                            <option value="" disabled>
                              Select Department
                            </option>
                            {department.map((department) => (
                              <option
                                key={department.departmentId}
                                value={department.departmentName}
                              >
                                {department.departmentName}
                              </option>
                            ))}
                            <option value="addDepartment">
                              +Add Department
                            </option>
                          </select>
                        </FormControl>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Location Name
                          </InputLabel>
                          <select
                            value={setSelectedLocation}
                            onChange={(e) => onSelectLocation(e.target.value)}
                          >
                            <option value="" disabled>
                              Select Location Name
                            </option>
                            {location.map((location) => (
                              <option
                                key={location.locationId}
                                value={location.locationName}
                              >
                                {location.locationName}
                              </option>
                            ))}
                            <option value="addLocation">+Add Location</option>
                          </select>
                        </FormControl>
                        <FormControl fullWidth>
                          <select
                            value={setSelectedCompany}
                            onChange={(e) => onSelectCompany(e.target.value)}
                          >
                            <option value="" disabled>
                              Select company Name
                            </option>
                            {company.map((company) => (
                              <option
                                key={company.companyId}
                                value={company.companyName}
                              >
                                {company.companyName}
                              </option>
                            ))}
                            <option value="addCompany">+Add Company</option>
                          </select>
                        </FormControl>
                      </div>

                      <TextField
                        margin="dense"
                        label="Summary"
                        type="text"
                        fullWidth
                        name="summary"
                        id="summary"
                        value={summary}
                        onChange={(e) => handleInputChange(e)}
                        required
                      />
                      <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        name="description"
                        id="description"
                        value={description}
                        onChange={(e) => handleInputChange(e)}
                        required
                        style={{ margin: "8px 3px" }}
                      />

                      <DialogActions>
                        <Button
                          variant="outlined"
                          type="submit"
                          onClick={saveAnnouncements}
                          style={{
                            display: "flex",
                            height: "40px",
                            width: "49%",
                            margin: "0 5px",
                            color: "white",
                            background:
                              "linear-gradient(to right, #1cb5e0, #000046)",
                          }}
                        >
                          Submit
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={handleClose}
                          style={{
                            display: "flex",
                            height: "40px",
                            width: "49%",
                            margin: "0 5px",
                            color: "white",
                            background:
                              "linear-gradient(to left, #1cb5e0, #000046)",
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
            <br />
            <table className="table table-bordered table-hover shadow">
              <thead>
                <tr className="text-center">
                  <th>Sl.</th>
                  <th>Title</th>
                  <th>Start-Date</th>
                  <th>End-Date</th>
                  <th>Department Name</th>
                  <th>Location Name</th>
                  <th>Company Name</th>
                  <th>Summary</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {/* <tr>
            <td>1</td>
            <td>1www</td>
            <td>1www</td>
            <td>1www</td>
            <td>1www</td>
            <td>1www</td>
            <td>1www</td>
            <td>1www</td>
            <td>1www</td>
            <td>1www</td>
          </tr> */}
                {location
                  .filter(
                    (announcements) =>
                      announcements.title &&
                      announcements.title.toLowerCase().includes(search)
                  )
                  .map((announcements, index) => (
                    <tr key={announcements.id}>
                      <td scope="row" key={index}>
                        {index + 1}
                      </td>
                      <td>{announcements.title}</td>
                      <td>{announcements.startDate}</td>
                      <td>{announcements.endDate}</td>
                      <td>{announcements.departmentName}</td>
                      <td>{announcements.locationName}</td>
                      <td>{announcements.companyName}</td>
                      <td>{announcements.summary}</td>
                      <td>{announcements.description}</td>

                      <td className="mx-2">
                        <Link
                          to={`/announcements-profile/${announcements.announcementsId}`}
                          className="btn btn-info"
                        >
                          <FaEye />
                        </Link>
                      </td>
                      <td className="mx-2">
                        <Link
                          to={`/edit-annnouncements/${announcements.announcementsId}`}
                          className="btn btn-warning"
                        >
                          <FaEdit />
                        </Link>
                      </td>
                      <td className="mx-2">
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            handleDelete(announcements.announcementsId)
                          }
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

export default AnnouncementsView;
