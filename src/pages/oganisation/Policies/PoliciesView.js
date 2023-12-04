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
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { MdAdd } from "react-icons/md";

const PoliciesView = () => {
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
  });

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

  const savePolicies = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8083/policies/create/policies",
        formData
      );
      navigate("/policies");
      loadPolicies();
      alert("Added Successfully");
      handleClose();
    } catch (error) {
      console.error("Error saving expenses:", error);
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
        "http://localhost:8083/policies/get/policies"
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
      console.log(response.data); // Log the response data
      setCompany(response.data);
    } catch (error) {
      console.error("Error fetching department data", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log(id);
      await axios.delete(`http://localhost:8083/policies/delete/${id}`);
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
                  {/* <th>Purchased By</th>
            <th>Remarks</th> */}
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
                      {/* <td>{expense.purchaseBy}</tdies
                <td>{expense.remarks}</td> */}
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
                    <div style={{ display: "flex" }}>
                      <select
                        value={setSelectedCompany}
                        onChange={(e) => onSelectCompany(e.target.value)}
                      >
                        <option value="" disabled>
                          Select company Name
                        </option>
                        {company.map((company) => (
                          <option
                            key={company.companyId}
                            value={company.companyName}
                          >
                            {company.companyName}
                          </option>
                        ))}
                        <option value="addCompany">+Add Company</option>
                      </select>

                      <TextField
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        style={{ margin: "0px 3px" }}
                      />
                    </div>

                    <TextField
                      margin="dense"
                      label="Description"
                      type="text"
                      fullWidth
                      name="description"
                      id="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                    <TextField
                      margin="dense"
                      type="file"
                      fullWidth
                      name="chooseFile"
                      id="chooseFile"
                      value={formData.chooseFile}
                      onChange={handleInputChange}
                      required
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
