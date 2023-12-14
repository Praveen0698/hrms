import React, { useEffect } from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, MenuItem, Select,InputLabel } from "@mui/material";

import * as api from "./api"
import { useNavigate,useState } from 'react-router-dom';
import StateTicket from './StateTicket';

const TicketForm = () => {

    const navigate = useNavigate()


    const {formData,setFormData,formVisible,setFormVisible,formErrors,setFormErrors,toggle,setToggle,ticket, setTicket,employee, setEmployee,recDelete,setRecDelete
    } = StateTicket()
    const loadTicket = async () => {
        const result = await api.loadTicket()
        setTicket(result);
      };

      useEffect(() => {
        loadTicket()
        fetchEmployee();
       
      },[])
    
    //   const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     if (name === 'createdDate') {
    //       const isValidDate = value === getCurrentDate();
    //       setDateError(!isValidDate);
    //     }
    //     setFormData({
    //       ...formData,
    //       [e.target.name]: e.target.value,
    //       [name]: value,
    //     });
    //   };
    
      const saveTicket = async () => {
    
        await api.saveTicket(formData);
        alert("Ticket added successfully");
        navigate("/ticket");
        
        setFormData({
            ticketsCode: "",
            subject: "",
            employeeName: "",
            priority: "",
            date: "",
        });
      };

      const handleSubmit = (e) => {
     
        loadTicket();
      }

      const fetchEmployee = async () => {
        const employeeData = await api.fetchEmployee()
        setEmployee(employee)
      };
      const handleInputChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const enforceMaxLength = (value, maxLength) => {
        return value.slice(0, maxLength);
      };
    
      const handleSubChange = (e) => {
        const value = enforceMaxLength(e.target.value, 100);
        setFormData({
          ...formData,
          subject: value,
        });
      };
    
    
      const isSubjectValid = () => {
        const { subject } = formData;
        return subject.length >= 2 && subject.length <= 50;
      };
      const handleTicketsCodeChange = (e) => {
        const value = e.target.value;
        setFormData({
          ...formData,
          ticketsCode: value,
        });
    
        // Add your validation logic here
        let errorMessage = "";
        if (value.length > 10) {
          errorMessage = "Ticket Code must be at most 12 characters long.";
        } else if (!/^[A-Za-z0-9]*$/.test(value)) {
          errorMessage = "Ticket Code can only contain alphanumeric characters.";
        }
    
        setFormErrors({
          ...formErrors,
          ticketsCode: errorMessage,
        });
      };
    
    
      const Type = [
        {
          value: "Choose",
          label: "Select Priority",
        },
        {
          value: "Low",
          label: "Low",
        },
        {
          value: "Medium",
          label: "Medium",
        },
        {
          value: "High",
          label: "High",
        },
      ];
  
    
    
  return (
        <form onSubmit={handleSubmit}>
                      <div className="data-input-fields">
                        <TextField
                          margin="dense"
                          label="Ticket Code"
                          type="text"
                          fullWidth
                          name="ticketsCode"
                          id="ticketsCode"
                          value={formData.ticketsCode}
                          onChange={(e) => handleInputChange(e)}
                          required
                          InputProps={{
                            inputProps: {
                              pattern: "[A-Za-z0-9]*", // Only allow alphanumeric characters
                            },
                          }}
                          onInput={(e) => {
                            e.target.value = enforceMaxLength(e.target.value, 10); // Assuming you want to limit the length
                            handleTicketsCodeChange(e);
                          }}
                          helperText={formErrors.ticketsCode} // Display the error message
                          error={!!formErrors.ticketsCode} // Set error state based on whether there is an error message
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
                          InputProps={{
                            minLength: 2,
                            maxLength: 50,
                          }}
                          error={!isSubjectValid()}
                          helperText={
                            !isSubjectValid()
                              ? 'Subject length should be between 2 and 50 characters.'
                              : ''
                          }
                          onInput={(e) => {
                            e.target.value = enforceMaxLength(e.target.value, 100);
                            handleSubChange(e);
                          }}
                        />
                      </div>

                      <div className="data-input-fields">

                        <FormControl fullWidth>
                          <InputLabel id="demo-company-select-label">
                            Employee Name
                          </InputLabel>
                          <Select
                            labelId="demo-company-select-label"
                            id="selectedEmployee"
                            value={formData.employeeName}
                            name="employeeName"
                            label="Employee Name"
                            onChange={(e) => handleInputChange(e)}
                            required
                          >
                            {employee.map((item, index) => {
                              return (
                                <MenuItem key={index} value={item.employeeName}>
                                  {item.employeeName}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>

                        <TextField
                          id="priority"
                          margin="dense"
                          select
                          //  label="Priority"
                          // type="text"
                          fullWidth
                          defaultValue="Choose"
                          SelectProps={{
                            native: true,
                          }}
                          value={formData.priority}
                          onChange={(e) => handleInputChange(e)}
                          name="priority"
                        >
                          {Type.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}

                        </TextField>

                        <TextField
                          margin="dense"
                          type="date"
                          fullWidth
                          name="date"
                          id="date"
                          value={formData.date}
                          onChange={(e) => handleInputChange(e)}
                          required
                          
                        />

                      </div>

                  
                      <Button
                        type="submit"
                        onClick={saveTicket}
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
                         onClick={() => setFormVisible(false)}
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
                    
  )
}

export default TicketForm