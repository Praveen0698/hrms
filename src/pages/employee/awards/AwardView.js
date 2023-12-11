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
import Header from "../../../components/Header";
import SideBar from "../../../components/SideBar";

const AwardsView = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [award, setAward] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeName: "",
    awardName: "",
    giftName: "",
    cashPrice: "",
    awardDate: "",
    awardBy:"",
  });

  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

  const { awardBy,  cashPrice, awardDate } = award;
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

  const saveaward = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8081/awards/create/awards", formData);
    alert('awards added successfully');
    navigate("/awards");
    loadaward();
    setFormData({
      employeeName: "",
      awardName: "",
      giftName: "",
      cashPrice: "",
      awardsDate: "",
      awardsBy:"",

    })
  };

  const [employeeName, setEmployeeName] = useState("");
  const [errorMsg, setErrorMsg] = useState('');

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (value.length < 2 || value.length > 50) {
      setErrorMsg(' Name length should be between 2 and 50.');
    } else {
      setErrorMsg('');
    }
    setEmployeeName(e.target.value);
  };


  const [giftName, setGiftName] = useState("");
  const [errorGiftName, setErrorGiftName] = useState("");
  const [awardName, setAwardName] = useState("");
  const [errorAwardMsg, setAwardErrorMsg] = useState('');

  const handleAwardChange = (e) => {
    const valueAward = e.target.value;
    if (valueAward.length < 2 || valueAward.length > 50) {
      setAwardErrorMsg(' Name length should be between 2 and 50.');
    } else {
      setAwardErrorMsg('');
    }
    setAwardName(e.target.value);
  };

  const handleGiftChange = (e) => {
    const valueGift = e.target.value;
    if (valueGift.length < 2 || valueGift.length > 50) {
      setErrorGiftName(' Name length should be between 2 and 50.');
    } else {
      setErrorGiftName('');
    }
    setGiftName(e.target.value);
  };
  console.log(award);

  const enforceMaxLength = (value, maxLength) => {
    return value.length <= maxLength ? value : value.slice(1, maxLength);
  };

  const maxLengthAward = (valueAward, maxLength) => {
    return valueAward.length <= maxLength ? valueAward : valueAward.slice(1, maxLength);
  };
  const maxLengthGift = (valueGift, maxLength) => {
    
    return valueGift.length <= maxLength ? valueGift : valueGift.slice(1, maxLength);
   };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    handleClose();
  };

  useEffect(() => {
    loadaward();
  }, []);

  const loadaward = async () => {
    const result = await axios.get("http://localhost:8081/awards/get/awards", {
      validateStatus: () => {
        return true;
      },
    });
    setAward(result.data);
    console.log(result.data);
  };

  const handleDelete = async (id) => {
    console.log(id);
    await axios.delete(`http://localhost:8081/awards/delete/${id}`);
    loadaward();
  };

  console.log(formData)

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
              <span style={{ fontSize: "18px" }}>award</span>
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
                Add awards
              </Button>
            </div>
            <table className="table table-bordered table-hover shadow">
              <thead>
                <tr className="text-center">
                  <th>SL</th>
                  <th>Employee Name</th>
                  <th>awards Name</th>
                  <th>awards By</th>
                  <th>Gift</th>
                  <th>Cash Price</th>
                  <th>awards Date</th>
                  
                  <th colSpan="3">Actions</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {award
                  
                  .map((award, index) => (
                    <tr key={award.id}>
                      <th scope="row" key={index}>
                        {index + 1}
                      </th>
                      <td>{award.employeeName}</td>
                      <td>{award.awardsType}</td>
                      <td>{award.awardsBy}</td>
                      <td>{award.gift}</td>
                      <td>{award.date}</td>
                      <td>{award.status}</td>

                      <td className="mx-2">
                        <Link
                          to={`/awards-profile/${award.awardId}`}
                          className="btn btn-info"
                        >
                          <FaEye />
                        </Link>
                      </td>
                      <td className="mx-2">
                        <Link
                          to={`/edit-awards/${award.awardId}`}
                          className="btn btn-warning"
                        >
                          <FaEdit />
                        </Link>
                      </td>
                      <td className="mx-2">
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(award.awardId)}
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
                  Awards
                </h3>
                <DialogContent>
                  <form onSubmit={handleSubmit}>
                    <div className="data-input-fields">
                      <TextField
                        margin="dense"
                        label="Employee name"
                        type="text"
                        fullWidth
                        name="employeeName"
                        id="employeeName"

                        value={formData.employeeName}
                        onChange={(e) => handleInputChange(e)}
                        required
                        error={errorMsg !== ''}
                        helperText={errorMsg}
                        InputProps={{
                          minLength: 2,
                          maxLength: 50,
                        }}
                        onInput={(e) => {
                          e.target.value = enforceMaxLength(e.target.value, 50);
                          handleNameChange(e);
                        }} />
                      <TextField
                        margin="dense"
                        label="Awards Name"
                        type="text"
                        fullWidth
                        name="awardName"
                        id="awardName"

                        value={formData.awardName}
                        onChange={(e) => handleInputChange(e)}
                        required
                        error={errorAwardMsg !== ''}
                        helperText={errorAwardMsg}
                        InputProps={{
                          minLength: 2,
                          maxLength: 50,
                        }}
                        onInput={(e) => {
                          e.target.value = maxLengthAward(e.target.value, 50);
                          handleAwardChange(e);
                        }} />

                    </div>

                    <div className="data-input-fields">
                      <TextField
                        margin="dense"
                        label="Gift name"
                        type="text"
                        fullWidth
                        name="giftName"
                        id="giftName"
                        value={formData.giftName}
                        onChange={(e) => handleInputChange(e)}
                        required 
                        
                        
                        error={errorGiftName !== ''}
                        helperText={errorGiftName}
                        InputProps={{
                         minLength: 2,
                          maxLength: 50,
                         }}
                         onInput={(e) => {
                          e.target.value = maxLengthGift(e.target.value, 50);
                          handleGiftChange(e);
                        }}
                        />

                      <TextField
                        margin="dense"
                        label="Cash price"
                        type="number"
                        fullWidth
                        name="cashPrice"
                        id="cashPrice"
                        value={formData.cashPrice}
                        onChange={(e) => handleInputChange(e)}
                        required

                      />


                    </div>






                    <div className="data-input-fields">

                      <TextField
                        margin="dense"
                        type="date"
                        label="awards date"
                        fullWidth
                        name="awardsDate"
                        id="awardsDate"
                        value={formData.awardsDate}
                        onChange={(e) => handleInputChange(e)}
                        required
                        InputLabelProps={{
                          shrink: true,
                        }}



                      />
                      <TextField
                        margin="dense"
                        type="text"
                        label="awards By"
                        fullWidth
                        name="awardsBy"
                        id="awardsBy"
                        value={formData.awardsBy}
                        onChange={(e) => handleInputChange(e)}
                        required
                        InputLabelProps={{
                          shrink: true,
                        }}



                      />
                    </div>
                    <div className="data-buttons">
                      <DialogActions className="dialog" >
                        <Button id="input-btn"
                          type="submit"
                          onClick={saveaward}

                          variant="outlined"
                        >
                          Submit
                        </Button>
                        <Button id="input-btn"
                          className="cancel"
                          onClick={handleClose}

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

export default AwardsView;


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

// const awardsView = () => {
// 	const [awards, setawards] = useState([]);
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
// 		loadawards();
// 	}, []);

// 	const loadawards = async () => {
// 		const result = await axios.get(
// 			"http://localhost:8083/awards/get/awards",
// 			{
// 				validateStatus: () => {
// 					return true;
// 				},
// 			}
// 		);
// 		setawards(result.data);
// 		// if (result.status === 302) {
// 		// 	setawards(result.data);
// 		// }
// 	};

// 	const handleDelete = async (id) => {
// 		console.log(id);
// 		await axios.delete(
// 			`http://localhost:8083/awards/delete/${id}`
// 		);
// 		loadawards();
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
// 						<th>awards Name</th>
// 						<th>awards Type</th>
// 						<th>Email</th>
// 						<th>Website</th>
// 						<th colSpan="3">Actions</th>
// 					</tr>
// 				</thead>

// 				<tbody className="text-center">
// 					{awards
// 						.filter((st) =>
// 							st.awardsName
// 								.toLowerCase()
// 								.includes(search)
// 						)
// 						.map((awards, index) => (
// 							<tr key={awards.id}>
// 								<th scope="row" key={index}>
// 									{index + 1}
// 								</th>
// 								<td>{awards.awardsName}</td>
// 								<td>{awards.awardsType}</td>
// 								<td>{awards.email}</td>
// 								<td>{awards.website}</td>
// 								<td className="mx-2">
// 									<Link
// 										to={`/awards-profile/${awards.awardsId}`}
// 										className="btn btn-info">
// 										<FaEye />
// 									</Link>
// 								</td>
// 								<td className="mx-2">
// 									<Link
// 										to={`/edit-awards/${awards.awardsId}`}
// 										className="btn btn-warning">
// 										<FaEdit />
// 									</Link>
// 								</td>
// 								<td className="mx-2">
// 									<button
// 										className="btn btn-danger"
// 										onClick={() =>
// 											handleDelete(awards.awardsId)
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
// 				  label="awards"
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

// export default awardsView;
