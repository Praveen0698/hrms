import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
//import Search from "../../common/Search";
import Button from "@mui/material/Button";
import "../../../../src/styles.css";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { MdAdd } from "react-icons/md";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import { Card } from "@mui/material";
import Header from "../../../components/Header";
import SideBar from "../../../components/SideBar";

const CompanyView = () => {

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, '0');
    const day = `${now.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [dateError, setDateError] = useState("");
  const[websiteError,setWebsiteError] =useState("");
  const [isValidCIN, setIsValidCIN] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isValidGSTNumber, setIsValidGSTNumber] = useState(true);
  const [isValidUANNumber, setIsValidUANNumber] = useState(true);
  const [phoneError, setPhoneError] = useState(false);  
  const [formVisible, setFormVisible] = useState(false);
  const [toggle, setToggle] = useState(false);
  let navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    companyName: " ",
    companyType: " ",
    legalOrTradingName: " ",
    address: " ",
    registrationNumber: " ",
    contactNumber: " ",
    email: " ",
    website: " ",
    city: " ",
    state: " ",
    zipCode: " ",
    country: " ",
    cin: " ",
    gst: " ",
    uan: " ",
    createdDate: " ",
    uploadLogo: " ",
    createdDate: getCurrentDate(),
  });

  const { uploadLogo } = company;

  const Type = [
    {
      value: "Choose",
      label: "Select Company Type",
    },
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
      value: "Limited Liability",
      label: "Limited Liability",
    },
    {
      value: "Non-profit Organization",
      label: "Non-profit Organization",
    },
    {
      value: "Proprietorship",
      label: "Proprietorship",
    },
  ];

  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    
    
    const isValidGST = (value) => {
      // GST format: 2 characters followed by 10 digits
      const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}[A-Z]{1}[0-9A-Z]{1}$/;
      return gstRegex.test(value);
    };

    const isValidUAN = (value) => {
      // UAN format: 12 digits
      const uanRegex = /^[0-9]{12}$/;
      return uanRegex.test(value);
    };

    const isValidURL = (url) => {
      // Simple URL validation using a regular expression
      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
      return urlRegex.test(url);
    };

    if (name === "uan") {
      const isValidUANNumber = isValidUAN(value);
    setIsValidUANNumber(isValidUANNumber);

    }

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsEmailValid(emailRegex.test(value));
    }
    if (name === 'cin') {
      const isValidCIN = /^[a-zA-Z0-9]{21}$/.test(value);
      setIsValidCIN(isValidCIN);
    }

    if (name === 'contactNumber') {
      // Validate phone number format
      const isValidPhoneNumber = /^\d{10}(-\d{1,4})?$/.test(value);
      setPhoneError(!isValidPhoneNumber);
    }
    if (name === "gst") {
      const isValidGSTNumber = isValidGST(value);
    setIsValidGSTNumber(isValidGSTNumber);
    }

    if (name === 'website') {
      // Validate the website format
      const isValidWebsite = isValidURL(value);
      setWebsiteError(!isValidWebsite);}
    if (name === 'createdDate') {
      const isValidDate = value === getCurrentDate();
      setDateError(!isValidDate);
    }

    if (name === "uploadLogo") {
      setFormData({
        ...formData,
        [name]: e.target.files[0], // Use e.target.files to get the file object
      });
    } else if (name === "companyName") {
      const truncatedValue = enforceMaxLength(value, 50);
      handleNameChange(truncatedValue);
      setFormData({
        ...formData,
        [name]: truncatedValue,
      });
    } else if (name === "address") {
      const truncatedValue = enforceMax(value, 50);
      handleAddressChange(truncatedValue);
      setFormData({
        ...formData,
        [name]: truncatedValue,
      });
    } else if (name === "zipCode") {
      const truncatedValue = enforceMaxCode(value, 8);
      handleCodeChange(truncatedValue);
      setFormData({
        ...formData,
        [name]: truncatedValue,
      });
    }

    
   else {
      setFormData({
        ...formData,
        [name]: value,
      });
    } 
  };
  const [zipCode, setZipCode] = useState("");
  const [errorCode, setErrorCode] = useState("");
  const handleCodeChange = (valueCode) => {
    if (valueCode.length < 6 || valueCode.length > 8) {
      setErrorCode("Invalid length. Length should be between 6 and 8.");
    } else {
      setErrorCode("");
    }
    setZipCode(valueCode);
  };
  const enforceMaxCode = (valueCode, maxLength) => {
    return valueCode.length <= maxLength
      ? valueCode
      : valueCode.slice(0, maxLength);
  };

  


  const [companyName, setCompanyName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const handleNameChange = (value) => {
    if (value.length < 2 || value.length > 50) {
      setErrorMsg(
        "Invalid name length. Name length should be between 2 and 50."
      );
    } else {
      setErrorMsg("");
    }
    setCompanyName(value);
  };
  const enforceMaxLength = (value, maxLength) => {
    return value.length <= maxLength ? value : value.slice(0, maxLength);
  };

  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");

  const handleAddressChange = (valueAddress) => {
    if (valueAddress.length < 2 || valueAddress.length > 50) {
      setAddressError(
        "Invalid name length. Name length should be between 2 and 50."
      );
    } else {
      setAddressError("");
    }
    setAddress(valueAddress);
  };
  const enforceMax = (valueAddress, maxLength) => {
    return valueAddress.length <= maxLength
      ? valueAddress
      : valueAddress.slice(0, maxLength);
  };

  const saveCompany = async (e) => {
    // e.preventDefault();

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });




      await axios.post(
        "http://localhost:8081/company/create/company",
        formDataToSend
      );
      alert("Company added successfully");
      navigate("/organisation/company");
      loadCompany();
      setFormData({
        companyName: " ",
        companyType: " ",
        legalOrTradingName: " ",
        address: " ",
        registrationNumber: '',
        contactNumber: " ",
        email: " ",
        website: " ",
        city: " ",
        state: " ",
        zipCode: '',
        country: " ",
        cin: "",
        gst: "",
        uan: "",
        createdDate: " ",
      });
    } catch (error) {
      console.error("Error creating company:", error.response.data);
      alert("Error creating company. Please check the console for details.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // handleClose();
  };

  useEffect(() => {
    loadCompany();
  }, []);

  const loadCompany = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8081/company/get/company",
        {
          validateStatus: () => {
            return true;
          },
        }
      );
      setCompany(result.data);
    } catch (error) {
      console.error("Error loading companies:", error.response.data);
      // Handle error as needed
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    await axios.delete(`http://localhost:8081/company/delete/${id}`);
    loadCompany();
  };

  console.log(formData);
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
                  style={{ height: "35px", marginBottom: "10px" }}
                >
                  {toggle ? (
                    <div className="hide">
                      <BiSolidHide />
                      HIDE
                    </div>
                  ) : (
                    <div className="add">
                      <MdAdd />
                      ADD COMPANY
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
                    COMPANY
                  </h3>
                  <DialogContent>
                    <form onSubmit={handleSubmit}>
                      <div className="data-input-fields">
                        <TextField
                          margin="dense"
                          label="Company Name"
                          type="text"
                          fullWidth
                          name="companyName"
                          id="companyName"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange(e)}
                          required
                          error={errorMsg !== ""}
                          helperText={errorMsg}
                        />

                        <TextField
                          id="companyType"
                          margin="dense"
                          select
                          label="Company Type"
                          fullWidth
                          defaultValue="Choose"
                          SelectProps={{
                            native: true,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={formData.companyType}
                          onChange={(e) => handleInputChange(e)}
                          name="companyType"
                        >
                          {Type.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </TextField>
                      </div>

                      <div className="data-input-fields">
                        <TextField
                          margin="dense"
                          label="Legal/Trading Name"
                          type="text"
                          fullWidth
                          name="legalOrTradingName"
                          id="Legal Or TradingName"
                          value={formData.legalOrTradingName}
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
                          onChange={(e) => handleInputChange(e)}
                          required
                          error={addressError !== ""}
                          helperText={addressError}
                        />
                        <TextField
                          margin="dense"
                          label="Registration Number"
                          type="text"
                          fullWidth
                          name="registrationNumber"
                          id="registrationNumber"
                          value={formData.registrationNumber}
                          onChange={(e) => handleInputChange(e)}
                          required
                        />
                        
                        <TextField
  margin="dense"
  label="CIN Number"
  type="text"
  fullWidth
  name="cin"
  id="cin"
  value={formData.cin}
  onChange={(e) => handleInputChange(e)}
  required
  error={!isValidCIN}
  helperText={!isValidCIN && 'Please enter a valid CIN number.'}
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
      onChange={handleInputChange}
      required
      error={!isEmailValid}
      helperText={!isEmailValid ? 'Please enter a valid email address.' : ''}
    />
                         <TextField
      margin="dense"
      label="Contact Number"
      type="tel"
      fullWidth
      name="contactNumber"
      id="contactNumber"
      value={formData.contactNumber}
      onChange={(e) => handleInputChange(e)}
      required
      error={phoneError}
      helperText={phoneError ? 'Invalid phone number' : ''}
    />
                       <TextField
  margin="dense"
  label="Website"
  type="text"
  fullWidth
  name="website"
  id="website"
  value={formData.website}
  onChange={(e) => handleInputChange(e)}
  required
  error={websiteError}
  helperText={websiteError && 'Please enter a valid website URL.'}
/>
                      </div>
                      <div className="data-input-fields">
                       
                      <TextField
  margin="dense"
  label="GST Number"
  type="text"
  fullWidth
  name="gst"
  id="gst"
  value={formData.gst}
  onChange={(e) => handleInputChange(e)}
  required
  error={!isValidGSTNumber}
  helperText={!isValidGSTNumber && "Please enter a valid GST number."}
/>


<TextField
  margin="dense"
  label="UAN Number"
  type="text"
  fullWidth
  name="uan"
  id="uan"
  value={formData.uan}
  onChange={(e) => handleInputChange(e)}
  required
  error={!isValidUANNumber}
  helperText={!isValidUANNumber && "Please enter a valid UAN number."}
/>
                      </div>

                      <div className="data-input-fields">
                        <TextField
                          margin="dense"
                          label="City"
                          type="text"
                          fullWidth
                          name="city"
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange(e)}
                          required
                        />
                        <TextField
                          margin="dense"
                          label="State"
                          type="text"
                          fullWidth
                          name="state"
                          id="state"
                          value={formData.state}
                          onChange={(e) => handleInputChange(e)}
                          required
                        />

                        <TextField
                          margin="dense"
                          label="Country"
                          type="text"
                          fullWidth
                          name="country"
                          id="country"
                          value={formData.country}
                          onChange={(e) => handleInputChange(e)}
                          required
                        />
                        <TextField
                          margin="dense"
                          label="Zipcode"
                          type="number"
                          fullWidth
                          name="zipCode"
                          id="zipCode"
                          value={zipCode}
                          onChange={(e) => handleInputChange(e)}
                          required
                          error={errorCode !== ""}
                          helperText={errorCode}
                        />
                      </div>

                      <div className="data-input-fields">
                      <TextField
                        margin="dense"
                        label="Create Date"
                        type="date"
                        fullWidth
                        name="createdDate"
                        id="createdDate"
                        value={formData.createdDate}
                        onChange={(e) => handleInputChange(e)}
                        required
                        error={dateError}
                        helperText={dateError && "Please select the current date"}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                        <TextField
                          margin="dense"
                          label="Company Logo"
                          type="file"
                          fullWidth
                          name="uploadLogo"
                          id="uploadLogo"
                          value={uploadLogo}
                          onChange={(e) => handleInputChange(e)}
                          required
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </div>
                      <div className="data-buttons">
                        <Button
                          id="input-btn"
                          className="submit"
                          type="submit"
                          onClick={saveCompany}
                          variant="outlined"
                        >
                          Submit
                        </Button>
                        <Button
                          id="input-btn"
                          className="cancel"
                          onClick={() => setFormVisible(false)}
                          variant="outlined"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <br />

            <table className="table table-bordered table-hover shadow">
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>Company Name</th>
                  <th>Company Type</th>
                  <th>Email</th>
                  <th>Contact Number</th>
                  <th>CIN</th>
                  <th>GST</th>
                  <th>UAN</th>
                  <th colSpan="3">Actions</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {/* <tr>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td className="mx-2">
              <Link
                to={`/organisation/companyprofile/${company.companyId}`}
                className="btn btn-info"
              >
                <FaEye />
              </Link>
            </td>
            <td className="mx-2">
              <Link
                to={`/organisation/editcompany/${company.companyId}`}
                className="btn btn-warning"
              >
                <FaEdit />
              </Link>
            </td>
            <td className="mx-2">
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(company.companyId)}
              >
                <FaTrashAlt />
              </button>
            </td>
          </tr> */}
                {company.length > 0 &&
                  company
                    .filter(
                      (st) =>
                        st.companyName &&
                        st.companyName.toLowerCase().includes(search)
                    )
                    .map((company, index) => (
                      <tr key={company.id}>
                        <th scope="row" key={index}>
                          {index + 1}
                        </th>
                        <td>{company.companyName}</td>
                        <td>{company.companyType}</td>
                        <td>{company.email}</td>
                        <td>{company.contactNumber}</td>
                        <td>{company.cin}</td>
                        <td>{company.gst}</td>
                        <td>{company.uan}</td>
                        <td className="mx-2">
                          <Link
                            to={`/organisation/editcompany/${company.companyId}`}
                            className="btn btn-info"
                          >
                            <FaEye />
                          </Link>
                        </td>
                        <td className="mx-2">
                          <Link
                            to={`/edit-company/${company.companyId}`}
                            className="btn btn-warning"
                          >
                            <FaEdit />
                          </Link>
                        </td>
                        <td className="mx-2">
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(company.companyId)}
                          >
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
            <div></div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CompanyView;
