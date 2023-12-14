import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import * as api from "./PoliciesApi";
import StatePolicies from "./StatePolicies";

const Policiesform = () => {
  const {
    dateError,
    setDateError,
    titleError,
    setTitleError,
    descriptionError,
    setDescriptionError,
   
    setOpen,
    company,
  setCompany,
    formData,
    setFormData,
  } = StatePolicies();

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, "0");
    const day = `${now.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  let navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "description") {
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
      [name]: name === "chooseFile" ? files[0] : value,
    }));

    if (name === "createdDate") {
      const isValidDate = value === getCurrentDate();
      setDateError(!isValidDate);
    }
  };

  const fetchCompany = async () => {
  
    const response = await api.fetchCompany()
  
  setCompany(response)
};

useEffect(() => {
    fetchCompany()
  },[])

  const savePolicies = async () => {
    try {
      // const formDataToSend = new FormData();
      // Object.entries(formData).forEach(([key, value]) => {
      //   formDataToSend.append(key, value);
      // });

      await api.savePolicies(formData);

      navigate("/organisation/policies");
      handleClose();
    } catch (error) {
      console.error("Error saving policies:", error);
    }
  };

  const handleSubmit = (e) => {
    
    handleClose();
  };
  return (
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
            <option key={index} value={option.companyName}>
              {option.companyName}
            </option>
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
          helperText={
            descriptionError &&
            "Please enter a description between 2 and 200 characters."
          }
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
        name="uploadDocument"
        id="uploadDocument"
        onChange={(e) => handleInputChange(e)}
        accept=".pdf"
        InputLabelProps={{
          shrink: true,
        }}
      />

      <DialogActions>
        <Button
          type="submit"
          onClick={savePolicies}
          style={{
            background: "linear-gradient(to right, #1cb5e0, #000046)",
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
            background: "linear-gradient(to left, #1cb5e0, #000046)",
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
  );
};

export default Policiesform;
