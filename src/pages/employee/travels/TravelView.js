import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
//import Search from "../../common/Search";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { MdAdd } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import { Card } from "@mui/material";
import Header from "../../../components/Header";
import SideBar from "../../../components/SideBar";

const TravelView = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [toggle, setToggle] = useState(false);
  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };
  const [travel, settravel] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeName: "",
    startDate: "",
    endDate:"",
    purposeOfVisit:"",
    placeOfVisit: "",
    travelMode: "",
    arrangementType: "",
    expectedTravelBudget: "",
    actualTravelBudget: "",
    description: ""
  });

  const {
    employeeName,
    startDate,
    endDate,
    //purposeOfVisit,
    //placeOfVisit,
    travelMode,
    arrangementType,
    expectedTravelBudget,
    actualTravelBudget,
    description,
  } = travel;
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

    const { value } = e.target;


    // setPurposeOfVisit((prev) => {
    //   if (prev !== value) {
    //     validatePurposeOfVisit(value);
    //   }
    //   return value;
    // });
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    
  };



  const [purposeOfVisit, setPurposeOfVisit] = useState('');
  const [placeOfVisit, setPlaceOfVisit] = useState('');
  const [purposeError, setPurposeError] = useState('');
  const [placeError, setPlaceError] = useState('');
  const [error, setError] = useState('');

  // const validatePurposeOfVisit = (value) => {
  //   const isValid = value.length >= 2 && value.length <= 100;
  //   setError(isValid ? '' : 'Purpose of visit must be between 2 and 100 characters.');
  //   return isValid;
  // };

  const validateInput = (value, setValue, setError, fieldName) => {
    const isValid = value.length >= 2 && value.length <= 100;
    setError(isValid ? '' : `${fieldName} must be between 2 and 100 characters.`);
    setValue(value);
  };

  const handlePlaceChange = (e) => {
    validateInput(e.target.value, setPlaceOfVisit, setPlaceError, 'Place of visit');
  };

  const handlePurposeChange = (e) => {
    validateInput(e.target.value, setPurposeOfVisit, setPurposeError, 'Purpose of visit');
  };





  const saveTravel = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8083/travel/create/travel", formData);
    alert('Travel added successfully');
    navigate("/travel");
    loadtravel();
    setFormData({
      employeeName:"",
    startDate:"",
    endDate:"",
    //purposeOfVisit,
    placeOfVisit:"",
    travelMode:"",
    arrangementType:"",
    expectedTravelBudget:"",
    actualTravelBudget:"",
    description:"",

    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    handleClose();
  };

  useEffect(() => {
    loadtravel();
  }, []);

  const loadtravel = async () => {
    const result = await axios.get("http://localhost:8083/travel/get/travel", {
      validateStatus: () => {
        return true;
      },
    });
    settravel(result.data);
    console.log(result.data);
  };

  const handleDelete = async (id) => {
    console.log(id);
    await axios.delete(`http://localhost:8083/travel/delete/${id}`);
    loadtravel();
  };

  return (

    <div>
      <Header />
      <div className="dashboard-container">
        <SideBar />
        <div className="head-foot-part" style={{ padding: "0" }}>
        <section>
    <p><IoMdHome style={{fontSize:'25px', marginTop:'-8px'}} />{" "} <span style={{fontWeight:'600', fontSize:'18px'}}>/Employees/</span><span style={{fontSize:'18px'}}>travel</span></p>
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
                <BiSolidHide style={{ fontSize: "14px", marginRight: "3px" }} />
                HIDE
              </div>
            ) : (
              <div>
                <MdAdd style={{ fontSize: "14px", marginRight: "3px" }} />
                ADD TRAVEL
              </div>
            )}
          </Button>
        </div>
      </div>

        <Collapse in={formVisible}>
          <Card variant="outlined" style={{ boxShadow: ' 1px 1px 10px black'}}>
          <h3 style={{textAlign: 'center', marginTop:'25px', fontWeight:'600'}}>TRAVEL</h3>
          <DialogContent>
            <form onSubmit={handleSubmit}>
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
              />

              <div style={{display:'flex'}}>
              <TextField
                margin="dense"
                label="Start Date"
                type="date"
                fullWidth
                name="startDate"
                id="startDate"
                value={formData.startDate}
                onChange={(e) => handleInputChange(e)}
                required
                style={{margin:'8px 3px'}}
                InputLabelProps={{
        shrink: true,
      }}
              />

              <TextField
                margin="dense"
                label="End Date"
                type="date"
                fullWidth
                name="endDate"
                id="endDate"
                value={formData.endDate}
                onChange={(e) => handleInputChange(e)}
                required
                style={{margin:'8px 3px'}}
                InputLabelProps={{
        shrink: true,
      }}
              />

