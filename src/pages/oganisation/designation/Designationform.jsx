import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import StateDesignation from './StateDesignation'
import * as api from './DesignationApi'

const Designationform = () => {
    const {dateError,setDateError,department,setDepartment,setOpen,formData,setFormData} = StateDesignation()
    let navigate = useNavigate();

    const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = `${now.getMonth() + 1}`.padStart(2, '0');
        const day = `${now.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const handleClose = () => {
        setOpen(false);
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
        });
      };

      useEffect(() => {
        fetchDepartment()
      })

      const fetchDepartment = async () => {
        const response = await api.fetchDepartment()
        setDepartment(response);
    
      }

      const saveDesignation = async () => {
        await api.saveDesignation(formData)
        alert("Designation is added successfully");
        navigate("/organisation/designation");
     
        handleClose();
      };
    
      const handleSubmit = (e) => {
      
        handleClose();
      };
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
                        {department.map((option,index) => (
                              <option key={index} value={option.departmentName}>
                                {option.departmentName}
                              </option>
                            ))}
                          
                        </TextField>
                        


                    <TextField
                      margin="dense"
                      label="Designation "
                      type="text"
                      fullWidth
                      name="designationName"
                      value={formData.designationName}
                      onChange={(e) => handleInputChange(e)}
                      required
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
                 

                    <DialogActions>
                      <div className="data-buttons">
                        <Button
                          type="submit"
                          onClick={saveDesignation}
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
                      </div>
                    </DialogActions>
                  </form>

  )
}

export default Designationform