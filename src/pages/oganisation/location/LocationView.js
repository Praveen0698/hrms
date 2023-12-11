import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../../../components/SideBar";
import Header from "../../../components/Header";
import Button from "@mui/material/Button";
// import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { MdAdd } from "react-icons/md";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import { Card, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const LocationView = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [phone, setPhoneNumber] = useState();
  const [phoneError, setPhoneError] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [company, setCompany] = useState([]);
  let navigate = useNavigate();


  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

  const [location, setLocation] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    locationName: " ",
    email: " ",
    phone: " ",
    faxNumber: " ",
    locationHead: " ",
    address: " ",
    companyName: " ",
  });



  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const isValidLength = value.length >= 2 && value.length <= 40;
    setAddressError(!isValidLength);

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsEmailValid(emailRegex.test(value));
    }
    if (name === 'phone') {
      // Validate phone number format
      const isValidPhoneNumber = /^\d{10}(-\d{1,4})?$/.test(value);
      setPhoneError(!isValidPhoneNumber);
    }

    const isValidFax = /^\d{10}$/.test(value);
    setFaxError(!isValidFax);
    setFormData({
      ...formData,
      [name]: value,
      [e.target.name]: e.target.value,

    });
  };

 

  const saveLocation = async (e) => {

    await axios.post(
      "http://localhost:8081/location/create/location",
      formData
    );
    alert("Location saved successfully");
    navigate("/organisation/location");
    loadLocation();
    setFormData({
      locationName: "",
      email: "",
      phone: "",
      faxNumber: "",
      locationHead: "",
      address: "",
      companyName: "",
    });
  };
  
  // const handlePhoneChange = (e) => {
  //   const value = e.target.value;
  //   setPhoneNumber(value);

  //   const isValid = /^\d{10}(-\d{1,4})?$/.test(value);
  //   setPhoneError(!isValid);
  // };

  const [faxError, setFaxError] = useState(false);

  

  // const handleEmailChange = (e) => {
  //   const inputEmail = e.target.value;
  //   setEmail(inputEmail);

  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   setIsEmailValid(emailRegex.test(inputEmail));
  // };
  const [addressError, setAddressError] = useState(false);



  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // handleClose();
  };

  useEffect(() => {
    loadLocation();
    fetchCompany(); // Moved fetchCompanies into useEffect
  }, []);

  const loadLocation = async () => {
    const result = await axios.get(
      "http://localhost:8081/location/get/location",
      {
        validateStatus: () => {
          return true;
        },
      }
    );
    setLocation(result.data);
  };

  console.log(location);

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

  console.log(formData);

  const handleDelete = async (id) => {
    console.log(id);
    await axios.delete(`http://localhost:8081/location/delete/${id}`);
    loadLocation();
  };

  const enforceMaxLength = (value, maxLength) => {
    return value.length <= maxLength ? value : value.slice(0, maxLength)
  }

  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <SideBar />
        <div className="head-foot-part">
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
                  style={{ height: "35px", marginBottom: "10px " }}
                >
                  {toggle ? (
                    <div className="hide">
                      <BiSolidHide />
                      HIDE
                    </div>
                  ) : (
                    <div className="add">
                      <MdAdd />
                      ADD LOCATION
                    </div>
                  )}
                </Button>
              </div>
            </div>

            <Collapse in={formVisible}>
              <Card
                variant="outlined"
                style={{ boxShadow: " 1px 1px 10px black" }}
              >
                <div style={{ marginTop: "20px" }}>
                  <h3
                    style={{
                      textAlign: "center",
                      marginTop: "25px",
                      fontWeight: "600",
                    }}
                  >
                    LOCATION
                  </h3>
                  <DialogContent>
                    <form onSubmit={handleSubmit}>
                      <div className="data-input-fields">
                      <TextField
                          id="companyName"
                          margin="dense"
                          select
                          label="Company Name"
                          fullWidth
                          defaultValue="Choose"
                          SelectProps={{
                            native: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={formData.companyName}
                          onChange={(e) => handleInputChange(e)}
                          name="companyName"
                        >
                          {company.map((option, index) => (
                            <option key={index} value={option.companyName}>
                                {option.companyName}
                              </option>
                          ))}
                        </TextField>

                        <TextField
                          margin="dense"
                          label="Location Head"
                          type="text"
                          fullWidth
                          name="locationHead"
                          id="locationHead"
                          value={formData.locationHead}
                          onChange={(e) => handleInputChange(e)}
                          required
                        />
                      </div>
                      <div className="data-input-fields">
                        <TextField
                          margin="dense"
                          label="Location"
                          type="text"
                          fullWidth
                          name="locationName"
                          id="locationName"
                          value={formData.locationName}
                          onChange={(e) => handleInputChange(e)}
                          required
                        />

                        <TextField
                          margin="dense"
                          label="Address"
                          type="text"
                          fullWidth
                          name="address"
                          id="address"
                          value={formData.address}
                          required
                          error={addressError}
                          helperText={addressError && "Address must be between 2 and 40 characters"}
                          inputProps={{ minLength: 2, maxLength: 40 }}
                          onInput={(e) => {
                            e.target.value = enforceMaxLength(e.target.value, 40);
                            handleInputChange(e);
                          }}
                        />
                      </div>

                      <div className="data-input-fields">
                        <TextField
                          margin="dense"
                          label="Email"
                          type="email"
                          fullWidth
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange(e)}
                          required
                          error={!isEmailValid}
                          helperText={!isEmailValid && "Please enter a valid email address."}
                        />

<TextField
                          margin="dense"
                          label="Phone"
                          type="number"
                          fullWidth
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange(e)}
                          required
                          error={phoneError}
                          helperText={phoneError ? "Invalid phone number" : ""}
                        />
                        
                        <TextField
                          margin="dense"
                          label="Fax Number"
                          type="number"  // Change the type to "text" to allow non-numeric characters
                          fullWidth
                          name="faxNumber"
                          id="faxNumber"
                          value={formData.faxNumber}
                          onChange={(e) => handleInputChange(e)}
                          required
                          error={faxError}
                          helperText={faxError ? "Invalid fax number (must be 10 digits)" : ""}
                        />
                      </div>

                      <div className="data-buttons">
                        <Button
                          type="submit"
                          onClick={saveLocation}
                          style={{
                            background:
                              "linear-gradient(to right, #1cb5e0, #000046)",
                            height: "35px",
                            width: "48%",
                            color: "white",
                            margin: "0 7px",
                          }}
                          variant="outlined"
                        >
                          Submit
                        </Button>
                        <Button
                          onClick={"/location"}
                          style={{
                            background:
                              "linear-gradient(to left, #1cb5e0, #000046)",
                            height: "35px",
                            width: "48%",
                            color: "white",
                            margin: "0 7px",
                          }}
                          variant="outlined"
                        >
                          Cancel
                        </Button>
                      </div>

                    </form>
                  </DialogContent>
                  {/* </Dialog> */}
                </div>
              </Card>
            </Collapse>
            <br />
            <table className="table table-bordered table-hover shadow">
              <thead>
                <tr className="text-center">
                  <th>Sl No</th>
                  <th>Company Name</th>
                  <th>Location Name</th>
                  <th>Email</th>
                  <th>Location Head</th>
                  <th>Address</th>
                  <th>Fax Number</th>
                  <th>Phone Number</th>
                  <th>Status</th>

                  <th colSpan="3">Action</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {location.map((item, index) => (
                  <tr key={location.id}>
                    <th scope="row" key={index}>
                      {index + 1}
                    </th>
                    <td>{item.companyName}</td>
                    <td>{item.locationName}</td>
                    <td>{item.email}</td>
                    <td>{item.locationHead}</td>
                    <td>{item.address}</td>
                    <td>{item.faxNumber}</td>
                    <td>{item.phone}</td>
                    <td>{item.status}</td>

                    <td className="mx-2">
                      <Link
                        to={`/edit-location/${item.locationId}`}
                        className="btn btn-warning"
                      >
                        <FaEdit />
                      </Link>
                    </td>
                    <td className="mx-2">
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item.locationId)}
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

export default LocationView;