<TextField
        margin="dense"
        label="Purpose of visit"
        type="text"
        fullWidth
        name="purposeOfVisit"
        id="purposeOfVisit"
        value={purposeOfVisit}
        onChange={handlePurposeChange}
        required
        error={!!purposeError}
        helperText={purposeError}
        style={{ margin: '8px 3px' }}
      />
              </div>
              <div style={{display:'flex'}}>
              <TextField
        margin="dense"
        label="Place of visit"
        type="text"
        fullWidth
        name="placeOfVisit"
        id="placeOfVisit"
        value={placeOfVisit}
        onChange={handlePlaceChange}
        required
        error={!!placeError}
        helperText={placeError}
        style={{ margin: '8px 3px' }}
      />
              <TextField
                margin="dense"
                label="Travel mode"
                type="text"
                fullWidth
                name="travelMode"
                id="travelMode"
                value={travelMode}
                onChange={(e) => handleInputChange(e)}
                required
                style={{margin:'8px 3px'}}
              />
              <TextField
                margin="dense"
                label="Arrangement type"
                type="text"
                fullWidth
                name="arrangementType"
                id="arrangementType"
                value={arrangementType}
                onChange={(e) => handleInputChange(e)}
                required
                style={{margin:'8px 3px'}}
              />
              </div>
              <div style={{display:'flex'}}>
              <TextField
                margin="dense"
                label="Expected travel budget"
                type="number"
                fullWidth
                name="expectedTravelBudget"
                id="expectedTravelBudget"
                value={expectedTravelBudget}
                onChange={(e) => handleInputChange(e)}
                required
                style={{margin:'8px 3px'}}
              />
              <TextField
                margin="dense"
                label="Actual travel budget"
                type="number"
                fullWidth
                name="actualTravelBudget"
                id="actualTravelBudget"
                value={actualTravelBudget}
                onChange={(e) => handleInputChange(e)}
                required
                style={{margin:'8px 3px'}}
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
                style={{margin: '0 3px'}}
              />
              <DialogActions style={{margin:'8px 0'}}>
              <Button
                  type="submit"
                  onClick={saveTravel}
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
              </DialogActions>
            </form>
          </DialogContent>
          </Card>
        </Collapse><br />

      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr className="text-center">
            <th>Employee Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Place of Visit</th>
            <th colSpan="3">Actions</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {travel
            .filter(
              (st) =>
                st.travelName && st.travelName.toLowerCase().includes(search)
            )
            .map((travel, index) => (
              <tr key={travel.id}>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{travel.travelName}</td>
                <td>{travel.travelType}</td>
                <td>{travel.email}</td>
                <td>{travel.website}</td>
                <td className="mx-2">
                  <Link
                    to={`/travel-profile/${travel.travelId}`}
                    className="btn btn-info"
                  >
                    <FaEye />
                  </Link>
                </td>
                <td className="mx-2">
                  <Link
                    to={`/edit-travel/${travel.travelId}`}
                    className="btn btn-warning"
                  >
                    <FaEdit />
                  </Link>
                </td>
                <td className="mx-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(travel.travelId)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div>
      </div>
    </section>
        </div>
      </div>
    </div>
    
  );
};

export default TravelView;

