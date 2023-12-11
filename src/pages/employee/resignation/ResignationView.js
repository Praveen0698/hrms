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

const ResignationView = () => {
  const [resignation, setresignation] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeName: "",
    resignationDate: "",
    noticeDate: "",
    resignationReason: "",
    status: "",
    action: "",
  });

  const {
    employeeName,
    resignationDate,
    noticeDate,
    resignationReason,
    status,
    action,
  } = resignation;
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

  const saveResignation = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:8083/resignation/create/resignation",
      formData
    );
    alert("Resignation added successfully");
    navigate("/resignation");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    handleClose();
  };

  useEffect(() => {
    loadresignation();
  }, []);

  const loadresignation = async () => {
    const result = await axios.get(
      "http://localhost:8083/resignation/get/resignation",
      {
        validateStatus: () => {
          return true;
        },
      }
    );
    setresignation(result.data);
    console.log(result.data);
  };

  const handleDelete = async (id) => {
    console.log(id);
    await axios.delete(`http://localhost:8083/resignation/delete/${id}`);
    loadresignation();
  };

  return (
    <section>
      <p>
        <IoMdHome style={{ fontSize: "25px", marginTop: "-8px" }} />{" "}
        <span style={{ fontWeight: "600", fontSize: "18px" }}>/Employees/</span>
        <span style={{ fontSize: "18px" }}>resignation</span>
      </p>
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
          Add resignation
        </Button>
      </div>
      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr className="text-center">
            <th>Employee Name</th>
            <th>Notice Date</th>
            <th>Resignation Date</th>
            <th>Resignation Reason</th>
            <th colSpan="3">Actions</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {resignation
            .filter(
              (st) =>
                st.resignationName &&
                st.resignationName.toLowerCase().includes(search)
            )
            .map((resignation, index) => (
              <tr key={resignation.id}>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{resignation.resignationName}</td>
                <td>{resignation.resignationType}</td>
                <td>{resignation.noticeDate}</td>
                <td>{resignation.resignationReason}</td>
                <td>{resignation.status}</td>
                <td>{resignation.action}</td>

                <td className="mx-2">
                  <Link
                    to={`/resignation-profile/${resignation.resignationId}`}
                    className="btn btn-info"
                  >
                    <FaEye />
                  </Link>
                </td>
                <td className="mx-2">
                  <Link
                    to={`/edit-resignation/${resignation.resignationId}`}
                    className="btn btn-warning"
                  >
                    <FaEdit />
                  </Link>
                </td>
                <td className="mx-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(resignation.resignationId)}
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
          <h3
            style={{
              textAlign: "center",
              marginTop: "25px",
              fontWeight: "600",
            }}
          >
            RESIGNATION
          </h3>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <TextField
                margin="dense"
                label="employee name"
                type="text"
                fullWidth
                name="employeeName"
                id="employeeName"
                value={employeeName}
                onChange={(e) => handleInputChange(e)}
                required
              />

              <div style={{ display: "flex" }}>
                <TextField
                  margin="dense"
                  label="Notice Date"
                  type="date"
                  fullWidth
                  name="noticeDate"
                  id="noticeDate"
                  value={noticeDate}
                  onChange={(e) => handleInputChange(e)}
                  required
                  style={{ margin: "8px 3px" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  margin="dense"
                  label="Resignation Date"
                  type="date"
                  fullWidth
                  name="resignationDate"
                  id="resignationDate"
                  value={resignationDate}
                  onChange={(e) => handleInputChange(e)}
                  required
                  style={{ margin: "8px 3px" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <TextField
                margin="dense"
                label="Resignation reason"
                type="text"
                fullWidth
                name="resignationReason"
                id="resignationReason"
                value={resignationReason}
                onChange={(e) => handleInputChange(e)}
                required
                style={{ marginBottom: "8px" }}
              />
              <DialogActions>
                <Button
                  type="submit"
                  onClick={saveResignation}
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

export default ResignationView;

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

// const ResignationView = () => {
// 	const [resignation, setresignation] = useState([]);
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
// 		loadresignation();
// 	}, []);

// 	const loadresignation = async () => {
// 		const result = await axios.get(
// 			"http://localhost:8083/resignation/get/resignation",
// 			{
// 				validateStatus: () => {
// 					return true;
// 				},
// 			}
// 		);
// 		setresignation(result.data);
// 		// if (result.status === 302) {
// 		// 	setresignation(result.data);
// 		// }
// 	};

// 	const handleDelete = async (id) => {
// 		console.log(id);
// 		await axios.delete(
// 			`http://localhost:8083/resignation/delete/${id}`
// 		);
// 		loadresignation();
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
// 						<th>resignation Name</th>
// 						<th>resignation Type</th>
// 						<th>Email</th>
// 						<th>Website</th>
// 						<th colSpan="3">Actions</th>
// 					</tr>
// 				</thead>

// 				<tbody className="text-center">
// 					{resignation
// 						.filter((st) =>
// 							st.resignationName
// 								.toLowerCase()
// 								.includes(search)
// 						)
// 						.map((resignation, index) => (
// 							<tr key={resignation.id}>
// 								<th scope="row" key={index}>
// 									{index + 1}
// 								</th>
// 								<td>{resignation.resignationName}</td>
// 								<td>{resignation.resignationType}</td>
// 								<td>{resignation.email}</td>
// 								<td>{resignation.website}</td>
// 								<td className="mx-2">
// 									<Link
// 										to={`/resignation-profile/${resignation.resignationId}`}
// 										className="btn btn-info">
// 										<FaEye />
// 									</Link>
// 								</td>
// 								<td className="mx-2">
// 									<Link
// 										to={`/edit-resignation/${resignation.resignationId}`}
// 										className="btn btn-warning">
// 										<FaEdit />
// 									</Link>
// 								</td>
// 								<td className="mx-2">
// 									<button
// 										className="btn btn-danger"
// 										onClick={() =>
// 											handleDelete(resignation.resignationId)
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
// 				  label="resignation"
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

// export default ResignationView;
