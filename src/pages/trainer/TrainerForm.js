import React, { useEffect } from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, MenuItem, Select,InputLabel } from "@mui/material";
import * as api from "./api"
import { useNavigate,useState } from 'react-router-dom';
import StateTrainer from './StateTrainer';

const TrainerForm = () => {

    const navigate = useNavigate()

    const { formVisible,
        setFormVisible,
        toggle,
        setToggle,
        overallTrainerRating,
        setOverallTrainerRating,
        uploadCertificate,
        setUploadCertificate,
        formControl,
        setFormControl,
        formData,
        setFormData,
        trainer,
        setTrainer,
        search,
        setSearch,
        open,
        setOpen,
        recDelete,
        setRecDelete,
    } = StateTrainer()

    const loadTrainer = async () => {
        const result = await api.loadTrainer()
        setTrainer(result);
      };

      useEffect(() => {
        loadTrainer();
        setFormData({
          ...formData,
          //   [e.target.name]: e.target.value,
        });
      }, []);

    
      const saveTrainer = async () => {
    
        await api.saveTrainer(formData);
        alert("trainer added successfully");
        navigate("/trainer");
        setFormData({
          trainersFullName: "",
          emailAddress: "",
          phoneNo: "",
          technicalSkills: "",
          softSkills: "",
          industries: "",
          certifications: "",
          trainingProgramsOffered: "",
          preferredTrainingAudienece: "",
          trainingLanguages: "",
          availability: "",
          previousClients: "",
          trainingMaterialsProvided: "",
          additionalNotes: "",
        });
      };

 
      const handleFileChange = (e) => {
        const file = e.target.files[0];
        // Handle the file as needed, for example, you can set it in state
        setUploadCertificate(file);
      };
      const enforceMaxLength = (value, maxLength) => {
        return value.slice(0, maxLength);
      };
    
      const handleNameChange = (e) => {
        const value = enforceMaxLength(e.target.value, 100);
        setFormData({
          ...formData,
          name: value,
        });
      };
    
      const isNameValid = () => {
        const nameLength = formData.trainersFullName.length;
        return nameLength >= 2 && nameLength <= 50;
      };
      const handlePutChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
      const isPreviousClientsValid = () => {
        const length = formData.previousClients.length;
        return length >= 2 && length <= 100;
      };
    
      const handlePreviousClientsChange = (e) => {
        setFormData({
          ...formData,
          previousClients: e.target.value,
        });
      };
      const handleInChange = (e) => {
        // Ensure that only numeric characters are allowed
        if (/^\d*$/.test(e.target.value) || e.target.value === '') {
          setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
        }
      };
      const isPhoneNoValid = () => {
        // Regular expression for a simple phone number format check
        const phoneNoRegex = /^[0-9]{10}$/; // Assuming a 10-digit phone number
        return phoneNoRegex.test(formData.phoneNo);
      };
      const isEmailValid = () => {
        // Regular expression for a simple email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(formData.emailAddress);
      };
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      
      
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted:", formData);
        // handleClose();
      };
    
      const Prog = [
        {
          value: "Choose",
          label: "Select Program",
        },
        {
          value: "Workhop",
          label: "Workhop",
        },
        {
          value: "Seminar",
          label: "Seminar",
        },
        {
          value: "Webinar",
          label: "Webinar",
        },
    
      ];
      const Train = [
        {
          value: "Choose",
          label: "Select Audience",
        },
        {
          value: "Employees",
          label: "Employees",
        },
        {
          value: "Managers/Supervisors",
          label: "Managers/Supervisors",
        },
        {
          value: "Cross-functional Team",
          label: "Cross-functional Team",
        },
    
      ];
      const Ava = [
        {
          value: "Choose",
          label: "Select Availability",
        },
        {
          value: "Part-Time",
          label: "Part-Time",
        },
        {
          value: "Full-Time",
          label: "Full-Time",
        },
        {
          value: "Contact Basis",
          label: "Contact Basis",
        },
        {
          value: "Remote/online",
          label: "Remote/online",
        },
    
      ];
      const Type = [
        {
          value: "Choose",
          label: "Select Material",
        },
        {
          value: "Trainer Provides Materials",
          label: "Trainer Provides Materials",
        },
        {
          value: "Organisation Provides Materials",
          label: "Organisation Provides Materials",
        },
        {
          value: "Both",
          label: "Both",
        },
    
      ];
    
      const Lan = [
        {
          value: "Choose",
          label: "Select Language",
        },
        {
          value: "English",
          label: "English",
        },
        {
          value: "Hindi",
          label: "Hindi",
        },
        {
          value: "Spainch",
          label: "Spainch",
        },
        {
          value: "French",
          label: "French",
        },
    
      ];
      const Ind = [
        {
          value: "Choose",
          label: "Select Industries",
        },
        {
          value: "IT",
          label: "IT",
        },
        {
          value: "Healthcare",
          label: "Healthae",
        },
        {
          value: "Finance",
          label: "Finance",
        },
    
      ];
    
  
    
    
  return (
<form onSubmit={() => handleSubmit}>

    <div className="data-input-fields">
      <TextField
        margin="dense"
        label="Trainer's Full Name"
        type="text"
        fullWidth
        name="trainersFullName"
        id="trainersFullName"
        value={formData.trainersFullName}
        onChange={(e) => handlePutChange(e)}
        required
        InputProps={{
          minLength: 2,
          maxLength: 50,
        }}
        error={!isNameValid()}
        helperText={
          !isNameValid()
            ? 'Name should be between 2 and 50 characters.'
            : ''
        }
        onInput={(e) => {
          e.target.value = enforceMaxLength(e.target.value, 50);
          handlePutChange(e);
        }}
      />
      <TextField
        margin="dense"
        label="Email Address"
        type="email"
        fullWidth
        name="emailAddress"
        id="emailAddress"
        value={formData.emailAddress}
        onChange={(e) => handleInputChange(e)}
        required
        error={!isEmailValid()}
        helperText={
          !isEmailValid() ? 'Enter a valid email address.' : ''
        }
        style={{ margin: "0 3px" }}
      />
    </div>
    <div className="data-input-fields">
      <TextField
        margin="dense"
        label="Phone Number"
        type="text" // Using text type to allow both numeric and non-numeric characters
        fullWidth
        name="phoneNo"
        id="phoneNo"
        value={formData.phoneNo}
        onChange={(e) => handleInChange(e)}
        required
        error={!isPhoneNoValid()}
        helperText={
          !isPhoneNoValid() ? 'Enter a valid phone number.' : ''
        }
      />
      <TextField
        margin="dense"
        label="Technical Skills"
        type="text"
        fullWidth
        name="technicalSkills"
        id="technicalSkills"
        value={formData.technicalSkills}
        onChange={(e) => handleInputChange(e)}
        required
      />
      <TextField
        margin="dense"
        label="Trainers Soft Skills"
        type="text"
        fullWidth
        name="softSkills"
        id="softSkills"
        value={formData.softSkills}
        onChange={(e) => handleInputChange(e)}
        required
        style={{ margin: "8px 3px" }}
      />
    </div>

    <div className="data-input-fields">
      <TextField
        id="industries"
        margin="dense"
        select
        //  label="Priority"
        // type="text"
        fullWidth
        defaultValue="Choose"
        SelectProps={{
          native: true,
        }}
        value={formData.industries}
        onChange={(e) => handleInputChange(e)}
        name="industries"
      >
        {Ind.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}

      </TextField>
      <TextField
        margin="dense"
        label="Certifications"
        type="file"
        name="Certifications"
        id="Certifications"
        onChange={handleFileChange}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        id="trainingProgramsOffered"
        margin="dense"
        select
        //  label="Priority"
        // type="text"
        fullWidth
        defaultValue="Choose"
        SelectProps={{
          native: true,
        }}
        value={formData.trainingProgramsOffered}
        onChange={(e) => handleInputChange(e)}
        name="trainingProgramsOffered"
      >
        {Prog.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}

      </TextField>


    </div>

    <div className="data-input-fields">
      <TextField
        margin="dense"
        label="OtherTrainingFormats"
        type="text"
        fullWidth
        name="otherTrainingFormats"
        id="otherTrainingFormats"
        value={formData.otherTrainingFormats}
        onChange={(e) => handleInputChange(e)}
        required

      />
      <TextField
        id="preferredTrainingAudienece"
        margin="dense"
        select
        fullWidth
        defaultValue="Choose"
        SelectProps={{
          native: true,
        }}
        value={formData.preferredTrainingAudienece}
        onChange={(e) => handleInputChange(e)}
        name="preferredTrainingAudienece"
      >
        {Train.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}

      </TextField>
    </div>


    <div className="data-input-fields">

      <TextField
        id="trainingLanguages"
        margin="dense"
        select
        //  label="Priority"
        // type="text"
        fullWidth
        defaultValue="Choose"
        SelectProps={{
          native: true,
        }}
        value={formData.trainingLanguages}
        onChange={(e) => handleInputChange(e)}
        name="trainingLanguages"
      >
        {Lan.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}

      </TextField>
      <TextField
        id="availability"
        margin="dense"
        select
        //  label="Priority"
        // type="text"
        fullWidth
        defaultValue="Choose"
        SelectProps={{
          native: true,
        }}
        value={formData.availability}
        onChange={(e) => handleInputChange(e)}
        name="availability"
      >
        {Ava.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}

      </TextField>



    </div>

    <div className="data-input-fields">
      <TextField
        margin="dense"
        label="Previous Clients"
        type="text"
        fullWidth
        name="previousClients"
        id="previousClients"
        value={formData.previousClients}
        onChange={(e) => handleInputChange(e)}
        required
        error={!isPreviousClientsValid()}
        helperText={
          !isPreviousClientsValid()
            ? 'Length should be between 2 and 100 characters.'
            : ''
        }
        InputProps={{
          minLength: 2,
          maxLength: 100,
        }}
        onInput={(e) => {
          e.target.value = enforceMaxLength(e.target.value, 100);
          handlePreviousClientsChange(e);
        }}
      />



      <TextField
        id="trainingMaterialsProvided"
        margin="dense"
        select
        type="text"
        fullWidth
        defaultValue="Choose"
        SelectProps={{
          native: true,
        }}
        value={formData.trainingMaterialsProvided}
        onChange={(e) => handleInputChange(e)}
        name="trainingMaterialsProvided"
      >
        {Type.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}

      </TextField>


      <TextField
        margin="dense"
        label="Additional Notes"
        type="text"
        fullWidth
        name="additionalNotes"
        id="additionalNotes"
        value={formData.additionalNotes}
        onChange={(e) => handleInputChange(e)}
        required
        style={{ marginBottom: "10px" }}
      />
    </div>
    <div className="data-input-fields">

    </div>


    <div className="data-input-fields">
    <Button
      type="submit"
      style={{
        background: "linear-gradient(to right, #1cb5e0, #000046)",
        height: "35px",
        width: "49%",
        color: "white",
        margin: "0 5px",
      }}
      variant="outlined"
    >
      Submit
    </Button>
    <Button
      onClick={() => setFormVisible(false)}
      style={{
        background: "linear-gradient(to left, #1cb5e0, #000046)",
        height: "35px",
        width: "49%",
        color: "white",
        margin: "0 5px",
      }}
      variant="outlined"
    >
      Cancel
    </Button>
  </div>
</form>

  );
};


export default TrainerForm