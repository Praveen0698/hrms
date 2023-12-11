import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
// import Search from "../common/Search";
import Button from "@mui/material/Button";
// import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { MdAdd } from "react-icons/md";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import { Card, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Header from "../../../components/Header";
import SideBar from "../../../components/SideBar";
// import StarIcon from '@mui/icons-material/Star';

const PerformancesAppraisalView = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [employee,setEmployee] = useState([])
  const [toggle, setToggle] = useState(false);
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [qualityOfWorkRating, setQualityOfWorkRating] = useState(0);
  const [jobKnowledgeRating, setJobKnowledgeRating] = useState(0);
  const [communicationSkillsRating, setCommunicationSkillsRating] = useState(0);
  const [teamworkAndCollaborationRating, setTeamWorkAndCollaborationRating] =
    useState(0);
  const [initiativeAndCreativityRating, setInitiativeAndCreativityRating] =
    useState(0);
  const [punctualityAndAttendanceRating, setPunctualityAndAttendanceRating] =
    useState(0);
  const [adaptabilityRating, setAdaptabilityRating] = useState(0);
  const [overallRating, setOverallRating] = useState(0);
  console.log(value);

  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

  const handleQualityChange = (event, qualityOfWorkRating) => {
    setQualityOfWorkRating(qualityOfWorkRating);
  };

  const handleJobChange = (event, jobKnowledgeRating) => {
    setJobKnowledgeRating(jobKnowledgeRating);
  };

  const handleCommunicationChange = (event, communicationSkillsRating) => {
    setCommunicationSkillsRating(communicationSkillsRating);
  };

  const handleCollabChange = (event, teamworkAndCollaborationRating) => {
    setTeamWorkAndCollaborationRating(teamworkAndCollaborationRating);
  };

  const handleInitiativeChange = (event, initiativeAndCreativityRating) => {
    setInitiativeAndCreativityRating(initiativeAndCreativityRating);
  };

  const handleAttendanceRating = (event, punctualityAndAttendanceRating) => {
    setPunctualityAndAttendanceRating(punctualityAndAttendanceRating);
  };
  const handleAdaptabilityRating = (event, adaptabilityRating) => {
    setAdaptabilityRating(adaptabilityRating);
  };

  const handleRating = (event, overallRating) => {
    setOverallRating(overallRating);
  };

  const myObject = {
    display: "flex",
    flexDirection: "row",
    gap: "5px",
  };

  const { display, flexDirection, gap } = myObject;

  let navigate = useNavigate();
  const [performances, setPerformances] = useState([]);
  // const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    // performancesAppraisalId: "",
    employeeName: "",
    employeeIdNumber: "",
    DepartmentName: "",
    jobTitle: "",
    appraisalPeriod: "",

    qualityOfWorkComments: "",

    jobKnowledgeComments: "",

    CommunicationSkillsComments: "",
    teamworkAndCollaborationRating: "",
    teamworkAndCollaborationComments: "",

    initiativeAndCreativityComments: "",

    punctualityAndAttendanceComments: "",

    adaptabilityComments: "",

    overallComments: "",
    strengths: "",
    areasForImprovement: "",
    employeesSelfAssessment: "",
    goalsAchieved: "",
    developmentPlan: "",
    managersComments: "",
    employeesSignature: "",
    employeesSignatureDate: "",
    managersSignature: "",
    managersSignatureDate: "",
  });

  const {
    // performancesAppraisalId,
    employeeName,
    employeeIdNumber,
    DepartmentName,
    jobTitle,
    appraisalPeriod,
    strengths,
    areasForImprovement,
    employeesSelfAssessment,
    goalsAchieved,
    developmentPlan,
    managersComments,
    employeesSignature,
    employeesSignatureDate,
    managersSignature,
    managersSignatureDate,
  } = performances;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      qualityOfWorkRating: qualityOfWorkRating,
      jobKnowledgeRating: jobKnowledgeRating,
      communicationSkillsRating: communicationSkillsRating,
      teamworkAndCollaborationRating: teamworkAndCollaborationRating,
      initiativeAndCreativityRating: initiativeAndCreativityRating,
      punctualityAndAttendanceRating: punctualityAndAttendanceRating,
      adaptabilityRating: adaptabilityRating,
      overallRating: overallRating,
    });
  };

  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  const savePerformances = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:8083/performances/create/performances",
      formData
    );
    navigate("/performances");
    alert("performances added successfully");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // handleClose();
  };

  useEffect(() => {
    loadPerformances();
  }, []);

  // function getLabelText(value) {
  //   return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  // }

  const loadPerformances = async () => {
    const result = await axios.get(
      "http://localhost:8083/performances/get/performances",
      {
        validateStatus: () => {
          return true;
        },
      }
    );
    // console.log(result.data);
    setPerformances(result.data);
  };

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8082/employee/get/employee"
      );
      // console.log(response.data); // Log the response data
      setEmployee(response.data);
    } catch (error) {
      console.error("Error fetching Employee data", error);
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    await axios.delete(`http://localhost:8083/performances/delete/${id}`);
    loadPerformances();
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }
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
                      ADD APPRAISAL
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
                    PERFORMANCES APPRAISAL ID
                  </h3>
                  <DialogContent>
                    <form onSubmit={handleSubmit}>
                      <div style={{ display: "flex" }}>
                        <TextField
                          margin="dense"
                          label="Employee Name"
                          type="text"
                          fullWidth
                          name="employeeName"
                          id="employeeName"
                          value={employeeName}
                          onChange={(e) => handleInputChange(e)}
                          required
                          style={{ margin: "8px 3px" }}
                        />
                        <FormControl fullWidth>
                          <InputLabel id="demo-employee-select-label">
                            Employee Name
                          </InputLabel>
                          <Select
                            labelId="demo-employee-select-label"
                            id="selectedEmployee"
                            value={formData.employeeName}
                            label="Employee Name"
                            onChange={(e) => handleInputChange(e)}
                            required
                            name="employeeName"
                          >
                            {employee.map((item, index) => {
                              return (
                                <MenuItem key={index} value={item.employeeName}>
                                  {item.employeeName}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                        <TextField
                          margin="dense"
                          label="Employee ID Number"
                          type="number"
                          fullWidth
                          name="  employeeIdNumber"
                          id="  employeeIdNumber"
                          value={employeeIdNumber}
                          onChange={(e) => handleInputChange(e)}
                          required
                          style={{ margin: "8px 3px" }}
                        />
                        <TextField
                          margin="dense"
                          label="Department Name"
                          type="text"
                          fullWidth
                          name="DepartmentName"
                          id="DepartmentName"
                          value={DepartmentName}
                          onChange={(e) => handleInputChange(e)}
                          required
                          style={{ margin: "8px 3px" }}
                        />
                      </div>

                      <div style={{ display: "flex" }}>
                        <TextField
                          margin="dense"
                          label="Job Title"
                          type="text"
                          fullWidth
                          name=" jobTitle"
                          id=" jobTitle"
                          value={jobTitle}
                          onChange={(e) => handleInputChange(e)}
                          required
                          style={{ margin: "0 3px" }}
                        />
                        <TextField
                          margin="dense"
                          label="AppraisalPeriod"
                          type="text"
                          fullWidth
                          name="appraisalPeriod"
                          id="appraisalPeriod"
                          value={appraisalPeriod}
                          onChange={(e) => handleInputChange(e)}
                          required
                          style={{ margin: "0 3px" }}
                        />
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "4px",
                          marginTop: "5px",
                        }}
                      >
                        <Box>
                          <TextField
                            label=" Quality Of Work Rating"
                            variant="outlined"
                            fullWidth
                            style={{ margin: "6px 5px", marginTop: "9px" }}
                            InputProps={{
                              startAdornment: (
                                <Rating
                                  name="qualityOfWorkRating"
                                  value={qualityOfWorkRating}
                                  onChange={handleQualityChange}
                                  precision={0.5}
                                />
                              ),
                            }}
                          />
                        </Box>

                        <Box>
                          <TextField
                            label=" Job Knowledge Rating"
                            variant="outlined"
                            fullWidth
                            style={{ margin: "6px 5px", marginTop: "9px" }}
                            InputProps={{
                              startAdornment: (
                                <Rating
                                  name="jobKnowledgeRating"
                                  value={jobKnowledgeRating}
                                  onChange={handleJobChange}
                                  getLabelText={getLabelText}
                                  precision={0.5}
                                />
                              ),
                            }}
                          />
                        </Box>
                        <Box>
                          <TextField
                            label=" Communication Skill Rating"
                            variant="outlined"
                            fullWidth
                            style={{ margin: "0px 5px", marginTop: "9px" }}
                            InputProps={{
                              startAdornment: (
                                <Rating
                                  name="communicationSkillsRating"
                                  value={communicationSkillsRating}
                                  onChange={handleCommunicationChange}
                                  precision={0.5}
                                />
                              ),
                            }}
                          />
                        </Box>
                        <Box>
                          <TextField
                            label=" Team Work And Collaboration Rating"
                            variant="outlined"
                            fullWidth
                            style={{ margin: "0px 5px", marginTop: "9px" }}
                            InputProps={{
                              startAdornment: (
                                <Rating
                                  name="teamworkAndCollaborationRating"
                                  value={teamworkAndCollaborationRating}
                                  onChange={handleCollabChange}
                                  precision={0.5}
                                />
                              ),
                            }}
                          />
                        </Box>
                      </div>

                      <div style={{ display: "flex", gap: "4px" }}>
                        <Box>
                          <TextField
                            label="Initiative And Creativity Rating "
                            variant="outlined"
                            fullWidth
                            style={{ margin: "0px 5px", marginTop: "9px" }}
                            InputProps={{
                              startAdornment: (
                                <Rating
                                  name="initiativeAndCreativityRating"
                                  value={initiativeAndCreativityRating}
                                  onChange={handleInitiativeChange}
                                  precision={0.5}
                                />
                              ),
                            }}
                          />
                        </Box>
                        <Box>
                          <TextField
                            label="Punctuality And Attendance Rating"
                            variant="outlined"
                            fullWidth
                            style={{ margin: "0px 5px", marginTop: "9px" }}
                            InputProps={{
                              startAdornment: (
                                <Rating
                                  name="punctualityAndAttendanceRating"
                                  value={punctualityAndAttendanceRating}
                                  onChange={handleAttendanceRating}
                                  precision={0.5}
                                />
                              ),
                            }}
                          />
                        </Box>
                        <Box>
                          <TextField
                            label="AdaptabilityRating "
                            variant="outlined"
                            fullWidth
                            style={{ margin: "0px 5px", marginTop: "9px" }}
                            InputProps={{
                              startAdornment: (
                                <Rating
                                  name="adaptabilityRating"
                                  value={adaptabilityRating}
                                  onChange={handleAdaptabilityRating}
                                  precision={0.5}
                                />
                              ),
                            }}
                          />
                        </Box>
                        <Box>
                          <TextField
                            label="OverallRating "
                            variant="outlined"
                            fullWidth
                            style={{ margin: "0px 5px", marginTop: "9px" }}
                            InputProps={{
                              startAdornment: (
                                <Rating
                                  name="overallRating"
                                  value={overallRating}
                                  onChange={handleRating}
                                  precision={0.5}
                                />
                              ),
                            }}
                          />
                        </Box>
                      </div>

                      <div style={{ display: "flex", gap: "4px" }}>
                        <TextField
                          margin="dense"
                          label="Strengths"
                          type="text"
                          fullWidth
                          name="strengths"
                          id="strengths"
                          value={strengths}
                          onChange={(e) => handleInputChange(e)}
                          required
                          style={{ margin: "0px 3px", marginTop: "8px" }}
                        />
                        <TextField
                          margin="dense"
                          label="Areas For Improvement"
                          type="text"
                          fullWidth
                          name="areasForImprovement"
                          id="areasForImprovement"
                          value={areasForImprovement}
                          onChange={(e) => handleInputChange(e)}
                          required
                          style={{ margin: "0px 3px", marginTop: "8px" }}
                        />
                        <TextField
                          margin="dense"
                          label="Employees Self Assessment"
                          type="text"
                          fullWidth
                          name="employeesSelfAssessment"
                          id="employeesSelfAssessment"
                          value={employeesSelfAssessment}
                          onChange={(e) => handleInputChange(e)}
                          required
                          style={{ margin: "0px 3px", marginTop: "8px" }}
                        />
                      </div>
                      <div style={{ display: "flex", gap: "4px" }}>
                        <TextField
                          margin="dense"
                          label="Goals Achieved"
                          type="text"
                          fullWidth
                          name="goalsAchieved"
                          id="goalsAchieved"
                          value={goalsAchieved}
                          onChange={(e) => handleInputChange(e)}
                          required
                          style={{ margin: "0px 3px", marginTop: "8px" }}
                        />
                        <TextField
                          margin="dense"
                          label="Development Plan"
                          type="text"
                          fullWidth
                          name="developmentPlan"
                          id="developmentPlan"
                          value={developmentPlan}
                          onChange={(e) => handleInputChange(e)}
                          required
                          style={{ margin: "0px 3px", marginTop: "8px" }}
                        />
                      </div>
                      <div style={{ display: "flex", gap: "4px" }}>
                        <TextField
                          margin="dense"
                          label="Managers Comments"
                          type="text"
                          fullWidth
                          name="managersComments"
                          id="managersComments"
                          value={managersComments}
                          onChange={(e) => handleInputChange(e)}
                          required
                          style={{ margin: "0px 3px", marginTop: "8px" }}
                        />

                        <TextField
                          margin="dense"
                          label="Employees Signature"
                          type="text"
                          fullWidth
                          name="employeesSignature"
                          id="employeesSignature"
                          value={employeesSignature}
                          onChange={(e) => handleInputChange(e)}
                          required
                          style={{ margin: "0px 3px", marginTop: "8px" }}
                        />
                        <TextField
                          margin="dense"
                          label="Employees Signature Date"
                          type="text"
                          fullWidth
                          name="employeesSignatureDate"
                          id="employeesSignatureDate"
                          value={employeesSignatureDate}
                          onChange={(e) => handleInputChange(e)}
                          required
                          style={{ margin: "0px 3px", marginTop: "8px" }}
                        />
                      </div>
                      <div style={{ display: "flex", gap: "4px" }}>
                        <TextField
                          margin="dense"
                          label="Managers Signature"
                          type="text"
                          fullWidth
                          name="managersSignature"
                          id="managersSignature"
                          value={managersSignature}
                          onChange={(e) => handleInputChange(e)}
                          required
                          style={{ margin: "0px 3px", marginTop: "8px" }}
                        />
                        <TextField
                          margin="dense"
                          label="Managers Signature Date"
                          type="text"
                          fullWidth
                          name="managersSignatureDate"
                          id="managersSignatureDate"
                          value={managersSignatureDate}
                          onChange={(e) => handleInputChange(e)}
                          required
                          style={{ margin: "0px 3px", marginTop: "8px" }}
                        />
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "10px",
                          marginTop: "22px",
                        }}
                      >
                        <Button
                          type="submit"
                          onClick={savePerformances}
                          style={{
                            background:
                              "linear-gradient(to right, #1cb5e0, #000046)",
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
                          onClick={"/performances"}
                          style={{
                            background:
                              "linear-gradient(to left, #1cb5e0, #000046)",
                            height: "35px",
                            width: "49%",
                            color: "white",
                            margin: "0 5px",
                          }}
                          variant="outlined"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <br />

            <table className="table table-bordered table-hover shadow">
              <thead>
                <tr className="text-center">
                  <th>Serial No</th>
                  <th>Employee name</th>
                  <th>Employee id </th>
                  <th>Quality of Work Rating</th>
                  <th> Rating</th>
                  <th>Punctuality Rating</th>
                  <th>Problem Solving Skills Rating Rating</th>

                  <th colSpan="3">Actions</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {performances
                  .filter(
                    (st) =>
                      st.performancesName &&
                      st.performancesName.toLowerCase().includes()
                  )
                  .map((performances, index) => (
                    <tr key={performances.id}>
                      <th scope="row" key={index}>
                        {index + 1}
                      </th>
                      <td>{performances.performancesName}</td>
                      <td>{performances.performancesType}</td>
                      <td>{performances.email}</td>
                      <td>{performances.website}</td>
                      <td className="mx-2">
                        <Link
                          to={`/performances-profile/${performances.performancesId}`}
                          className="btn btn-info"
                        >
                          <FaEye />
                        </Link>
                      </td>
                      <td className="mx-2">
                        <Link
                          to={`/edit-performances/${performances.performancesId}`}
                          className="btn btn-warning"
                        >
                          <FaEdit />
                        </Link>
                      </td>
                      <td className="mx-2">
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            handleDelete(performances.performancesId)
                          }
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div></div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PerformancesAppraisalView;
