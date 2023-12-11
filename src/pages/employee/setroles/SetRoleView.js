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

const SetRoleView = () => {
  const [setRole, setsetRole] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    roleId: "",
    roleName: "",
    selectAccess: "",
  });

  const {
    roleId,
    roleName,
    selectAccess,
  } = setRole;
  // name: '',
  // email: '',
  // message: '',
  const access = [
    {
      value: "Exempt Organization",
      label: "Exempt Organization"
    },
    {
      value: "Partnership",
      label: "Partnership"
    },
    {
      value: "Private Foundation",
      label: "Private Foundation"
    },
    {
      value: "Limited Liability Company",
      label: "Limited Liability Company"
    }
  ]
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

  const saveSetRole = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8083/setRole/create/setRole", formData);
    alert('Role added successfully');
    navigate("/setRole");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    handleClose();
  };

  useEffect(() => {
    loadsetRole();
  }, []);

  const loadsetRole = async () => {
    const result = await axios.get(
      "http://localhost:8083/setRole/get/setRole",
      {
        validateStatus: () => {
          return true;
        },
      }
    );
    setsetRole(result.data);
    console.log(result.data);
  };

  const handleDelete = async (id) => {
    console.log(id);
    await axios.delete(`http://localhost:8083/setRole/delete/${id}`);
    loadsetRole();
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
        <span style={{ fontSize: "18px" }}>setRole</span>
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
          Add setRole
        </Button>
      </div>
      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr className="text-center">
            <th>Role ID</th>
            <th>Role Name</th>
            <th>Select Access</th>
            <th colSpan="3">Actions</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {setRole
            .filter(
              (st) =>
                st.setRoleName && st.setRoleName.toLowerCase().includes(search)
            )
            .map((setRole, index) => (
              <tr key={setRole.id}>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{setRole.setRoleName}</td>
                <td>{setRole.setRoleType}</td>
                <td>{setRole.email}</td>
                <td>{setRole.website}</td>
                <td className="mx-2">
                  <Link
                    to={`/setRole-profile/${setRole.setRoleId}`}
                    className="btn btn-info"
                  >
                    <FaEye />
                  </Link>
                </td>
                <td className="mx-2">
                  <Link
                    to={`/edit-setRole/${setRole.setRoleId}`}
                    className="btn btn-warning"
                  >
                    <FaEdit />
                  </Link>
                </td>
                <td className="mx-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(setRole.setRoleId)}
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
            SET ROLE
          </h3>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <div className="data-input-fields">
              <TextField
                margin="dense"
                label="Role ID"
                type="text"
                fullWidth
                name="roleId"
                id="roleId"
                value={roleId}
                onChange={(e) => handleInputChange(e)}
                required
                
              />

              <TextField
                margin="dense"
                label="Role name"
                type="text"
                fullWidth
                name="roleName"
                id="roleName"
                value={roleName}
                onChange={(e) => handleInputChange(e)}
                required
                
              />
              </div>

              <div className="data-input-fields">

              <TextField
                id="selectAccess"
                select
                margin="dense"
                label="Select Acess"
                fullWidth
                defaultValue="EUR"
                SelectProps={{
                  native: true,
                }}
                value={selectAccess}
                onChange={(e) => handleInputChange(e)}
                name="selectAccess"
                
              >
                {access.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              </div>

              <div className="data-buttons">
              <DialogActions  className="dialog" >
              <Button id="input-btn"
                  type="submit"
                  onClick={saveSetRole}
                 
                  variant="outlined"
                >
                  Submit
                </Button>
                <Button id="input-btn"
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

export default SetRoleView;

