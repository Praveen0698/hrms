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

const ComplaintView = () => {
  const [complaint, setcomplaint] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    complaintId: "",
    complaintFromEmployee: "",
    complaintTitle: "",
    complaintDate: "",
    complaintAgainstEmployee: "",
    description: "",
  });

  const {
    complaintId,
    complaintFromEmployee,
    complaintTitle,
    complaintDate,
    complaintAgainstEmployee,
    description,
  } = complaint;
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

  const saveComplaint = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:8083/complaint/create/complaint",
      formData
    );
    alert('Complaint added successfully');
    navigate("/complaint");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    handleClose();
  };

  useEffect(() => {
    loadcomplaint();
  }, []);

  const loadcomplaint = async () => {
    const result = await axios.get(
      "http://localhost:8083/complaint/get/complaint",
      {
        validateStatus: () => {
          return true;
        },
      }
    );
    setcomplaint(result.data);
    console.log(result.data);
  };

  const handleDelete = async (id) => {
    console.log(id);
    await axios.delete(`http://localhost:8083/complaint/delete/${id}`);
    loadcomplaint();
  };

  return (
    <section>
    <p><IoMdHome style={{fontSize:'25px', marginTop:'-8px'}} />{" "} <span style={{fontWeight:'600', fontSize:'18px'}}>/Employees/</span><span style={{fontSize:'18px'}}>complaint</span></p>
      <div
        className="above-table"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        {/* Search search={search} setSearch={setSearch} /> */}
        <Button
          variant="outlined"
          onClick={handleOpen}
          style={{ height: "35px" }}
        >
          <MdAdd style={{ fontSize: "14px", marginRight: "3px" }} />
          Add complaint
        </Button>
      </div>
      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr className="text-center">
            <th>Complaints ID</th>
            <th>complaint title</th>
            <th>complaint date</th>
            <th>description</th>
            <th colSpan="3">Actions</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {complaint
            .filter(
              (st) =>
                st.complaintName &&
                st.complaintName.toLowerCase().includes(search)
            )
            .map((complaint, index) => (
              <tr key={complaint.id}>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{complaint.complaintName}</td>
                <td>{complaint.complaintType}</td>
                <td>{complaint.email}</td>
                <td>{complaint.website}</td>
                <td className="mx-2">
                  <Link
                    to={`/complaint-profile/${complaint.complaintId}`}
                    className="btn btn-info"
                  >
                    <FaEye />
                  </Link>
                </td>
                <td className="mx-2">
                  <Link
                    to={`/edit-complaint/${complaint.complaintId}`}
                    className="btn btn-warning"
                  >
                    <FaEdit />
                  </Link>
                </td>
                <td className="mx-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(complaint.complaintId)}
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
          <h3 style={{textAlign: 'center', marginTop:'25px', fontWeight:'600'}}>COMPLAINT</h3>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <div style={{display:'flex'}}>
              <TextField
                margin="dense"
                label="Complaint id"
                type="text"
                fullWidth
                name="complaintId"
                id="complaintId"
                value={complaintId}
                onChange={(e) => handleInputChange(e)}
                required
                style={{margin:'0 3px'}}
              />

              <TextField
                margin="dense"
                label="Complaint from employee"
                type="text"
                fullWidth
                name="complaintFromEmployee"
                id="complaintFromEmployee"
                value={complaintFromEmployee}
                onChange={(e) => handleInputChange(e)}
                required
                style={{margin:'0 3px'}}
              />
              </div>

              <div style={{display:'flex'}}>
              <TextField
                margin="dense"
                label="Complaint title"
                type="text"
                fullWidth
                name="complaintTitle"
                id="complaintTitle"
                value={complaintTitle}
                onChange={(e) => handleInputChange(e)}
                required
                style={{margin:'8px 3px'}}
              />
              <TextField
                margin="dense"
                label="Complaint date"
                type="date"
                fullWidth
                name="complaintDate"
                id="complaintDate"
                value={complaintDate}
                onChange={(e) => handleInputChange(e)}
                required
                style={{margin:'8px 3px'}}
                InputLabelProps={{
        shrink: true,
      }}
              />
              </div>
              <TextField
                margin="dense"
                label="Complaint against employee"
                type="number"
                fullWidth
                name="complaintAgainstEmployee"
                id="complaintAgainstEmployee"
                value={complaintAgainstEmployee}
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
                style={{margin:'8px 0'}}
              />
              <DialogActions>
              <Button
                  type="submit"
                  onClick={saveComplaint}
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

export default ComplaintView;

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

// const ComplaintView = () => {
// 	const [complaint, setcomplaint] = useState([]);
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
// 		loadcomplaint();
// 	}, []);

// 	const loadcomplaint = async () => {
// 		const result = await axios.get(
// 			"http://localhost:8083/complaint/get/complaint",
// 			{
// 				validateStatus: () => {
// 					return true;
// 				},
// 			}
// 		);
// 		setcomplaint(result.data);
// 		// if (result.status === 302) {
// 		// 	setcomplaint(result.data);
// 		// }
// 	};

// 	const handleDelete = async (id) => {
// 		console.log(id);
// 		await axios.delete(
// 			`http://localhost:8083/complaint/delete/${id}`
// 		);
// 		loadcomplaint();
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
// 						<th>complaint Name</th>
// 						<th>complaint Type</th>
// 						<th>Email</th>
// 						<th>Website</th>
// 						<th colSpan="3">Actions</th>
// 					</tr>
// 				</thead>

// 				<tbody className="text-center">
// 					{complaint
// 						.filter((st) =>
// 							st.complaintName
// 								.toLowerCase()
// 								.includes(search)
// 						)
// 						.map((complaint, index) => (
// 							<tr key={complaint.id}>
// 								<th scope="row" key={index}>
// 									{index + 1}
// 								</th>
// 								<td>{complaint.complaintName}</td>
// 								<td>{complaint.complaintType}</td>
// 								<td>{complaint.email}</td>
// 								<td>{complaint.website}</td>
// 								<td className="mx-2">
// 									<Link
// 										to={`/complaint-profile/${complaint.complaintId}`}
// 										className="btn btn-info">
// 										<FaEye />
// 									</Link>
// 								</td>
// 								<td className="mx-2">
// 									<Link
// 										to={`/edit-complaint/${complaint.complaintId}`}
// 										className="btn btn-warning">
// 										<FaEdit />
// 									</Link>
// 								</td>
// 								<td className="mx-2">
// 									<button
// 										className="btn btn-danger"
// 										onClick={() =>
// 											handleDelete(complaint.complaintId)
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
// 				  label="complaint"
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

// export default ComplaintView;
