import React, { useEffect } from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import * as api from "./api"
import { useNavigate,useState } from 'react-router-dom';
import StateDepartment from './StateDepartment';

const DepartmentForm = () => {

    const navigate = useNavigate()

    const {setCompany, setLocation, dateError, setDateError,formData,setFormData,location,company,setFormVisible,setDepartment} = StateDepartment()

    const loadDepartment = async () => {
        const result = await api.loadDepartment()
        setDepartment(result);
      };

      useEffect(() => {
        loadDepartment()
        fetchCompany();
        fetchLocation();
      },[])

      const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = `${now.getMonth() + 1}`.padStart(2, '0');
        const day = `${now.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
    
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'createdDate') {
          const isValidDate = value === getCurrentDate();
          setDateError(!isValidDate);
        }
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
          [name]: value,
        });
      };
    
      const saveDepartment = async () => {
    
        await api.saveDepartment(formData);
        alert("Department added successfully");
        navigate("/organisation/department ");
        
        setFormData({
          locationName: "",
          departmentName: "",
          companyName: "",
          locationName: "",
          departmentHead: "",
          createdDate: "",
        });
      };

      const handleSubmit = (e) => {
     
        loadDepartment();
      }

      const fetchCompany = async () => {
        const companyData = await api.fetchCompanies()
        setCompany(companyData)
      };
    
    
      const fetchLocation = async () => {
        const locationData = await api.fetchLocations()
        setLocation(locationData)
      };

      const Head = [
        {
          value: "Choose",
          label: "Select Depatment Name",
        },
        {
          value: "Sarmistha Jena",
          label: "Sarmistha Jena",
        },
        {
          value: "Sumit Rana",
          label: "Sumit Rana",
        },
        {
          value: "Smruti Sourav",
          label: "Smruti Sourav",
        },
        {
          value: "Pritam Behera",
          label: "Pritam Behera",
        },
        {
          value: "Praveen Kumar",
          label: "Praveen Kumar",
        },
        {
          value: "Hrushikesh Jena",
          label: "Hrushikesh Jena",
        },
        {
          value: "Subhashree Das",
          label: "Subhashree Das",
        },
      ];
    
      const Type = [
        {
          value: "Choose",
          label: "Select Depatment Name",
        },
        {
          value: "Human Resources Department",
          label: "Human Resources Department",
        },
        {
          value: "Marketing Department",
          label: "Marketing Department",
        },
        {
          value: "Finance Department",
          label: "Finance Department",
        },
        {
          value: "Information Technology Department",
          label: "Information Technology Department",
        },
        {
          value: "Customer Service Department",
          label: "Customer Service Department",
        },
        {
          value: "Research and Development Department",
          label: "Research and Development Department",
        },
        {
          value: "Legal Department",
          label: "Legal Department",
        },
      ];

  
    
    
  return (
    <form onSubmit={handleSubmit}>
    <div className="data-input-fields">
      <TextField
        id="departmentName"
        margin="dense"
        select
        label="Department Name"
        fullWidth
        defaultValue="Choose"
        SelectProps={{
          native: true,
        }}
        InputLabelProps={{
          shrink: true,
        }}
        value={formData.departmentName}
        onChange={(e) => handleInputChange(e)}
        name="departmentName"
      >
        {Type.map((option, index) => (
          <option key={index} value={option.label}>
            {option.label}
          </option>
        ))}
      </TextField>

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
        {
          company.map((option, index) => (
            <option key={index} value={option.companyName}>
              {option.companyName}
            </option>
          ))}
      </TextField>
    </div>
    <div className="data-input-fields">
      <TextField
        id="departmentHead"
        margin="dense"
        select
        label="Department Head"
        fullWidth
        defaultValue="Choose"
        SelectProps={{
          native: true,
        }}
        InputLabelProps={{
          shrink: true,
        }}
        value={formData.departmentHead}
        onChange={(e) => handleInputChange(e)}
        name="departmentHead"
      >
        {Head.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>

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
        id="locationName"
        margin="dense"
        select
        label="Location Name"
        fullWidth
        defaultValue="Choose"
        SelectProps={{
          native: true,
        }}
        InputLabelProps={{
          shrink: true,
        }}
        value={formData.locationName}
        onChange={(e) => handleInputChange(e)}
        name="locationName"
      >
        {location.map((option, index) => (

          <option key={index} value={option.locationName}>
            {option.locationName}
          </option>
        ))}
      </TextField>


    </div>

    <div className="data-buttons">

      <Button id="input-btn"
        variant="outlined"
        type="submit"
        onClick={saveDepartment}

      >
        Submit
      </Button>
      <Button id="input-btn"
        variant="outlined"
        onClick={() => setFormVisible(false)}

      >
        Cancel
      </Button>
    </div>


  </form>
  )
}

export default DepartmentForm