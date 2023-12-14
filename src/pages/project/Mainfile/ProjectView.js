import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
// import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { MdAdd } from "react-icons/md";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import Header from "../../../components/Header";
import SideBar from "../../../components/SideBar";
import { Card, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import * as api from "../api"
import StateProject from "../StateProject";
import ProjectTable from "../ProjectTable";
import ProjectForm from "../ProjectForm";

const ProjectView = () => {
  

  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

  useEffect(() => {
    loadProject();
  }, []);
 
  

  const {
    formData,project,formVisible,toggle, setToggle,setCompany,setRecDelete,setProject, recDelete,setFormVisible,setFormData,projectTitle, setProjectTitle,clientName, setClientName,projectManager, setProjectManager,description, setDescription,summary, setSummary

 } = StateProject();

 
  

  

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
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  
  };

  const loadProject = async () => {
    const result = await api.loadProject()
    console.log("rec", result);
    setProject(result);
  };



  const handleDelete = async () => {
    await api.deleteProject(recDelete)
    loadProject();
  };

  useEffect(() => {
    if (recDelete !== "") {
      handleDelete()
      setRecDelete("")
    }
  })
 

  console.log(formData);

  useEffect(() => {
    loadProject();
    fetchCompany();
  }, []);

  // const loadProject = async () => {
  //   try {
  //     const result = await axios.get("http://localhost:8086/projects/get/projects");
  //     console.log("Project data:", result.data);
  //     setProject(result.data); // Set the project state
  //   } catch (error) {
  //     console.error("Error loading projects", error);
  //   }
  // };
  
  

 

  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <SideBar />
        <div className="head-foot-part" style={{ padding: "0" }}>

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
                  style={{ height: "35px", marginBottom: "10px" }}
                >
                  {toggle ? (
                    <div companyName="hide">
                      <BiSolidHide style={{ fontSize: "14px", marginRight: "3px" }} />
                      HIDE
                    </div>
                  ) : (
                    <div className="add">
                      <MdAdd style={{ fontSize: "14px", marginRight: "3px" }} />
                      ADD PROJECT
                    </div>
                  )}
                </Button>
              </div>
            </div>
            <Collapse in={formVisible}>
              <Card variant="outlined" style={{ boxShadow: " 1px 1px 10px black" }}>
                <div style={{ marginTop: "20px" }}>
                  <h3
                    style={{
                      textAlign: "center",
                      marginTop: "25px",
                      fontWeight: "600",
                    }}
                  >
                    PROJECT FORM
                  </h3>
                  <DialogContent>
                   <ProjectForm/>
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <br />

            <ProjectTable project={project} setRecDelete={setRecDelete}/>
            
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;