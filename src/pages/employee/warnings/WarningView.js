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
import Header from '../../../components/Header';
import SideBar from "../../../components/SideBar";

const WarningView = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [descriptionError,setDescriptionError]= useState(false);
  const [ warningError,setWarningError] = useState(false);
  const[subjectError, setSubjectError] = useState(false);
  const [warning, setwarning] = useState(false);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    warningId: "",
    warningToEmployee: "",
    warningType: "",
    subject: "",
    warningByEmployee: "",
    warningDate: "",
    description: "",
  });

  const {
    warningId,
    warningToEmployee,
    warningType,
    subject,
    warningByEmployee,
    warningDate,
    description,
  } = warning;
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
    const { name, value} = e.target;

    if(name === 'subject' ){
      const isValidSubject = value.length >= 2 && value.length <= 100;
      setSubjectError(!isValidSubject);

    }

    if(name === 'warningByEmployee' ){
      const isValidWarning = value.length >= 2 && value.length <= 60;
      setWarningError(!isValidWarning);

    }

    if (name === 'description') {
      const isValidDescription = value.length >= 2 && value.length <= 200;
      setDescriptionError(!isValidDescription);
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      [name] : value,

    });
  };

  const saveWarning = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8083/warning/create/warning", formData);
    alert('Warning added successfully');
    navigate("/warning");
    loadwarning();
    setFormData({
      warningId: "",
    warningToEmployee: "",
    warningType: "",
    subject: "",
    warningByEmployee: "",
    warningDate: "",
    description: "",
      

    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    handleClose();
  };

  useEffect(() => {
    loadwarning();
  }, []);

  const loadwarning = async () => {
    const result = await axios.get(
      "http://localhost:8083/warning/get/warning",
      {
        validateStatus: () => {
          return true;
        },
      }
    );
    setwarning(result.data);
    console.log(result.data);
  };

  const handleDelete = async (id) => {
    console.log(id);
    await axios.delete(`http://localhost:8083/warning/delete/${id}`);
    loadwarning();
  };

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
        <span style={{ fontSize: "18px" }}>warning</span>
      </p>
      <div
        className="above-table"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
       
        <Button
          variant="outlined"
          onClick={handleOpen}
          style={{ height: "35px" }}
        >
          <MdAdd style={{ fontSize: "14px", marginRight: "3px" }} />
          Add warning
        </Button>
      </div>
      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr className="text-center">
            <th>Warning ID</th>
            <th>warning to employee</th>
            <th>warning type</th>
            <th>Subject</th>
            <th>Warning by employee</th>
            <th>Warning date</th>
            <th>Description</th>
            <th colSpan="3">Actions</th>
          </tr>
        </thead>

        <tbody className="text-center">
         
            
            
              <tr key={warning.id}>
                {/* <th scope="row" key={index}>
                  {index + 1}
                </th> */}
                <td>{warning.warningId}</td>
                <td>{warning.warningToEmployee}</td>
                <td>{warning.warningType}</td>
                <td>{warning.subject}</td>
                <td>{warning.warningByEmployee}</td>
                <td>{warning.warningDate}</td>
                <td>{warning.description}</td>
                <td className="mx-2">
                  <Link
                    to={`/warning-profile/${warning.warningId}`}
                    className="btn btn-info"
                  >
                    <FaEye />
                  </Link>
                </td>
                <td className="mx-2">
                  <Link
                    to={`/edit-warning/${warning.warningId}`}
                    className="btn btn-warning"
                  >
                    <FaEdit />
                  </Link>
                </td>
                <td className="mx-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(warning.warningId)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            
        </tbody>
      </table>

      <div>
        <Dialog open={open} onClose={handleClose}>
         
          <h3
            style={{
              textAlign: "center",
              marginTop: "25px",
              fontWeight: "600",
            }}
          >
            WARNING
          </h3>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <div className="data-input-fields">
              <TextField
                margin="dense"
                label="Warning ID"
                type="text"
                fullWidth
                name="warningId"
                id="warningId"
                value={warningId}
                onChange={(e) => handleInputChange(e)}
                required
               
              />

              
              
              <TextField
              margin="dense"
                label="Warning to employee"
                type="text"
                fullWidth
                name="warningToEmployee"
                id="warningToEmployee"
                value={formData.warningToEmployee}
                onChange={(e) => handleInputChange(e)}
                required
              >
                
              </TextField>
              </div>

              <div className="data-input-fields">
              <TextField
                margin="dense"
                label="Warning Type"
                type="text"
                fullWidth
                name="warningType"
                id="warningType"
                value={formData.warningType}
                onChange={(e) => handleInputChange(e)}
                required
                error={warningError}
  helperText={warningError && 'Please enter a warning text between 2 and 100 characters.'}
                
              />
              <TextField
                margin="dense"
                label="Subject"
                type="text"
                fullWidth
                name="subject"
                id="subject"
                value={formData.subject}
                onChange={(e) => handleInputChange(e)}
                required
                error={subjectError}
  helperText={subjectError && 'Please enter a subject between 2 and 100 characters.'}


                
              />
              </div>
              <div style={{display:"flex"}}>
              <TextField
                margin="dense"
                label="Warning By Employee"
                type="text"
                fullWidth
                name="warningByEmployee"
                id="warningByEmployee"
                value={formData.warningByEmployee}
                onChange={(e) => handleInputChange(e)}
                required
                error={warningError}
  helperText={warningError && 'Please enter a description between 2 and 200 characters.'}
                
              />
              <TextField
                margin="dense"
                label="Warning date"
                type="date"
                fullWidth
                name="warningDate"
                id="warningDate"
                value={formData.warningDate}
                onChange={(e) => handleInputChange(e)}
                required
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
                value={formData.description}
                onChange={(e) => handleInputChange(e)}
                required
                error={descriptionError}
  helperText={descriptionError && 'Please enter a description between 2 and 200 characters.'}
                
              />
              <div className="data-buttons">
              <DialogActions className="dialog">
              <Button id="input-btn"
                  type="submit"
                  onClick={saveWarning}
                 
                  variant="outlined"
                >
                  Submit
                </Button>
                <Button id="input-btn"
                   onClick={() => setFormVisible(false)}
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

export default WarningView;

