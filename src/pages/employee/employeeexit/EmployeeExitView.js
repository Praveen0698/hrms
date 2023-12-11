import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import TextField from "@mui/material/TextField";
import { MdAdd } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import Header from '../../../components/Header';
import SideBar from "../../../components/SideBar";

const EmployeeExitView = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [descriptionError,setDescriptionError]= useState(false);
  const [employeeExit, setemployeeExit] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeExitId: "",
    employeeToExit: "",
    exitDate: "",
    typeOfExit: "",
    exitInterview: "",
    inactivateEmployeeAmount: "",
    description: "",
  });

  const {
    employeeExitId,
    employeeToExit,
    exitDate,
    typeOfExit,
    exitInterview,
    inactivateEmployeeAmount,
    description,
  } = employeeExit;
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

  const saveEmployeeExit = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:8083/employeeExit/create/employeeExit",
      formData
    );
    alert('EmployeeExit added successfully');
    navigate("/employeeExit");
    loademployeeExit();
    setFormData({
      employeeExitId: "",
    employeeToExit: "",
    exitDate: "",
    typeOfExit: "",
    exitInterview: "",
    inactivateEmployeeAmount: "",
    description: "",

    })
  };

  const Type = [
    {
      value: "Choose",
      label: "Choose",
  },
  {
    value: "YES",
    label: "YES",
},
{
  value: "NO",
  label: "NO",
},
];

const TypeAcc = [
  {
    value: "YES",
    label: "YES",
},
{
  value: "NO",
  label: "NO",
},
  

];

