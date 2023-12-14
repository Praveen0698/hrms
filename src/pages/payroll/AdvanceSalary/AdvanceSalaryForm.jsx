import React, { useEffect } from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import * as api from "./api"
import { useNavigate } from 'react-router-dom';

import StateAdvanceSalary from './StateAdvanceSalary';

const AdvanceSalaryForm = () => {

    const navigate = useNavigate()

    const {setCompany, setLocation, dateError, setDateError,formData,setFormData,location,company,setFormVisible,setDepartment} = StateAdvanceSalary()

    const loadAdvanceSalary = async () => {
        const result = await api.loadAdvanceSalary()
        setDepartment(result);
      };

      useEffect(() => {
        loadAdvanceSalary()
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
    
      const saveAdvanceSalary = async () => {
    
        await api.saveAdvanceSalary(formData);
        alert("Department added successfully");
        navigate("/payroll/advanceSalary ");
        
        setFormData({
          createdDate: " ",
          employeeName: " ",
          salary: " ",
          advanceAmount: " ",
          salaryDue: " ",
          monthAndYear: " ",
        
        });
      };

      const handleSubmit = (e) => {
     
        loadAdvanceSalary();
      }

      const fetchCompany = async () => {
        const companyData = await api.fetchCompanies()
        setCompany(companyData)
      };
    
    
      const fetchLocation = async () => {
        const locationData = await api.fetchLocations()
        setLocation(locationData)
      };

     

  
    
    
  return (
    <form onSubmit={handleSubmit}>
    <div className="data-input-fields">
    <TextField
                    margin="dense"
                    label="Created Date"
                    type="date"
                    fullWidth
                    name="createdDate"
                    id="createdDate"
                    value={formData.createdDate}
                    onChange={(e) => handleInputChange(e)}
                    required
                    style={{ margin: "0 3px" }}
                  />
                  <TextField
                    margin="dense"
                    label="Employee Name"
                    type="text"
                    fullWidth
                    name="employeeName"
                    id="employeeName"
                    value={formData.employeeName}
                    onChange={(e) => handleInputChange(e)}
                    required
                    style={{ margin: "0 3px" }}
                  />
                </div>

                <div style={{ display: "flex" }}>
                <TextField
                    margin="dense"
                    label="Salary"
                    type="number"
                    fullWidth
                    name="salary"
                    id="salary"
                    value={formData.salary}
                    onChange={(e) => handleInputChange(e)}
                    required
                    style={{ margin: "8px 3px" }}
                  />
                  <TextField
                    margin="dense"
                    label="Advance Amount"
                    type="number"
                    fullWidth
                    name="advanceAmount"
                    id="advanceAmount"
                    value={formData.advanceAmount}
                    onChange={(e) => handleInputChange(e)}
                    required
                    style={{ margin: "8px 3px" }}
                  />
                  </div>
                  <div style={{ display: "flex" }}>
                  
                   <TextField
                    margin="dense"
                    label="Salary Month & Year"
                    type="date"
                    fullWidth
                    name="monthAndYear"
                    id="monthAndYear"
                    value={formData.monthAndYear}
                    onChange={(e) => handleInputChange(e)}
                    required
                    style={{ margin: "8px 3px" }}
                  />
                  <TextField
                    margin="dense"
                    label="Rest Salary Due"
                    type="number"
                    fullWidth
                    name="salaryDue"
                    id="salaryDue"
                    value={formData.salaryDue}
                    disabled
                    onChange={(e) => handleInputChange(e)}
                    required
                    style={{ margin: "8px 3px" }}
                  />

    </div>

    <div className="data-buttons">

      <Button id="input-btn"
        variant="outlined"
        type="submit"
        onClick={saveAdvanceSalary}

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

export default AdvanceSalaryForm