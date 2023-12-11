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

const EmployeeLastLoginView = () => {
  const [employeeLastLogin, setemployeeLastLogin] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeUserName: "",
    lastLoginDate: "",
    lastLoginTime: "",
    role: "",
    status: "",
  });

  const {
    employeeName,
    employeeUserName,
    lastLoginDate,
    lastLoginTime,
    role,
    status,
  } = employeeLastLogin;
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

  const saveEmployeeLastLogin = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:8083/employeeLastLogin/create/employeeLastLogin",
      formData
    );
    alert('EmployeeLastLogin added successfully');
    navigate("/employeeLastLogin");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    handleClose();
  };

  useEffect(() => {
    loademployeeLastLogin();
  }, []);

  const loademployeeLastLogin = async () => {
    const result = await axios.get(
      "http://localhost:8083/employeeLastLogin/get/employeeLastLogin",
      {
        validateStatus: () => {
          return true;
        },
      }
    );
    setemployeeLastLogin(result.data);
    console.log(result.data);
  };

  const handleDelete = async (id) => {
    console.log(id);
    await axios.delete(`http://localhost:8083/employeeLastLogin/delete/${id}`);
    loademployeeLastLogin();
  };

  return (
    <section>
    <p><IoMdHome style={{fontSize:'25px', marginTop:'-8px'}} />{" "} <span style={{fontWeight:'600', fontSize:'18px'}}>/Employees/</span><span style={{fontSize:'18px'}}>employeeLastLogin</span></p>
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
          Add employeeLastLogin
        </Button>
      </div>
      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr className="text-center">
            <th>Employee Name</th>
            <th>Employee UserName</th>
            <th>Last Login Date</th>
            <th>Last Login Time</th>
            <th>Role</th>
            <th>Status</th>
            <th colSpan="3">Actions</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {employeeLastLogin
            .filter(
              (st) =>
                st.employeeName &&
                st.employeeName.toLowerCase().includes(search)
            )
            .map((employeeLastLogin, index) => (
              <tr key={employeeLastLogin.id}>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{employeeLastLogin.employeeName}</td>
                <td>{employeeLastLogin.employeeUserName}</td>
                <td>{employeeLastLogin.lastLoginDate}</td>
                <td>{employeeLastLogin.lastLoginTime}</td>
                <td>{employeeLastLogin.role}</td>
                <td>{employeeLastLogin.status}</td>
                <td className="mx-2">
                  <Link
                    to={`/employeeLastLogin-profile/${employeeLastLogin.employeeLastLoginId}`}
                    className="btn btn-info"
                  >
                    <FaEye />
                  </Link>
                </td>
                <td className="mx-2">
                  <Link
                    to={`/edit-employeeLastLogin/${employeeLastLogin.employeeLastLoginId}`}
                    className="btn btn-warning"
                  >
                    <FaEdit />
                  </Link>
                </td>
                <td className="mx-2">
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      handleDelete(employeeLastLogin.employeeLastLoginId)
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
          {/* <DialogTitle>POLICY FORM</DialogTitle> */}
          <h3 style={{textAlign: 'center', marginTop:'25px', fontWeight:'600'}}>EMPLOYEE LAST LOGIN</h3>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <TextField
                margin="dense"
                label="Employee name"
                type="text"
                fullWidth
                name="employeeName"
                id="employeeName"
                value={employeeName}
                onChange={(e) => handleInputChange(e)}
                required
              />

              <TextField
                margin="dense"
                label="Employee Username"
                type="text"
                fullWidth
                name="employeeUserName"
                id="employeeUserName"
                value={employeeUserName}
                onChange={(e) => handleInputChange(e)}
                required
              />

              <div style={{display:'flex'}}>
              <TextField
                margin="dense"
                label="Last Login Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                name="lastLoginDate"
                id="lastLoginDate"
                value={lastLoginDate}
                onChange={(e) => handleInputChange(e)}
                required
                style={{margin:'8px 3px'}}
              />
              <TextField
                margin="dense"
                label="Last Login Time"
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                name="lastLoginTime"
                id="lastLoginTime"
                value={lastLoginTime}
                onChange={(e) => handleInputChange(e)}
                required
                style={{margin:'8px 3px'}}
              />
              </div>
              <div style={{display:'flex'}}>
              <TextField
                margin="dense"
                label="Role"
                type="number"
                fullWidth
                name="role"
                id="role"
                value={role}
                onChange={(e) => handleInputChange(e)}
                required
                style={{margin:"0 3px"}}
              />
              <TextField
                margin="dense"
                label="status"
                type="text"
                fullWidth
                name="status"
                id="status"
                value={status}
                onChange={(e) => handleInputChange(e)}
                required
                style={{margin:"0 3px"}}
              />
              </div><br />
              <DialogActions>
              <Button
                  type="submit"
                  onClick={saveEmployeeLastLogin}
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
  );
};

export default EmployeeLastLoginView;

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

// const EmployeeLastLoginView = () => {
// 	const [employeeLastLogin, setemployeeLastLogin] = useState([]);
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
// 		loademployeeLastLogin();
// 	}, []);

// 	const loademployeeLastLogin = async () => {
// 		const result = await axios.get(
// 			"http://localhost:8083/employeeLastLogin/get/employeeLastLogin",
// 			{
// 				validateStatus: () => {
// 					return true;
// 				},
// 			}
// 		);
// 		setemployeeLastLogin(result.data);
// 		// if (result.status === 302) {
// 		// 	setemployeeLastLogin(result.data);
// 		// }
// 	};

// 	const handleDelete = async (id) => {
// 		console.log(id);
// 		await axios.delete(
// 			`http://localhost:8083/employeeLastLogin/delete/${id}`
// 		);
// 		loademployeeLastLogin();
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
// 						<th>employeeLastLogin Name</th>
// 						<th>employeeLastLogin Type</th>
// 						<th>Email</th>
// 						<th>Website</th>
// 						<th colSpan="3">Actions</th>
// 					</tr>
// 				</thead>

// 				<tbody className="text-center">
// 					{employeeLastLogin
// 						.filter((st) =>
// 							st.employeeLastLoginName
// 								.toLowerCase()
// 								.includes(search)
// 						)
// 						.map((employeeLastLogin, index) => (
// 							<tr key={employeeLastLogin.id}>
// 								<th scope="row" key={index}>
// 									{index + 1}
// 								</th>
// 								<td>{employeeLastLogin.employeeLastLoginName}</td>
// 								<td>{employeeLastLogin.employeeLastLoginType}</td>
// 								<td>{employeeLastLogin.email}</td>
// 								<td>{employeeLastLogin.website}</td>
// 								<td className="mx-2">
// 									<Link
// 										to={`/employeeLastLogin-profile/${employeeLastLogin.employeeLastLoginId}`}
// 										className="btn btn-info">
// 										<FaEye />
// 									</Link>
// 								</td>
// 								<td className="mx-2">
// 									<Link
// 										to={`/edit-employeeLastLogin/${employeeLastLogin.employeeLastLoginId}`}
// 										className="btn btn-warning">
// 										<FaEdit />
// 									</Link>
// 								</td>
// 								<td className="mx-2">
// 									<button
// 										className="btn btn-danger"
// 										onClick={() =>
// 											handleDelete(employeeLastLogin.employeeLastLoginId)
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
// 				  label="employeeLastLogin"
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

// export default EmployeeLastLoginView;
