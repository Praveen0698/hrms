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

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, '0');
    const day = `${now.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
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
    createdDate: getCurrentDate(),
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

  const [summaryError, setSummaryError] = useState(false);

  const [titleError, setTitleError] = useState(false);
  const [dateError, setDateError] = useState(false);

  const handleInputChange = (e) => {

    

    const { name, value } = e.target;

    const isValidLengthSum = value.length >= 2 && value.length <= 200;
    const hasNoNumbersSum = !/\d/.test(value); // Check for the presence of numbers
    setSummaryError(!isValidLengthSum || !hasNoNumbersSum);

    
    const isValidLength = value.length >= 2 && value.length <= 50;
    const hasNoNumbers = !/\d/.test(value); // Check for the presence of numbers
    setTitleError(!isValidLength || !hasNoNumbers);

    const isValidDate = value === getCurrentDate();
    setDateError(!isValidDate);

    

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      [name]: value,

    });
  };

  

  const saveAnnouncements = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:8081/announcement/create/announcement",
      formData
    );
    navigate("/organisation/announcements");
    alert("Added Successfully");
    loadAnnouncements();
    setFormData({
      title: " ",
      startDate: " ",
      endDate: " ",
      companyName: " ",
      locationName: " ",
      departmentName: " ",
      summary: " ",
      description: " ",
      createdDate: getCurrentDate(),

    })
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
 

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted:", formData);
    handleClose();
  };
console.log(formData)
  useEffect(() => {
    loadAnnouncements();
    fetchCompany();
    fetchLocation();
    fetchDepartment()
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

  console.log("dept",department)
  console.log("loc",location)
  console.log("comp",company)
console.log(announcements )
  const handleDelete = async (id) => {
    console.log(id);
    await axios.delete(`http://localhost:8081/announcement/delete/${id}`);
    loadAnnouncements();
  };
 

  // useEffect(() => {
  //   // Set the initial value to the current date
  //   const currentDate = new Date().toISOString().split('T')[0];
  //   setCreatedDate(currentDate);
  // }, []); // The empty dependency array ensures this runs only once on mount

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
                  style={{ height: "35px", marginBottom: "10px" }}
                >
                  {toggle ? (
                    <div className="hide">
                      <BiSolidHide />
                      HIDE
                    </div>
                  ) : (
                    <div className="add">
                      <MdAdd />
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
                <div>
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
                      <div className="data-input-fields">
                      <TextField
      margin="dense"
      label="Title"
      type="text"
      fullWidth
      name="title"
      id="title"
      value={formData.title}
      onChange={(e) => handleInputChange(e)}
      required
      error={titleError}
      helperText={titleError && "Title must be between 2 and 50 characters"}
    />
                        <TextField
                          margin="dense"
                          label="Start-Date"
                          type="date"
                          fullWidth
                          name="startDate"
                          id="startDate"
                          value={formData.startDate}
                          onChange={(e) => handleInputChange(e)}
                          required
                        />
                        <TextField
                          margin="dense"
                          label="End-date"
                          type="date"
                          fullWidth
                          name="endDate"
                          id="endDate"
                          value={formData.endDate}
                          onChange={(e) => handleInputChange(e)}
                          required
                        />
                         <TextField
      margin="dense"
      label="Created Date"
      type="date"
      fullWidth
      name="createdDate"
      id="createdDate"
      value={formData.createdDate}
      onChange={(e) => handleInputChange(e)}
      required
      error={dateError}
      helperText={dateError ? 'Please select the current date' : ''}
    />
                      </div>
                      <div className="data-input-fields">
                      <TextField
                          id="departmentName"
                          margin="dense"
                          select
                          label="Department Name"
                          fullWidth
                          defaultValue="Choose"
                          SelectProps={{
                            native: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={formData.departmentName}
                          onChange={(e) => handleInputChange(e)}
                          name="departmentName"
                        >
                         {Type.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                          id="locationName"
                          margin="dense"
                          select
                          label="Location Name"
                          fullWidth
                          defaultValue="Choose"
                          SelectProps={{
                            native: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={formData.departmentName}
                          onChange={(e) => handleInputChange(e)}
                          name="dlocationName"
                        >
                          {location.map((item, index) => {
                              return(<MenuItem key={index} value={item.locationName}>
                                {item.locationName}
                              </MenuItem>)
                              
                            })}
                        </TextField>

                        <TextField
                          id="companyName"
                          margin="dense"
                          select
                          label="Company Name"
                          fullWidth
                          defaultValue="Choose"
                          SelectProps={{
                            native: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={formData.companyName}
                          onChange={(e) => handleInputChange(e)}
                          name="companyName"
                        >
                          {company.map((option, index) => (
                            <MenuItem key={index} value={option.companyName}>
                              {option.companyName}
                            </MenuItem>
                          ))}
                        </TextField>

                      </div>

                      <div className="data-input-fields">
                      <TextField
      margin="dense"
      label="Summary"
      type="text"
      fullWidth
      name="summary"
      id="summary"
      value={formData.summary}
      onChange={(e) => handleInputChange(e)}
      required
      error={summaryError}
      helperText={
        summaryError
          ? "Summary must be between 2 and 200 characters and should not contain numbers"
          : ""
      }
    />
                        <TextField
                          margin="dense"
                          label="Description"
                          type="text"
                          fullWidth
                          name="description"
                          id="description"
                          value={formData.description}
                          onChange={(e) => handleInputChange(e)}
                          required
                        />
                      </div>

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
                  <th>Created-Date</th>
                  <th>Department Name</th>
                  <th>Location Name</th>
                  <th>Company Name</th>
                  <th>Summary</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody className="text-center">
                
                {announcements
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
                      <td>{announcements.createdDate}</td>
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
