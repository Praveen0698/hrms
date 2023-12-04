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
  const [formVisible, setFormVisible] = useState(false);
  const [toggle, setToggle] = useState(false);

  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

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

  const handleInputChange = (e) => {
    if (e.target.name === "uploadLogo") {
      setFormData({
        ...formData,
        uploadLogo: e.target.files[0], // Use e.target.files to get the file object
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const saveCompany = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8081/company/create/company", formData);

    alert("Company added successfully");
    navigate("/company");
    loadCompany();
    setFormData({
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
    });

    // try {
    //   console.log("Form Data:", formData);

    // const {
    //   companyName,
    //   companyType,
    //   legalOrTradingName,
    //   address,
    //   registrationNumber,
    //   contactNumber,
    //   email,
    //   website,
    //   city,
    //   state,
    //   zipCode,
    //   country,
    //   cin,
    //   gst,
    //   uan,
    //   createdDate,
    //   uploadLogo,
    // } = formData;

    // const formDataToSend = new FormData();
    // formDataToSend.append("companyName", companyName);
    // formDataToSend.append("companyType", companyType);
    // formDataToSend.append("legalOrTradingName", legalOrTradingName);
    // formDataToSend.append("address", address);
    // formDataToSend.append("registrationNumber", registrationNumber);
    // formDataToSend.append("contactNumber", contactNumber);
    // formDataToSend.append("email", email);
    // formDataToSend.append("website", website);
    // formDataToSend.append("city", city);
    // formDataToSend.append("state", state);
    // formDataToSend.append("zipCode", zipCode);
    // formDataToSend.append("country", country);
    // formDataToSend.append("cin", cin);
    // formDataToSend.append("gst", gst);
    // formDataToSend.append("uan", uan);
    // formDataToSend.append("createdDate", createdDate);
    // formDataToSend.append("uploadLogo", uploadLogo);

    // } catch (error) {
    //   console.error("Error creating company:", error.response.data);
    //   alert("Error creating company. Please check the console for details.");
    // }
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
    const result = await axios.get(
      "http://localhost:8081/company/get/company",
      {
        validateStatus: () => {
          return true;
        },
      }
    );
    // console.log(result.data);
    setCompany(result.data);
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
              {/* <Search search={search} setSearch={setSearch} /> */}
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
                          id="legalOrTradingName"
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
                        />
                        <TextField
                          margin="dense"
                          label="Contact Number"
                          type="number"
                          fullWidth
                          name="contactNumber"
                          id="contactNumber"
                          value={formData.contactNumber}
                          onChange={(e) => handleInputChange(e)}
                          required
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
                        />
                      </div>
                      <div className="data-input-fields">
                        <TextField
                          margin="dense"
                          label="GST"
                          type="text"
                          fullWidth
                          name="gst"
                          id="gst"
                          value={formData.gst}
                          onChange={(e) => handleInputChange(e)}
                          required
                        />
                        <TextField
                          margin="dense"
                          label="UAN"
                          type="text"
                          fullWidth
                          name="uan"
                          id="uan"
                          value={formData.uan}
                          onChange={(e) => handleInputChange(e)}
                          required
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
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange(e)}
                          required
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
                          className="submit"
                          type="submit"
                          onClick={saveCompany}
                          variant="outlined"
                        >
                          Submit
                        </Button>
                        <Button
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
                            to={`/company-profile/${company.companyId}`}
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