const TyepExit = [{
  value: "Choose",
    label: "Type Of Exit",


},
{
  value: "Resignation",
  label: "Resignation",
},
{
  value: "Retirement",
  label: "Retirement",
},
{
  value: "Termination",
  label: "Termination",
},
{
  value: "Contract Completion",
  label: "Contract Completion",
},
{
  value: "Contract Completion",
  label: "Contract Completion",
},
{
  value: "Career Break",
  label: "Career Break",
},

{
  value: "Project Completion",
  label: "Project Completion",
},



{
  value: "Transfer",
  label: "Transfer",
},





];



  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    handleClose();
  };

  useEffect(() => {
    loademployeeExit();
  }, []);

  const loademployeeExit = async () => {
    const result = await axios.get(
      "http://localhost:8083/employeeExit/get/employeeExit",
      {
        validateStatus: () => {
          return true;
        },
      }
    );
    setemployeeExit(result.data);
    console.log(result.data);
  };

  const handleDelete = async (id) => {
    console.log(id);
    await axios.delete(`http://localhost:8083/employeeExit/delete/${id}`);
    loademployeeExit();
  };

  return (

    <div>
      <Header />
      <div className="dashboard-container">
        <SideBar />
        <div className="head-foot-part" style={{ padding: "0" }}>
        <section>
    <p><IoMdHome style={{fontSize:'25px', marginTop:'-8px'}} />{" "} <span style={{fontWeight:'600', fontSize:'18px'}}>/Employees/</span><span style={{fontSize:'18px'}}>employeeExit</span></p>
      <div
        className="above-table"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
       
        <Button
          variant="outlined"
          onClick={handleOpen}
          style={{ height: "35px", marginBottom:"10px" }}
        >
          <MdAdd style={{ fontSize: "14px", marginRight: "3px" }} />
          Add EmployeeExit
        </Button>
      </div>
      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr className="text-center">
            <th>Employee Exit ID</th>
            <th>Employee to Exit</th>
            <th>Exit Date</th>
            <th>Type of Exit</th>
            <th>Exit Interview</th>
            <th>Inactivate Employee Amount</th>
            <th>Description</th>
            <th colSpan="3">Actions</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {employeeExit
            .filter(
              (st) =>
                st.employeeToExit &&
                st.employeeToExit.toLowerCase().includes(search)
            )
            .map((employeeExit, index) => (
              <tr key={employeeExit.id}>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{employeeExit.employeeExitId}</td>
                <td>{employeeExit.employeeToExit}</td>
                <td>{employeeExit.exitDate}</td>
                <td>{employeeExit.typeOfExit}</td>
                <td>{employeeExit.exitInterview}</td>
                <td>{employeeExit.inactivateEmployeeAmount}</td>
                <td>{employeeExit.description}</td>
                <td className="mx-2">
                  <Link
                    to={`/employeeExit-profile/${employeeExit.employeeExitId}`}
                    className="btn btn-info"
                  >
                    <FaEye />
                  </Link>
                </td>
                <td className="mx-2">
                  <Link
                    to={`/edit-employeeExit/${employeeExit.employeeExitId}`}
                    className="btn btn-warning"
                  >
                    <FaEdit />
                  </Link>
                </td>
                <td className="mx-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(employeeExit.employeeExitId)}
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
          <h3 style={{textAlign: 'center', marginTop:'25px', fontWeight:'600'}}>EMPLOYEE EXIT</h3>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <div className="data-input-fields">
              <TextField
                margin="dense"
                label="Employee Exit ID"
                type="text"
                fullWidth
                name="employeeExitId"
                id="employeeExitId"
                value={formData.employeeExitId}
                onChange={(e) => handleInputChange(e)}
                required
                
              />
              

              <TextField
                margin="dense"
                label="Employee to Exit"
                type="text"
                fullWidth
                name="employeeToExit"
                id="employeeToExit"
                value={formData.employeeToExit}
                onChange={(e) => handleInputChange(e)}
                required
                
              />
              
              </div>

              <div className="data-input-fields">
              <TextField
                margin="dense"
                label="Exit Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                name="exitDate"
                id="exitDate"
                value={formData.exitDate}
                onChange={(e) => handleInputChange(e)}
                required
                
              />
                     <TextField
                          id="typeOfExit"
                          margin="dense"
                          select
                          label="Type of Exit"
                          fullWidth
                          defaultValue="Choose"
                          SelectProps={{
                            native: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={formData.typeOfExit}
                          onChange={(e) => handleInputChange(e)}
                          name="companyType"
                        >{TyepExit.map((option, index) => (
                            <option key={index} value={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </TextField>
              </div>
              <div className="data-input-fields">
                    <TextField 
                    id="exitInterview"
                          margin="dense"
                          select
                          label="Exit Interview"
                          fullWidth
                          defaultValue="Choose"
                          SelectProps={{
                            native: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={formData.exitInterview}
                          onChange={(e) => handleInputChange(e)}
                          name="exitInterview">
                             {Type.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                          </TextField>
                          
                        
                         


             
              <TextField
                          id="inactivateEmployeeAmount"
                          margin="dense"
                          select
                          label="Inactivate Employee Amount"
                          fullWidth
                          defaultValue="Choose"
                          SelectProps={{
                            native: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={formData.inactivateEmployeeAmount}
                          onChange={(e) => handleInputChange(e)}
                          name="inactivateEmployeeAmount"
                        >
                          {TypeAcc.map((option, index) => (
                            <option key={index} value={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </TextField>
              </div>
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
                error={descriptionError}
  helperText={descriptionError && 'Please enter a description between 2 and 200 characters.'}
                
              />
              <div className="data-buttons">
              <DialogActions className="dialog">
              <Button id="input-btn"
                  type="submit"
                  onClick={saveEmployeeExit}
                 
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
        </Dialog>
      </div>
    </section>
        </div>
      </div>
    </div>
    
  );
};

export default EmployeeExitView;

// import React, {
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

// const EmployeeExitView = () => {
// 	const [employeeExit, setemployeeExit] = useState([]);
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
// 		loademployeeExit();
// 	}, []);

// 	const loademployeeExit = async () => {
// 		const result = await axios.get(
// 			"http://localhost:8083/employeeExit/get/employeeExit",
// 			{
// 				validateStatus: () => {
// 					return true;
// 				},
// 			}
// 		);
// 		setemployeeExit(result.data);
// 		// if (result.status === 302) {
// 		// 	setemployeeExit(result.data);
// 		// }
// 	};

// 	const handleDelete = async (id) => {
// 		console.log(id);
// 		await axios.delete(
// 			`http://localhost:8083/employeeExit/delete/${id}`
// 		);
// 		loademployeeExit();
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
// 						<th>employeeExit Name</th>
// 						<th>employeeExit Type</th>
// 						<th>Email</th>
// 						<th>Website</th>
// 						<th colSpan="3">Actions</th>
// 					</tr>
// 				</thead>

// 				<tbody className="text-center">
// 					{employeeExit
// 						.filter((st) =>
// 							st.employeeExitName
// 								.toLowerCase()
// 								.includes(search)
// 						)
// 						.map((employeeExit, index) => (
// 							<tr key={employeeExit.id}>
// 								<th scope="row" key={index}>
// 									{index + 1}
// 								</th>
// 								<td>{employeeExit.employeeExitName}</td>
// 								<td>{employeeExit.employeeExitType}</td>
// 								<td>{employeeExit.email}</td>
// 								<td>{employeeExit.website}</td>
// 								<td className="mx-2">
// 									<Link
// 										to={`/employeeExit-profile/${employeeExit.employeeExitId}`}
// 										className="btn btn-info">
// 										<FaEye />
// 									</Link>
// 								</td>
// 								<td className="mx-2">
// 									<Link
// 										to={`/edit-employeeExit/${employeeExit.employeeExitId}`}
// 										className="btn btn-warning">
// 										<FaEdit />
// 									</Link>
// 								</td>
// 								<td className="mx-2">
// 									<button
// 										className="btn btn-danger"
// 										onClick={() =>
// 											handleDelete(employeeExit.employeeExitId)
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
// 				  label="employeeExit"
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

// export default EmployeeExitView;
