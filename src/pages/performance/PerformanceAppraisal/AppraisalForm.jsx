import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

import StatePerformance from './StateAppraisal';
import * as api from "./AppraisalApi"
const AppraisalForm = () => {
  let navigate = useNavigate();
  const {
    overallRating,
    setOverallRating,
    setPunctualityAndAttendanceRating,
    punctualityAndAttendanceRating,
    adaptabilityRating,
    setAdaptabilityRating,
    teamworkAndCollaborationRating,
    setTeamWorkAndCollaborationRating,
    initiativeAndCreativityRating,
    setInitiativeAndCreativityRating,
    jobKnowledgeRating,
    setJobKnowledgeRating,
    communicationSkillsRating,
    setCommunicationSkillsRating,
    formData,
    setFormData,
    qualityOfWorkRating,
    setQualityOfWorkRating,
    setFormVisible
  } = StatePerformance();

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

  const savePerformances = async () => {
    await api.savePerformances(formData)
    navigate("/performance/Performance-Appraisal");
    alert("performances added successfully");
    setFormData({
      employeeName: "",
      employeeIdNumber: "",
      DepartmentName: "",
      jobTitle: "",
      appraisalPeriod: "",
      qualityOfWorkComments: "",
      jobKnowledgeComments:"",
      CommunicationSkillsComments:"",
      teamworkAndCollaborationRating:"",
      teamworkAndCollaborationComments:"",
      initiativeAndCreativityComments:"",
      punctualityAndAttendanceComments:"",
      adaptabilityComments:"",
      overallComments:"",
      strengths:"",
      areasForImprovement:"",
      employeesSelfAssessment:"",
      goalsAchieved:"",
      developmentPlan:"",
      managersComments:"",
      employeesSignature:"",
      employeesSignatureDate:"",
      managersSignature:"",
      managersSignatureDate:"",
  
    })
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


  const handleSubmit = (e) => {
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // handleClose();
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }
  return (
    <form onSubmit={handleSubmit}>
                <div style={{ display: "flex" }}>
                  <TextField
                    margin="dense"
                    label="Employee Name"
                    type="text"
                    fullWidth
                    name="employeeName"
                    id="employeeName"
                    value={formData.employeeName}
                    onChange={(e) => handleInputChange(e)}
                    required
                    style={{ margin: "8px 3px" }}
                  />
                  <TextField
                    margin="dense"
                    label="Employee ID Number"
                    type="number"
                    fullWidth
                    name="employeeIdNumber"
                    id="employeeIdNumber"
                    value={formData.employeeIdNumber}
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
                    value={formData.DepartmentName}
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
                    name="jobTitle"
                    id="jobTitle"
                    value={formData.jobTitle}
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
                    value={formData.appraisalPeriod}
                    onChange={(e) => handleInputChange(e)}
                    required
                    style={{ margin: "0 3px" }}
                  />
                </div>

                <div style={{ display: "flex", gap: "4px", marginTop: "5px" }}>
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
                    value={formData.strengths}
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
                    value={formData.areasForImprovement}
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
                    value={formData.employeesSelfAssessment}
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
                    value={formData.goalsAchieved}
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
                    value={formData.developmentPlan}
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
                    value={formData.managersComments}
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
                    value={formData.employeesSignature}
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
                    value={formData.employeesSignatureDate}
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
                    value={formData.managersSignature}
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
                    value={formData.managersSignatureDate}
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
                    onClick={() => setFormVisible(false)}
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
                </div>
              </form>
  )
}

export default AppraisalForm