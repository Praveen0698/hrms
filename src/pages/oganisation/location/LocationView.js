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
  const [toggle, setToggle] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [company, setCompany] = useState([]);
  // const [selectedCompany, setSelectedCompany] = useState(""); // Fixed the capitalization here
  let navigate = useNavigate();
  // const onSelectCompany = (selectedCompany) => {
  //   setSelectedCompany(selectedCompany);
  //   navigate("/location");
  // };

  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

  const [location, setLocation] = useState([]);
  const [search, setSearch] = useState("");
  // const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    locationName: " ",
    email: " ",
    phone: " ",
    faxNumber: " ",
    locationHead: " ",
    address: " ",
    companyName: " ",
  });

  //   let {
  //     locationName,
  //     email,
  //     phone,
  //     faxNumber,
  //     locationHead,
  //     locationHrManager,
  //     address,
  //  companyName
  //   } = location;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      // companyName:selectedCompany
    });
  };

  const saveLocation = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:8081/location/create/location",
      formData
    );
    alert("Location saved successfully");
    navigate("/location");
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
                  style={{ height: "35px" }}
                >
                  {toggle ? (
                    <div>
                      <BiSolidHide
                        style={{ fontSize: "14px", marginRight: "3px" }}
                      />
                      HIDE
                    </div>
                  ) : (
                    <div>
                      <MdAdd style={{ fontSize: "14px", marginRight: "3px" }} />
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
                      <div style={{ display: "flex" }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-company-select-label">
                            Company Name
                          </InputLabel>
                          <Select
                            labelId="demo-company-select-label"
                            id="selectedCompany"
                            value={formData.companyName}
                            name="companyName"
                            label="Company Name"
                            onChange={(e) => handleInputChange(e)}
                            required
                          >
                            {company.map((item, index) => {
                              return (
                                <MenuItem key={index} value={item.companyName}>
                                  {item.companyName}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>

                        <TextField
                          margin="dense"
                          label="locationHead"
                          type="text"
                          fullWidth
                          name="locationHead"
                          id="locationHead"
                          value={formData.locationHead}
                          onChange={(e) => handleInputChange(e)}
                          required
                          style={{ margin: "0 3px" }}
                        />
                      </div>
                      <div style={{ display: "flex" }}>
                        <TextField
                          margin="dense"
                          label="location"
                          type="text"
                          fullWidth
                          name="locationName"
                          id="locationName"
                          value={formData.locationName}
                          onChange={(e) => handleInputChange(e)}
                          required
                          style={{ margin: "8px 3px" }}
                        />

                        <TextField
                          margin="dense"
                          label="address1"
                          type="text"
                          fullWidth
                          name="address"
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange(e)}
                          required
                          style={{ margin: "8px 3px" }}
                        />
                      </div>
                      {/* <TextField
                  margin="dense"
                  label="address2"
                  type="text"
                  fullWidth
                  name="address2"
                  id="address2"
                  value={address2}
                  onChange={(e) => handleInputChange(e)}
                  required
                  style={{ margin: "0 3px" }}
                />
              </div> */}

                      <div style={{ display: "flex" }}>
                        <TextField
                          margin="dense"
                          label="email"
                          type="email"
                          fullWidth
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange(e)}
                          required
                          style={{ margin: "8px 3px" }}
                        />
                        <TextField
                          margin="dense"
                          label="phone"
                          type="number"
                          fullWidth
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange(e)}
                          required
                          style={{ margin: "8px 3px" }}
                        />
                        <TextField
                          margin="dense"
                          label="faxnumber"
                          type="number"
                          fullWidth
                          name="faxNumber"
                          id="faxNumber"
                          value={formData.faxNumber}
                          onChange={(e) => handleInputChange(e)}
                          required
                          style={{ margin: "8px 3px" }}
                        />
                      </div>

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
