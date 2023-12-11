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
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import { Card } from "@mui/material";
import Header from "../../../components/Header";
import SideBar from "../../../components/SideBar";

const TerminationView = () => {

  const [formVisible, setFormVisible] = useState(false);
  const [toggle, setToggle] = useState(false);
  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };
  const [termination, settermination] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeId: "",
    departmentName: "",
    employeeJobTitle: "",
    dateOfHire: "",
    lastWorkingDay: "",
    reasonForTermination: "",
    dateOfTermination: "",
    timeOfTermination: "",
    locationOfTermination: "",
    finalSalaryAmount: "",
    numberOfUnusedVacation: "",
    benefitsInformation: "",
    severancePayAmount: "",
    returnOfCompanyProperty: "",
    returnDeadline: "",
    employeesFeedback: "",
    employeeReasons: "",
    employeeSuggestions: "",
    employeeAcknowledgement: "",
    referencePolicyDetails: "",
    hrContactName: "",
    hrContactNumber: "",
    hrEmailId: "",
    employeeSignature: "",
    dateOfSigning: "",
    hrRepresentativesSignature: "",
    dateOfHrRepresentativesSignature: "",
  });

  const {
    employeeName,
    employeeId,
    departmentName,
    employeeJobTitle,
    dateOfHire,
    lastWorkingDay,
    reasonForTermination,
    dateOfTermination,
    timeOfTermination,
    locationOfTermination,
    finalSalaryAmount,
    numberOfUnusedVacation,
    benefitsInformation,
    severancePayAmount,
    returnOfCompanyProperty,
    returnDeadline,
    employeesFeedback,
    employeeReasons,
    employeeSuggestions,
    employeeAcknowledgement,
    referencePolicyDetails,
    hrContactName,
    hrContactNumber,
    hrEmailId,
    employeeSignature,
    dateOfSigning,
    hrRepresentativesSignature,
    dateOfHrRepresentativesSignature,
  } = termination;
  // name: '',
  // email: '',
  // message: '',

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

  const saveTermination = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:8083/termination/create/termination",
      formData
    );
    alert('Termination added successfully');
    navigate("/termination");
    loadtermination();
    setFormData({
      employeeName: "",
    employeeId: "",
    departmentName: "",
    employeeJobTitle: "",
    dateOfHire: "",
    lastWorkingDay: "",
    reasonForTermination: "",
    dateOfTermination: "",
    timeOfTermination: "",
    locationOfTermination: "",
    finalSalaryAmount: "",
    numberOfUnusedVacation: "",
    benefitsInformation: "",
    severancePayAmount: "",
    returnOfCompanyProperty: "",
    returnDeadline: "",
    employeesFeedback: "",
    employeeReasons: "",
    employeeSuggestions: "",
    employeeAcknowledgement: "",
    referencePolicyDetails: "",
    hrContactName: "",
    hrContactNumber: "",
    hrEmailId: "",
    employeeSignature: "",
    dateOfSigning: "",
    hrRepresentativesSignature: "",
    dateOfHrRepresentativesSignature: "",

    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    handleClose();
  };

  useEffect(() => {
    loadtermination();
  }, []);

  const loadtermination = async () => {
    const result = await axios.get(
      "http://localhost:8083/termination/get/termination",
      {
        validateStatus: () => {
          return true;
        },
      }
    );
    settermination(result.data);
    console.log(result.data);
  };

  const handleDelete = async (id) => {
    console.log(id);
    await axios.delete(`http://localhost:8083/termination/delete/${id}`);
    loadtermination();
  };

  const deptName = [
    {
      value: "Corporation",
      label: "Corporation",
    },
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
        <span style={{ fontSize: "18px" }}>termination</span>
      </p>
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
                <BiSolidHide style={{ fontSize: "14px", marginRight: "3px" }} />
                HIDE
              </div>
            ) : (
              <div>
                <MdAdd style={{ fontSize: "14px", marginRight: "3px" }} />
                ADD TERMINATION
              </div>
            )}
          </Button>
        </div>
      </div>
      <Collapse in={formVisible}>
        <Card variant="outlined" style={{ boxShadow: " 1px 1px 10px black" }}>
          <h3
            style={{
              textAlign: "center",
              marginTop: "25px",
              fontWeight: "600",
            }}
          >
            TERMINATION
          </h3>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <div classname="data-input-fields">
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
                  
                />

                <TextField
                  margin="dense"
                  label="Employee ID"
                  type="text"
                  fullWidth
                  name="employeeId"
                  id="employeeId"
                  value={formData.employeeId}
                  onChange={(e) => handleInputChange(e)}
                  required
                 
                />
              </div>

              <div classname="data-input-fields">
                <TextField
                  id="departmentName"
                  margin="dense"
                  select
                  label="Department name"
                  fullWidth
                  defaultValue="EUR"
                  SelectProps={{
                    native: true,
                  }}
                  value={formData.departmentName}
                  onChange={(e) => handleInputChange(e)}
                  name="departmentName"
                  style={{ margin: "8px 3px" }}
                >
                  {deptName.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>

                <TextField
                  margin="dense"
                  label="Employee Job Title"
                  type="text"
                  fullWidth
                  name="employeeJobTitle"
                  id="employeeJobTitle"
                  value={formData.employeeJobTitle}
                  onChange={(e) => handleInputChange(e)}
                  required
                  
                />

                <TextField
                  margin="dense"
                  label="Date Of Hire"
                  type="date"
                  fullWidth
                  name="dateOfHire"
                  id="dateOfHire"
                  value={formData.dateOfHire}
                  onChange={(e) => handleInputChange(e)}
                  required
                  
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div classname="data-input-fields">
              <TextField
                margin="dense"
                label="Last Working Day"
                type="text"
                fullWidth
                name="lastWorkingDay"
                id="lastWorkingDay"
                value={formData.lastWorkingDay}
                onChange={(e) => handleInputChange(e)}
                required
               
              />

              <TextField
                margin="dense"
                label="Reason For Termination"
                type="text"
                fullWidth
                name="reasonForTermination"
                id="reasonForTermination"
                value={formData.reasonForTermination}
                onChange={(e) => handleInputChange(e)}
                required
                
              />
              </div>

              <div classname="data-input-fields">
              <TextField
                margin="dense"
                label="Date of Termination"
                type="date"
                fullWidth
                name="dateOfTermination"
                id="dateOfTermination"
                value={formData.dateOfTermination}
                onChange={(e) => handleInputChange(e)}
                required
                
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                margin="dense"
                label="Time of Termination"
                type="time"
                fullWidth
                name="timeOfTermination"
                id="timeOfTermination"
                value={formData.timeOfTermination}
                onChange={(e) => handleInputChange(e)}
                required
                
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                margin="dense"
                label="Location of Termination"
                type="text"
                fullWidth
                name="locationOfTermination"
                id="locationOfTermination"
                value={formData.locationOfTermination}
                onChange={(e) => handleInputChange(e)}
                required
                
              />

              <TextField
                margin="dense"
                label="Final Salary Amount"
                type="text"
                fullWidth
                name="finalSalaryAmount"
                id="finalSalaryAmount"
                value={formData.finalSalaryAmount}
                onChange={(e) => handleInputChange(e)}
                required
                
              />
              </div>

              <div classname="data-input-fields">
              <TextField
                margin="dense"
                label="Number Of Unused Vacation"
                type="text"
                fullWidth
                name="numberOfUnusedVacation"
                id="numberOfUnusedVacation"
                value={formData.numberOfUnusedVacation}
                onChange={(e) => handleInputChange(e)}
                required
                
              />

              <TextField
                margin="dense"
                label="Benefits Information"
                type="text"
                fullWidth
                name="benefitsInformation"
                id="benefitsInformation"
                value={benefitsInformation}
                onChange={(e) => handleInputChange(e)}
                required
                style={{margin:'0 3px'}}
              />
               <TextField
                margin="dense"
                label="Severance Pay Amount"
                type="text"
                fullWidth
                name="severancePayAmount"
                id="severancePayAmount"
                value={formData.severancePayAmount}
                onChange={(e) => handleInputChange(e)}
                required
                
              />
              </div>

              <div classname="data-input-fields">

              <TextField
                margin="dense"
                label="Return Of Company Property"
                type="text"
                fullWidth
                name="returnOfCompanyProperty"
                id="returnOfCompanyProperty"
                value={formData.returnOfCompanyProperty}
                onChange={(e) => handleInputChange(e)}
                required
                
              />
              <TextField
                margin="dense"
                label="Return Deadline"
                type="text"
                fullWidth
                name="returnDeadline"
                id="returnDeadline"
                value={formData.returnDeadline}
                onChange={(e) => handleInputChange(e)}
                required
                
              />
              </div>

              <div classname="data-input-fields">
              

              <TextField
                margin="dense"
                label="Employees Feedback"
                type="text"
                fullWidth
                name="employeesFeedback"
                id="employeesFeedback"
                value={formData.employeesFeedback}
                onChange={(e) => handleInputChange(e)}
                required
                
              />
                            <TextField
                margin="dense"
                label="Employee Reasons"
                type="text"
                fullWidth
                name="employeeReasons"
                id="employeeReasons"
                value={formData.employeeReasons}
                onChange={(e) => handleInputChange(e)}
                required
                
              />

              </div>
              <div classname="data-input-fields">


              <TextField
                margin="dense"
                label="Employee Suggestions"
                type="text"
                fullWidth
                name="employeeSuggestions"
                id="employeeSuggestions"
                value={formData.employeeSuggestions}
                onChange={(e) => handleInputChange(e)}
                required
                
              />
                           <TextField
                margin="dense"
                label="Employee Acknowledgement"
                type="text"
                fullWidth
                name="employeeAcknowledgement"
                id="employeeAcknowledgement"
                value={formData.employeeAcknowledgement}
                onChange={(e) => handleInputChange(e)}
                required
                
              />
              </div>
              <TextField
                margin="dense"
                label="Reference Policy Details"
                type="text"
                fullWidth
                name="referencePolicyDetails"
                id="referencePolicyDetails"
                value={formData.referencePolicyDetails}
                onChange={(e) => handleInputChange(e)}
                required
              />
             <div classname="data-input-fields">

             <TextField
                margin="dense"
                label="HR Contact Name"
                type="text"
                fullWidth
                name="hrContactName"
                id="hrContactName"
                value={formData.hrContactName}
                onChange={(e) => handleInputChange(e)}
                required
                
              />

              <TextField
                margin="dense"
                label="HR Contact Number"
                type="number"
                fullWidth
                name="hrContactNumber"
                id="hrContactNumber"
                value={formData.hrContactNumber}
                onChange={(e) => handleInputChange(e)}
                required
                
              />

              <TextField
                margin="dense"
                label="HR Email ID"
                type="text"
                fullWidth
                name="hrEmailId"
                id="hrEmailId"
                value={formData.hrEmailId}
                onChange={(e) => handleInputChange(e)}
                required
                
              />
              
             </div>

              
                <div classname="data-input-fields">
                <TextField
                margin="dense"
                label="Employee Signature"
                type="text"
                fullWidth
                name="employeeSignature"
                id="employeeSignature"
                value={formData.employeeSignature}
                onChange={(e) => handleInputChange(e)}
                required
               
              />

              <TextField
                margin="dense"
                label="Date Of Signing"
                InputLabelProps={{
                  shrink: true,
                }}
                type="date"
                fullWidth
                name="dateOfSigning"
                id="dateOfSigning"
                value={formData.dateOfSigning}
                onChange={(e) => handleInputChange(e)}
                required
               
              />
                </div>
              
                <div className="data-input-fields">
                <TextField
                margin="dense"
                label="HR Representatives Signature"
                type="text"
                fullWidth
                name="hrRepresentativesSignature"
                id="hrRepresentativesSignature"
                value={formData.hrRepresentativesSignature}
                onChange={(e) => handleInputChange(e)}
                required
                
              />

              <TextField
                margin="dense"
                label="Date Of HR Representatives Signature"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                name="dateOfHrRepresentativesSignature"
                id="dateOfHrRepresentativesSignature"
                value={formData.dateOfHrRepresentativesSignature}
                onChange={(e) => handleInputChange(e)}
                required
                
              />
                </div>
              
<div className="data-buttons">
<DialogActions className="dialog">
              <Button id="input-btn"
                  type="submit"
                  onClick={saveTermination}
                  
                  variant="outlined"
                >
                  Submit
                </Button>
                <Button id="input-btn"
                  onClick={() => setFormVisible(false)}
                 
                  variant="outlined"
                >
                  Cancel
                </Button>
              </DialogActions>
</div>
             
            </form>
          </DialogContent>
        </Card>
      </Collapse>
      <br />
      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr className="text-center">
            <th>Employee Name</th>
            <th>Employee ID</th>
            <th>Department Name</th>
            <th>Employee Job Title</th>
            <th>Reason For Termination</th>
            <th>Number Of Unused Vacation</th>
            <th>Benefits Information</th>
            <th>Return Of Company Property</th>
            <th>Return Deadline</th>
            <th>Employee Reasons</th>

            <th colSpan="3">Actions</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {termination
            .filter(
              (st) =>
                st.employeeName &&
                st.employeeName.toLowerCase().includes(search)
            )
            .map((termination, index) => (
              <tr key={termination.id}>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{termination.employeeName}</td>
                <td>{termination.employeeId}</td>
                <td>{termination.departmentName}</td>
                <td>{termination.employeeJobTitle}</td>
                <td>{termination.reasonForTermination}</td>
                <td>{termination.numberOfUnusedVacation}</td>
                <td>{termination.benefitsInformation}</td>
                <td>{termination.returnOfCompanyProperty}</td>
                <td>{termination.returnDeadline}</td>
                <td>{termination.employeeReasons}</td>

                <td className="mx-2">
                  <Link
                    to={`/termination-profile/${termination.terminationId}`}
                    className="btn btn-info"
                  >
                    <FaEye />
                  </Link>
                </td>
                <td className="mx-2">
                  <Link
                    to={`/edit-termination/${termination.terminationId}`}
                    className="btn btn-warning"
                  >
                    <FaEdit />
                  </Link>
                </td>
                <td className="mx-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(termination.terminationId)}
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

export default TerminationView;


// 	useEffect,
// 	useState,
// } from "react";
// import axios from "axios";
// import {
// 	FaEdit,
// 	FaEye,
// 	FaTrashAlt,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import Search from "../common/Search";
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import TextField from '@mui/material/TextField';

// const TerminationView = () => {
// 	const [termination, settermination] = useState([]);
// 	const [search, setSearch] = useState("");
// 	const [open, setOpen] = useState(false);

// 	const [formData, setFormData] = useState({
// 	  name: '',
// 	  email: '',
// 	  message: '',
// 	});

// 	const handleOpen = () => {
// 	  setOpen(true);
// 	};

// 	const handleClose = () => {
// 	  setOpen(false);
// 	};

// 	const handleInputChange = (e) => {
// 	  const { name, value } = e.target;
// 	  setFormData({
// 		...formData,
// 		[name]: value,
// 	  });
// 	};

// 	const handleSubmit = (e) => {
// 	  e.preventDefault();
// 	  // Handle form submission logic here
// 	  console.log('Form submitted:', formData);
// 	  handleClose();
// 	};

// 	useEffect(() => {
// 		loadtermination();
// 	}, []);

// 	const loadtermination = async () => {
// 		const result = await axios.get(
// 			"http://localhost:8083/termination/get/termination",
// 			{
// 				validateStatus: () => {
// 					return true;
// 				},
// 			}
// 		);
// 		settermination(result.data);
// 		// if (result.status === 302) {
// 		// 	settermination(result.data);
// 		// }
// 	};

// 	const handleDelete = async (id) => {
// 		console.log(id);
// 		await axios.delete(
// 			`http://localhost:8083/termination/delete/${id}`
// 		);
// 		loadtermination();
// 	};

// 	return (
// 		<section>
// 			<Search
// 				search={search}
// 				setSearch={setSearch}
// 			/>
// 			<table className="table table-bordered table-hover shadow">
// 				<thead>
// 					<tr className="text-center">
// 						<th>ID</th>
// 						<th>termination Name</th>
// 						<th>termination Type</th>
// 						<th>Email</th>
// 						<th>Website</th>
// 						<th colSpan="3">Actions</th>
// 					</tr>
// 				</thead>

// 				<tbody className="text-center">
// 					{termination
// 						.filter((st) =>
// 							st.terminationName
// 								.toLowerCase()
// 								.includes(search)
// 						)
// 						.map((termination, index) => (
// 							<tr key={termination.id}>
// 								<th scope="row" key={index}>
// 									{index + 1}
// 								</th>
// 								<td>{termination.terminationName}</td>
// 								<td>{termination.terminationType}</td>
// 								<td>{termination.email}</td>
// 								<td>{termination.website}</td>
// 								<td className="mx-2">
// 									<Link
// 										to={`/termination-profile/${termination.terminationId}`}
// 										className="btn btn-info">
// 										<FaEye />
// 									</Link>
// 								</td>
// 								<td className="mx-2">
// 									<Link
// 										to={`/edit-termination/${termination.terminationId}`}
// 										className="btn btn-warning">
// 										<FaEdit />
// 									</Link>
// 								</td>
// 								<td className="mx-2">
// 									<button
// 										className="btn btn-danger"
// 										onClick={() =>
// 											handleDelete(termination.terminationId)
// 										}>
// 										<FaTrashAlt />
// 									</button>
// 								</td>
// 							</tr>
// 						))}
// 				</tbody>
// 			</table>
// 		</section>
// 	),

// 	return (

// 		<div>
// 		  <Button variant="outlined" onClick={handleOpen}>
// 			Open Dialog
// 		  </Button>

// 		  <Dialog open={open} onClose={handleClose}>
// 			<DialogTitle>POLICY FORM</DialogTitle>
// 			<DialogContent>
// 			  <form onSubmit={handleSubmit}>

// 				<TextField
// 				  margin="dense"
// 				  label="termination"
// 				  type="text"
// 				  fullWidth
// 				  name="name"
// 				  value={formData.name}
// 				  onChange={handleInputChange}
// 				  required
// 				/>

// 				<TextField
// 				  margin="dense"
// 				  label="Tittle"
// 				  type="email"
// 				  fullWidth
// 				  name="email"
// 				  value={formData.email}
// 				  onChange={handleInputChange}
// 				  required
// 				/>

// 				<TextField
// 				  margin="dense"
// 				  label="Description"
// 				  type="text"
// 				  fullWidth
// 				  name="message"
// 				  value={formData.message}
// 				  onChange={handleInputChange}
// 				  required
// 				/>
// 				<DialogActions>
// 				  <Button type="submit">Submit</Button>
// 				  <Button onClick={handleClose}>Cancel</Button>
// 				</DialogActions>
// 			  </form>
// 			</DialogContent>
// 		  </Dialog>
// 		</div>

// 	  );

// };

// export default TerminationView;
