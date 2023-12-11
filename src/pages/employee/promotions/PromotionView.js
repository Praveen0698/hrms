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

const PromotionView = () => {
  const [promotion, setpromotion] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeName: "",
    promotionTitle: "",
    promotionDate: "",
    description: "",
  });

  const {
    employeeName,
    promotionTitle,
    promotionDate,  
    description,
  } = promotion;
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

  const savePromotion = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:8083/promotion/create/promotion",
      formData
    );
    alert('Promotion added successfully');
    navigate("/promotion");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    handleClose();
  };

  useEffect(() => {
    loadpromotion();
  }, []);

  const loadpromotion = async () => {
    const result = await axios.get(
      "http://localhost:8083/promotion/get/promotion",
      {
        validateStatus: () => {
          return true;
        },
      }
    );
    setpromotion(result.data);
    console.log(result.data);
  };

  const handleDelete = async (id) => {
    console.log(id);
    await axios.delete(`http://localhost:8083/promotion/delete/${id}`);
    loadpromotion();
  };

  return (
    <section>
    <p><IoMdHome style={{fontSize:'25px', marginTop:'-8px'}} />{" "} <span style={{fontWeight:'600', fontSize:'18px'}}>/Employees/</span><span style={{fontSize:'18px'}}>promotion</span></p>
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
          Add Promotion
        </Button>
      </div>
      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr className="text-center">
            <th>Employee name</th>
            <th>promotion title</th>
            <th>promotion date</th>
            <th>description</th>
            <th colSpan="3">Actions</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {promotion
            .filter(
              (st) =>
                st.promotionName &&
                st.promotionName.toLowerCase().includes(search)
            )
            .map((promotion, index) => (
              <tr key={promotion.id}>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{promotion.promotionName}</td>
                <td>{promotion.promotionType}</td>
                <td>{promotion.email}</td>
                <td>{promotion.website}</td>
                <td className="mx-2">
                  <Link
                    to={`/promotion-profile/${promotion.promotionId}`}
                    className="btn btn-info"
                  >
                    <FaEye />
                  </Link>
                </td>
                <td className="mx-2">
                  <Link
                    to={`/edit-promotion/${promotion.promotionId}`}
                    className="btn btn-warning"
                  >
                    <FaEdit />
                  </Link>
                </td>
                <td className="mx-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(promotion.promotionId)}
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
          <h3 style={{textAlign: 'center', marginTop:'25px', fontWeight:'600'}}>PROMOTION</h3>
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
              <div style={{display:'flex'}}>
              <TextField
                margin="dense"
                label="Promotion title"
                type="text"
                fullWidth
                name="promotionTitle"
                id="promotionTitle"
                value={promotionTitle}
                onChange={(e) => handleInputChange(e)}
                required
                style={{margin:"8px 3px"}}
              />

              <TextField
                margin="dense"
                label="Promotion Date"
                type="date"
                fullWidth
                name="promotionDate"
                id="promotionDate"
                value={promotionDate}
                onChange={(e) => handleInputChange(e)}
                required
                style={{margin:"8px 3px"}}
                InputLabelProps={{
        shrink: true,
      }}
              />
              </div>

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
                style={{marginBottom:'8px'}}
              />  
              <DialogActions>
              <Button
                  type="submit"
                  onClick={savePromotion}
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

export default PromotionView;

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

// const PromotionView = () => {
// 	const [promotion, setpromotion] = useState([]);
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
// 		loadpromotion();
// 	}, []);

// 	const loadpromotion = async () => {
// 		const result = await axios.get(
// 			"http://localhost:8083/promotion/get/promotion",
// 			{
// 				validateStatus: () => {
// 					return true;
// 				},
// 			}
// 		);
// 		setpromotion(result.data);
// 		// if (result.status === 302) {
// 		// 	setpromotion(result.data);
// 		// }
// 	};

// 	const handleDelete = async (id) => {
// 		console.log(id);
// 		await axios.delete(
// 			`http://localhost:8083/promotion/delete/${id}`
// 		);
// 		loadpromotion();
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
// 						<th>promotion Name</th>
// 						<th>promotion Type</th>
// 						<th>Email</th>
// 						<th>Website</th>
// 						<th colSpan="3">Actions</th>
// 					</tr>
// 				</thead>

// 				<tbody className="text-center">
// 					{promotion
// 						.filter((st) =>
// 							st.promotionName
// 								.toLowerCase()
// 								.includes(search)
// 						)
// 						.map((promotion, index) => (
// 							<tr key={promotion.id}>
// 								<th scope="row" key={index}>
// 									{index + 1}
// 								</th>
// 								<td>{promotion.promotionName}</td>
// 								<td>{promotion.promotionType}</td>
// 								<td>{promotion.email}</td>
// 								<td>{promotion.website}</td>
// 								<td className="mx-2">
// 									<Link
// 										to={`/promotion-profile/${promotion.promotionId}`}
// 										className="btn btn-info">
// 										<FaEye />
// 									</Link>
// 								</td>
// 								<td className="mx-2">
// 									<Link
// 										to={`/edit-promotion/${promotion.promotionId}`}
// 										className="btn btn-warning">
// 										<FaEdit />
// 									</Link>
// 								</td>
// 								<td className="mx-2">
// 									<button
// 										className="btn btn-danger"
// 										onClick={() =>
// 											handleDelete(promotion.promotionId)
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
// 				  label="promotion"
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

// export default PromotionView;
