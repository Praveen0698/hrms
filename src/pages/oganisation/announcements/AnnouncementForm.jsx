import React, { useEffect } from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";

import { useNavigate} from 'react-router-dom';
import * as api from "./AnnouncementApi"
import StateAnnouncement from './StateAnnouncement';
const AnnouncementForm = () => {
    let navigate = useNavigate();
    const {
        summaryError,
        setSummaryError,
       
        titleError,
        setTitleError,
        dateError,
        setDateError,

        company,
        setCompany,
   
        setDepartment,
        location,
        setLocation,
        formData,
        setFormData,
       
        setFormVisible,
       
      } = StateAnnouncement();

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
    
      
    

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, "0");
    const day = `${now.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

      const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        // const isValidLengthSum = value.length >= 2 && value.length <= 200;
        // const hasNoNumbersSum = !/\d/.test(value); // Check for the presence of numbers
        // setSummaryError(!isValidLengthSum || !hasNoNumbersSum);
    
        // const isValidLength = value.length >= 2 && value.length <= 50;
        // const hasNoNumbers = !/\d/.test(value); // Check for the presence of numbers
        // setTitleError(!isValidLength || !hasNoNumbers);
    
        // const isValidDate = value === getCurrentDate();
        // setDateError(!isValidDate);
    
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const saveAnnouncements = async () => {
        await api.saveAnnouncements(formData)
        navigate("/organisation/announcements");
        alert("Added Successfully");
        setFormData({
          title: "",
          startDate: "",
          endDate: "",
          companyName: "",
          locationName: "",
          departmentName: "",
          summary: "",
          description: "",
          createdDate: "",
        });
      };

      useEffect(() => {
        const fetchCompany = async () => {
        
          const response = await api.fetchCompanies()
          setCompany(response);
       
      };
    
      const fetchLocation = async () => {
     
          const response = await api.fetchLocations()
          setLocation(response);
       
      };
      const fetchDepartment = async () => {
        
          const response = await api.fetchDepartment()
          setDepartment(response);
        };
        
        fetchCompany();
        fetchLocation();
        fetchDepartment();
      }, []);
    
      
     
      

      const handleSubmit = (e) => {
        e.preventDefault();
      };
  return (
    <form onSubmit={handleSubmit}>
      <div className="data-input-fields">
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
          // error={titleError}
          // helperText={titleError && "Title must be between 2 and 50 characters"}
        />
        <TextField
          margin="dense"
          label="Start-Date"
          type="date"
          fullWidth
          name="startDate"
          id="startDate"
          value={formData.startDate}
          onChange={(e) => handleInputChange(e)}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          margin="dense"
          label="End-date"
          type="date"
          fullWidth
          name="endDate"
          id="endDate"
          value={formData.endDate}
          onChange={(e) => handleInputChange(e)}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
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
          InputLabelProps={{
            shrink: true,
          }}
          // error={dateError}
          // helperText={dateError ? "Please select the current date" : ""}
        />
      </div>
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
          {Type.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>

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
          value={formData.departmentName}
          onChange={(e) => handleInputChange(e)}
          name="dlocationName"
        >
          {location.map((item, index) => {
            return (
              <option key={index} value={item.locationName}>
                {item.locationName}
              </option>
            );
          })}
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
          {company.map((option, index) => (
            <option key={index} value={option.companyName}>
              {option.companyName}
            </option>
          ))}
        </TextField>
      </div>

      <div className="data-input-fields">
        <TextField
          margin="dense"
          label="Summary"
          type="text"
          fullWidth
          name="summary"
          id="summary"
          value={formData.summary}
          onChange={(e) => handleInputChange(e)}
          required
          // error={summaryError}
          // helperText={
          //   summaryError
          //     ? "Summary must be between 2 and 200 characters and should not contain numbers"
          //     : ""
          // }
        />
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
        />
      </div>

      <DialogActions>
        <Button
          variant="outlined"
          type="submit"
          onClick={saveAnnouncements}
          style={{
            display: "flex",
            height: "40px",
            width: "49%",
            margin: "0 5px",
            color: "white",
            background: "linear-gradient(to right, #1cb5e0, #000046)",
          }}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          onClick={() => setFormVisible(false)}
          style={{
            display: "flex",
            height: "40px",
            width: "49%",
            margin: "0 5px",
            color: "white",
            background: "linear-gradient(to left, #1cb5e0, #000046)",
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </form>
  );
};

export default AnnouncementForm;
