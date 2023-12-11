import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import SideBar from "../../../components/SideBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { MdAdd } from "react-icons/md";
import MenuItem from "@mui/material/MenuItem";


const PoliciesView = () => {

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, '0');
    const day = `${now.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [descriptionError,setDescriptionError]= useState(false);
  const [policies, setPolicies] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  let navigate = useNavigate();

  const onSelectCompany = (selectedCompany) => {
    setSelectedCompany(selectedCompany);
    navigate("/policies");
  };

  const [formData, setFormData] = useState({
    companyName: "",
    title: "",
    description: "",
    createdDate: " ",
    chooseFile: null,
    createdDate: getCurrentDate(),
  });

  const [titleError, setTitleError] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {

    const { name, value, files } = e.target;

    if (name === 'description') {
      const isValidDescription = value.length >= 2 && value.length <= 200;
      setDescriptionError(!isValidDescription);
    }

    if (name === "title") {
      // Validate title length (between 2 and 50 characters)
      const isValidLength = value.length >= 5 && value.length <= 30;
      setTitleError(!isValidLength);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'chooseFile' ? files[0] : value,


    }));

    if (name === 'createdDate') {
      
      const isValidDate = value === getCurrentDate();
      setDateError(!isValidDate);
    }


  };

  const [dateError, setDateError] = useState(false);


  

  const savePolicies = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      await axios.post(
        "http://localhost:8081/policies/create/policies",
        formDataToSend
      );

      navigate("/organisation/policies");
      loadPolicies();
      alert("Added Successfully");
      handleClose();
    } catch (error) {
      console.error("Error saving policies:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    handleClose();
  };

  useEffect(() => {
    loadPolicies();
    fetchCompany();
  }, []);

  const loadPolicies = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8081/policies/get/policies"
      );
      setPolicies(result.data);
    } catch (error) {
      console.error("Error loading expenses:", error);
    }
  };

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

  const handleDelete = async (id) => {
    try {
      console.log(id);
      await axios.delete(`http://localhost:8081/policies/delete/${id}`);
      loadPolicies();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
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
                  onClick={handleOpen}
                  style={{ height: "35px" }}
                >
                  <MdAdd style={{ fontSize: "14px", marginRight: "3px" }} />
                  ADD POLICIES
                </Button>
              </div>
            </div>
            <table className="table table-bordered table-hover shadow">
              <thead>
                <tr className="text-center">
                  <th>SL.</th>
                  <th>Company name</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {policies
                  .filter(
                    (st) =>
                      st.companyName &&
                      st.companyName.toLowerCase().includes(search)
                  )
                  .map((policies, index) => (
                    <tr key={policies.expenceId}>
                      <th scope="row" key={index}>
                        {index + 1}
                      </th>
                      <td>{policies.companyName}</td>
                      <td>{policies.title}</td>
                      <td>{policies.description}</td>
                      <td>{policies.status}</td>
                      <td className="mx-2">
                        <Link
                          to={`/policies-profile/${policies.policiesId}`}
                          className="btn btn-info"
                        >
                          <FaEye />
                        </Link>
                      </td>
                      <td className="mx-2">
                        <Link
                          to={`/edit-policies/${policies.policiesId}`}
                          className="btn btn-warning"
                        >
                          <FaEdit />
                        </Link>
                      </td>
                      <td className="mx-2">
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(policies.policiesId)}
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
                <h3 style={{ textAlign: "center", marginTop: "30px" }}>
                  POLICIES FORM
                </h3>
                <DialogContent>
                  <form onSubmit={handleSubmit}>
                    <div className="data-input-fields">
                      <TextField
                          id="companyName"
                          margin="dense"
                          select
                          label="CompanyName"
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
                            <MenuItem key={index} value={option.companyName}>
                              {option.companyName}
                            </MenuItem>
                          ))}
                        </TextField>

                      <TextField
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange(e)}
                        required
                        error={titleError}
                        helperText={titleError && "Title must be between 5 and 30 characters"}
                      />
                    </div>

                    <div className="data-input-fields">
                    <TextField
  margin="dense"
  label="Description"
  type="text"
  fullWidth
  name="description"
  id="description"
  value={formData.description}
  onChange={(e) => handleInputChange(e)}
  required
  error={descriptionError}
  helperText={descriptionError && 'Please enter a description between 2 and 200 characters.'}
/>

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

                    </div>

                    <TextField
                      margin="dense"
                      label="Policy Form"
                      type="file"
                      fullWidth
                      name="chooseFile"
                      id="chooseFile"
                      onChange={(e) => handleInputChange(e)}
                      accept=".pdf"
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />

                    <DialogActions>
                      <Button
                        type="submit"
                        onClick={savePolicies}
                        style={{
                          background:
                            "linear-gradient(to right, #1cb5e0, #000046)",
                          height: "35px",
                          width: "100%",
                          color: "white",
                        }}
                        variant="outlined"
                      >
                        Submit
                      </Button>
                      <Button
                        onClick={handleClose}
                        style={{
                          background:
                            "linear-gradient(to left, #1cb5e0, #000046)",
                          height: "35px",
                          width: "100%",
                          color: "white",
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
        </div>
      </div>
    </div>
  );
};

export default PoliciesView;
