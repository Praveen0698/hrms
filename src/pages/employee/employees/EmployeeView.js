import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
//import Search from "../../common/Search";
import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import MenuItem from "@mui/material/MenuItem";
// import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";
import { MdAdd } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Stepper, Step, StepLabel } from '@mui/material';
import Header from "../../../components/Header";
import SideBar from "../../../components/SideBar";



const EmployeeView = () => {

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, '0');
    const day = `${now.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  
  const [formVisible, setFormVisible] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  const [photograph, setPhotograph] = useState('');

  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

  let navigate = useNavigate();
  const [employee, setemployees] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({

    country: "",
    city: "",
    employeeRole: "",
    attendanceTime: "",
    employeeType: "",
    createdDate: "",
    designationName: "",
    bankName: "",
    ifscNumber: "",
    basicSalary: "",
    hraAllowances: "",
    otherAllowances: "",
    medicalAllowances: "",
    transportAllowance: "",
    pfAllowances: "",
    daAllowances: "",
    subDepartment: "",
    position: "",
    dutyType: "",
    hireDate: "",
    joiningDate: "",
    rateType: "",
    rateNumber: "",
    monthlyWorkHours: "",
    payFrequency: "",
    reportingTo: "",
    medical: "",
    family: "",
    transportation: "",
    others: "",
    otherInsurance: "",
    tax: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    workInCity: "",
    cityOfResidence: "",
    workPermit: "",
    uploadDocument: null,
    userEmailOrName: "",
    password: "",
    uploadPhoto:null,
    createdDate: getCurrentDate(),

  });

  // const { uploadDocument } = employee;
  // const { uploadPhoto } = employee;

  const [dateError, setDateError] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;  
    const files  = e.target;

    const selectedFile = files && files.length ? files[0] : null;


    if (name === 'createdDate') {
      const isValidDate = value === getCurrentDate();
      setDateError(!isValidDate);
    }
    
    

    
    {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        grossSalary:sal

      });

    };
calculateGross()
  }

console.log(formData)


 
  console.log(formData)
  const renderEmployeeData = () => {
    if (employeeData.length === 0) {
      return <tr><td colSpan="12" className="text-center">Data Not Found</td></tr>;
    }
    return employeeData.map((data, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{data.name}</td>
        <td><img src={data.photograph} alt="Photograph" /></td>
        <td>{data.employeeId}</td>
        <td>{data.phone}</td>
        <td>{data.email}</td>
        <td>{data.country}</td>
        <td>{data.state}</td>
        <td>{data.teamLeaderName}</td>
        <td>{data.status}</td>
      </tr>
    ));
  };


  const saveEmployee = async (e) => {

    await axios.post(
      "http://localhost:8082/employees/create/employees",
      formData
    );
    alert("Employee added successfully");
    navigate("/employees");
    loademployees();
    setFormData({
      country: "",
      city: "",
      employeeRole: "",
      email: "",
      branchName: "",
      attendanceTime: "",
      employeeType: "",
      createdDate: "",
      designationName: "",
      bankName: "",
      ifscNumber: "",
      basicSalary: "",
      hraAllowances: "",
      otherAllowances: "",
      medicalAllowances: "",
      transportAllowance: "",
      pfAllowances: "",
      daAllowances: "",
      subDepartment: "",
      position: "",
      dutyType: "",
      hireDate: "",
      joiningDate: "",
      rateType: "",
      rateNumber: "",
      monthlyWorkHours: "",
      payFrequency: "",
      reportingTo: "",
      medical: "",
      family: "",
      transportation: "",
      others: "",
      otherInsurance: "",
      tax: "",
      dateOfBirth: "",
      gender: "",
      maritalStatus: "",
      workInCity: "",
      cityOfResidence: "",
      workPermit: "",
      userEmailOrName: "",
      password: "",
      grossSalary: '',
      basicSalary: '',
      transportAllowance: '',
      houseRentAllowance: '',
      hraAllowances: '',
      otherAllowances: '',
      createdDate: getCurrentDate(),
      uploadDocument:null ,
      uploadPhoto:null,


    })
  };
  const [handleStep, setHandleStep] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = async (e) => {
    //formRef.current.reportValidity()
    // await axios.post("http://localhost:8083/employee/create/employee",formData);
    setActiveStep((prevStep) => prevStep + 1);
    //   if (formData.accountNumber === '' || formData.bankName === 'Choose' || formData.ifscNumber === '' || formData.branchName === '') {
    //     alert('Please fill out all fields');
    //  } else {
    //     handleStep(false);
    //  }

  };


  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };




  const handleSubmit = (e) => {
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    handleClose();
    handleNext();
    handleBack();
    e.preventDefault();
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  useEffect(() => {
    loademployees();
  }, []);

  const loademployees = async () => {
    const result = await axios.get(
      "http://localhost:8082/employees/get/employees",
      {
        validateStatus: () => {
          return true;
        },
      }
    );
    setemployees(result.data);
    console.log(result.data);
  };
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(inputEmail));
  };

  const [businessEmail, setBusinessEmail] = useState('');
  const [emailBusinessError, setEmailBusinessError] = useState(true);

  const handleBusinessEmailChange = (e) => {
    const inputEmail = e.target.value;
    setBusinessEmail(inputEmail);
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailBusinessError(!emailRegex.test(inputEmail));
  };

  const [employeeName, setEmployeeName] = useState("");

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (value.length < 2 || value.length > 50) {
      setErrorMsg('Invalid name length. Name length should be between 2 and 50.');
    } else {
      setErrorMsg('');
    }
    setEmployeeName(e.target.value);
  };

  const [branchName, setBranchName] = useState("");
  const [branchErrorMsg, setBranchErrorMsg] = useState("");


  const handleBranchChange = (e) => {
    const valueBranch = e.target.value;
    if (valueBranch.length < 2 || valueBranch.length > 50) {
      setBranchErrorMsg('Invalid name length. Name length should be between 2 and 50.');
    } else {
      setBranchErrorMsg('');
    }
    setBranchName(e.target.value);
  };

  const enforceMaxLengthBranch = (valueBranch, maxLength) => {
    return valueBranch.length <= maxLength ? valueBranch : valueBranch.slice(1, maxLength);
  };

  const [teamLeaderName, setTeamLeaderName] = useState("");

  const handleTeamChange = (e) => {
    setTeamLeaderName(e.target.value);
  };

  const [reportingTo, setReporting] = useState("");

  const handleReportChange = (e) => {
    setReporting(e.target.value);
  };

  

  const [accountNumber, setAccountNumber] = useState("");
  const [accountErrorMsg, setAccountErrorMsg] = useState("");


  const handleAccountChange = (e) => {
    const valueAccount = e.target.value;
    if (valueAccount.length < 2 || valueAccount.length > 50) {
      setAccountErrorMsg('Invalid name length. Name length should be between 2 and 50.');
    } else {
      setAccountErrorMsg('');
    }
    setAccountNumber(e.target.value);
  };

  const enforceMaxLengthAccount = (valueAccount, maxLength) => {
    return valueAccount.length <= maxLength ? valueAccount : valueAccount.slice(1, maxLength);
  };

  const enforceMaxLength = (value, maxLength) => {
    return value.length <= maxLength ? value : value.slice(1, maxLength);
  };

  const [zipCode, setZipCode] = useState("");

  const handleCodeChange = (e) => {
    setZipCode(e.target.value);
  };
  const [tinNumber, setTinNumber] = useState("");

  const handleTinChange = (e) => {
    setTinNumber(e.target.value);
  };

  const [countryCode, setCountryCode] = useState('+1');
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
  };

  const handlePhoneChange = (e) => {


    const value = e.target.value;
    setPhone(value);


    const isValid = /^\d{10}(-\d{1,4})?$/.test(value);
    setPhoneError(!isValid);
  };



  const [homePhone, setHomePhone] = useState("");
  const [phoneHomeError, setHomePhoneError] = useState(false);

  const handleHomePhoneChange = (e) => {
    const value = e.target.value;
    setHomePhone(value);

    const isValid = /^\d{10}(-\d{1,4})?$/.test(value);
    setHomePhoneError(!isValid);

  };

  const [cellPhone, setCellPhone] = useState("");
  const [phoneCellError, setCellPhoneError] = useState(false);

  const handleCellPhoneChange = (e) => {
    const value = e.target.value;
    setCellPhone(value);
    const isValid = /^\d{10}(-\d{1,4})?$/.test(value);
    setCellPhoneError(!isValid);

  };

  const Type = [
    {
      value: "Choose",
      label: "Select Company Type",
    },
    {
      value: "Corporation",
      label: "Corporation",
    },
    {
      value: "Exempt Organization",
      label: "Exempt Organization",
    },
    {
      value: "Partnership",
      label: "Partnership",
    },
    {
      value: "Private Foundation",
      label: "Private Foundation",
    },
    {
      value: "Limited Liability",
      label: "Limited Liability",
    },
    {
      value: "Non-profit Organization",
      label: "Non-profit Organization",
    },
    {
      value: "Proprietorship",
      label: "Proprietorship",
    },
  ];


  const EmpType = [
    {
      value: "Choose",
      label: "Select Employee Type",
    },
    {
      value: "Full Time",
      label: "Full Time",
    },
    {
      value: "Contractual",
      label: "Contractual",
    },
    {
      value: "Intern",
      label: "Intern",
    }


  ];


  const Role = [
    {
      value: "Choose",
      label: "Select Employee Role",
    },
    {
      value: "Fresher",
      label: "Fresher",
    },
    {
      value: "Experience",
      label: "Experience",
    },
    {
      value: "Intern",
      label: "Intern",
    }

  ];

  const Time = [
    {
      value: "Choose",
      label: "Select Attendance Time",

    },
    {
      value: " Attendance time(15:30 - 20:30)",
      label: " Attendance time(15:30 - 20:30)",
    },
    {
      value: " Test attendance(08:30 - 16:30)",
      label: " Test attendance(08:30 - 16:30)",
    },
    {
      value: " Regular(10:00 - 18:00)",
      label: " Regular(10:00 - 18:00)",
    },


  ];

  const Permit = [
    {
      value: "Choose",
      label: "Select Work Permit",

    },
    {
      value: "YES",
      label: "YES",

    },
    {
      value: "NO",
      label: "NO",

    },
  ];


  const gendertype = [
    {
      value: "Choose",
      label: "Select Gender",

    },
    {
      value: "Male",
      label: "Male",

    },
    {
      value: "Female",
      label: "Female",

    },
    {
      value: "Other",
      label: "Other",

    },

  ];

  const status = [{
    value: "Choose",
    label: "Select Marital Status",

  },

  {
    value: "Single",
    label: "Single",

  },

  {
    value: "Widowed",
    label: "Widowed",

  },
  {
    value: "Other",
    label: "Other",

  },

  ];

  console.log(formData);

  const bankNameType = [
    {
      value: "Choose",
      label: "Select Bank Name",

    },
    {
      value: "Bank Of India",
      label: "Bank Of India",

    },
    {
      value: "Corporation Bank",
      label: "Corporation Bank",

    },
    {
      value: "Canara Bank",
      label: "Canara Bank",

    },
    {
      value: "HDFC Bank",
      label: "HDFC Bank",

    },
    {
      value: "ICICI Bank",
      label: "ICICI Bank",

    },
    {
      value: "IndusInd Bank",
      label: "IndusInd Bank",

    },
    {
      value: "Kotak Mahindra Bank",
      label: "Kotak Mahindra Bank",

    },
    {
      value: "Punjab National Bank",
      label: "Punjab National Bank",

    },
    {
      value: "UCO Bank",
      label: "UCO Bank",

    },
    {
      value: "SBI Bank",
      label: "SBI Bank",

    },
    {
      value: "Standard Chartered Bank",
      label: "Standard Chartered Bank",

    },

  ];

  const SubDepartmentType = [
    {
      value: "Choose",
      label: "Select Sub Department Name",

    },
    {
      value: "Developer",
      label: "Developer",

    },
    {
      value: "Testing",
      label: "Testing",

    },
    {
      value: "SEO",
      label: "SEO",

    },
    {
      value: "Sales",
      label: "Sales",

    },
    {
      value: "Digital Marketing",
      label: "Digital Marketing",

    },
    {
      value: "DataScience",
      label: "DataScience",

    },

  ];

  const RateType = [{
    value: "Choose",
    label: "Select Rate Type",



  },

  {
    value: "Hourly",
    label: "Hourly",



  },
  {
    value: "Salary",
    label: "Salary",
  },
  ];

  const medicalType = [{
    value: "Choose",
    label: "Select Medical Type",



  },

  {
    value: "YES",
    label: "YES",



  },
  {
    value: "NO",
    label: "NO",
  },];
  const familyType = [{
    value: "Choose",
    label: "Select Family Type",



  },

  {
    value: "YES",
    label: "YES",



  },
  {
    value: "NO",
    label: "NO",
  },];

  const TransportationType = [
    {
      value: "Choose",
      label: "Select Transportation Type",



    },

    {
      value: "YES",
      label: "YES",



    },
    {
      value: "NO",
      label: "NO",
    },

  ];

  const othersType = [
    {
      value: "Choose",
      label: "Select Others",



    },

    {
      value: "YES",
      label: "YES",



    },
    {
      value: "NO",
      label: "NO",
    },
  ];




  const steps = ['Basic Info', 'Bank Details', 'Salary Details', 'Personal Info', 'Benefit', 'Supervisor', 'Bioraphical Info', 'Additional Address', 'Login Info'];



 
  //const [imagePreview, setImagePreview] = useState(null);

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];


  //   if (file) {

  //     if (file.type === 'image/png') {

  //       const maxSizeMB = 1;
  //       if (file.size / (1024 * 1024) > maxSizeMB) {
  //         alert(`File size exceeds ${maxSizeMB} MB.`);
  //         return;

  //         const reader = new FileReader();
  //         reader.onload = () => {
  //           setUploadPhoto(file);
  //           setImagePreview(reader.result);
  //         };
  //         reader.readAsDataURL(file);
  //       } else {
  //         alert('Please upload a PNG file.');
  //       }

  //     }
  //   }
  // };
  // const countryCodeRegex = /^[+]?\d{1,4}$/;

  // if (countryCodeRegex.test(e.target.value) || e.target.value === "") {
  //   setPhone(e.target.value);
  // }


  // const SalaryCalculator = () => {
  //   const [formData, setFormData] = useState({
  //     basicSalary: '',
  //     transportAllowance: '',
  //     houseRentAllowance: '',
  //     hraAllowances: '',
  //     otherAllowances: '',
  //   });
  // }

  // const calculateGrossSalary = () => {
  //   const {
  //     basicSalary,
  //     transportAllowance,
  //     houseRentAllowance,
  //     hraAllowances,
  //     otherAllowances,
  //   } = formData;

  //   const grossSalary =
  //     parseInt(basicSalary) +
  //     parseInt(transportAllowance) +
  //     parseInt(houseRentAllowance) +
  //     parseInt(hraAllowances) +
  //     parseInt(otherAllowances);

  //   return grossSalary;
  // };

  const [sal, setSal] = useState(0)

  const calculateGross = () => {
    var gross = parseInt(formData.basicSalary) + parseInt(formData.transportAllowance)  + parseInt(formData.hraAllowances) + parseInt(formData.otherAllowances)
    setSal(gross)
  }
  console.log(sal)

  useEffect(() => {
    calculateGross()
  })

  const [errorMsg, setErrorMsg] = useState('');
  const [alternativePhone, setAlternativePhone] = useState("");

  const handleOnChange = (e) => {
    const value = e.target.value;
    setPhone(value);

    const isValid = /^\d{10}(-\d{1,4})?$/.test(value);
    setPhoneError(!isValid);

    setAlternativePhone(e.target.value);
  };

  const handleDelete = async (id) => {
    console.log(id);
    await axios.delete(`http://localhost:8082/employees/delete/${id}`);
    loademployees();
  };

  //const formRef = useRef()

  console.log(formData);
  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <SideBar />
        <div className="head-foot-part">
          <section>
            <p>
              <IoMdHome style={{ fontSize: "25px", marginTop: "-8px" }} />{" "}
              <span style={{ fontWeight: "600", fontSize: "18px" }}>/Employees/</span>
              <span style={{ fontSize: "18px" }}>Employee</span>
            </p>
            <div
              className="above-table"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              {/* <Search search={search} setSearch={setSearch} /> */}
              <div>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setToggle(!toggle);
                    handleButtonClick();
                  }}
                  style={{ height: "35px" }}
                >
                  {toggle ? (
                    <div className="hide">
                      <BiSolidHide />
                      HIDE
                    </div>
                  ) : (
                    <div>
                      <MdAdd />
                      ADD EMPLOYEE
                    </div>
                  )}
                </Button>
              </div>
            </div>
            <Collapse in={formVisible}>

              <Stepper activeStep={activeStep}>
                
                  <Step onClick={() => setActiveStep(0)} style={{cursor:"pointer"}}>
                    <StepLabel>Basic Info</StepLabel>
                  </Step>
                  <Step onClick={() => setActiveStep(1)} style={{cursor:"pointer"}}>
                    <StepLabel>Bank Details</StepLabel>
                  </Step>
                  <Step onClick={() => setActiveStep(2)} style={{cursor:"pointer"}}>
                    <StepLabel>Salary Details</StepLabel>
                  </Step>
                  <Step onClick={() => setActiveStep(3)} style={{cursor:"pointer"}}>
                    <StepLabel>Personal Info</StepLabel>
                  </Step>
                  <Step onClick={() => setActiveStep(4)} style={{cursor:"pointer"}}>
                    <StepLabel>Benefit</StepLabel>
                  </Step>
                  <Step onClick={() => setActiveStep(5)} style={{cursor:"pointer"}}>
                    <StepLabel>Supervisor</StepLabel>
                  </Step>
                  <Step onClick={() => setActiveStep(6)} style={{cursor:"pointer"}}>
                    <StepLabel>Biographical Info</StepLabel>
                  </Step>
                  <Step onClick={() => setActiveStep(7)} style={{cursor:"pointer"}}>
                    <StepLabel>Additional Address</StepLabel>
                  </Step>
                  <Step onClick={() => setActiveStep(8)} style={{cursor:"pointer"}}>
                    <StepLabel>Login Info</StepLabel>
                  </Step>
                
              </Stepper>





              {activeStep === 0 && (
                <div style={{ marginTop: "15px" }}>
                  <Card variant="outlined" style={{ boxShadow: " 1px 1px 10px black" }}>
                    <div style={{ marginTop: "20px" }}>
                      <h3
                        style={{
                          textAlign: "center",
                          marginTop: "25px",
                          fontWeight: "600",
                          
                        }}
                        
                      >
                        BASIC INFO
                      </h3>
                      <DialogContent>
                        <form onSubmit={handleSubmit}>
                          <div className="data-input-fields">
                            <TextField
                              margin="dense"
                              label="Employee name"
                              type="text"
                              fullWidth
                              name="employeeName"
                              id="employeeName"

                              value={formData.employeeName}
                              onChange={(e) => handleInputChange(e)}
                              required
                              error={errorMsg !== ''}
                              helperText={errorMsg}
                              InputProps={{
                                minLength: 2,
                                maxLength: 50,
                              }}
                              onInput={(e) => {
                                e.target.value = enforceMaxLength(e.target.value, 50);
                                handleNameChange(e);
                              }} />
                            <TextField
                              margin="dense"
                              label="Email"
                              type="email"
                              fullWidth
                              name="email"
                              id="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange(e)}
                              required
                              error={!isEmailValid}
                              helperText={
                                !isEmailValid && "Please enter a valid email address."
                              }
                            />
                            <TextField
                              margin="dense"
                              label="Phone "
                              type="number"
                              fullWidth
                              name="phone"
                              id="phone"
                              value={formData.phone}
                              onChange={(e) => handleInputChange(e)}
                              required
                              error={phoneError}
                              helperText={phoneError ? "Invalid phone number" : ""}

                            />

                          </div>

                          <div className="data-input-fields">
                            <TextField
                              margin="dense"
                              label="Alternative Number"
                              type="number"
                              fullWidth
                              name="alternativePhone"
                              id="alternativePhone"
                              value={formData.alternativePhone}
                              onChange={(e) => handleInputChange(e)}

                              error={phoneError}
                              helperText={
                                phoneError ? "Invalid alternative phone number" : ""
                              }
                              required

                            />
                            <TextField
                              margin="dense"
                              label="Country"
                              type="text"
                              fullWidth
                              name="country"
                              id="country"
                              value={formData.country}
                              onChange={(e) => handleInputChange(e)}
                              required

                            />
                          </div>
                          <div className="data-input-fields">
                            <TextField
                              margin="dense"
                              label="City"
                              type="text"
                              fullWidth
                              name="city"
                              id="city"
                              value={formData.city}
                              onChange={(e) => handleInputChange(e)}
                              required

                            />
                            <TextField
                              margin="dense"
                              label="Zip Code"
                              type="number"
                              fullWidth
                              name="zipCode"
                              id="zipCode"
                              value={formData.zipCode}
                              onChange={(e) => handleInputChange(e)}
                              required

                              InputProps={{
                                minLength: 6, // Set your minimum length here
                                maxLength: 8, // Set your maximum length here
                              }}
                              onInput={(e) => {
                                e.target.value = enforceMaxLength(e.target.value, 10);
                                handleCodeChange(e);
                              }}
                            />
                            <TextField
                              id="employeeRole"
                              margin="dense"
                              select
                              label="Employee Role"
                              fullWidth
                              defaultValue="Choose"
                              SelectProps={{
                                native: true,
                              }}
                              InputLabelProps={{
                                shrink: true
                              }}
                              value={formData.employeeRole}
                              onChange={(e) => handleInputChange(e)}
                              name="employeeRole"
                            >
                              {Role.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>
                            <TextField
                              id="attendanceTime"
                              margin="dense"
                              select
                              label="Attendance Time"
                              fullWidth
                              defaultValue="Choose"
                              value={formData.attendanceTime}
                              onChange={(e) => handleInputChange(e)}
                              name="attendanceTime"
                              SelectProps={{
                                native: true,
                              }}
                              InputLabelProps={{
                                shrink: true
                              }}
                            >
                              {Time.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>


                            <TextField
                              margin="dense"
                              label="Designation"
                              type="text"
                              fullWidth
                              name="designationName"
                              id="designationName"
                              value={formData.designationName}
                              onChange={(e) => handleInputChange(e)}
                              required
                              InputLabelProps={{
                                shrink: true
                              }}

                            />
                          </div>
                          <div className="data-input-fields">

                            <TextField
                              id="employeeType"
                              margin="dense"
                              select
                              label="Employee Type"
                              fullWidth
                              defaultValue="Choose"

                              value={formData.employeeType}
                              onChange={(e) => handleInputChange(e)}
                              name="employeeType"
                              SelectProps={{
                                native: true,
                              }}
                              InputLabelProps={{
                                shrink: true
                              }}
                            >
                              {EmpType.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>
                            <TextField
                              id="companyType"
                              margin="dense"
                              select
                              label="Company Type"
                              fullWidth
                              defaultValue="Choose"
                              SelectProps={{
                                native: true,
                              }}
                              value={formData.companyType}
                              onChange={(e) => handleInputChange(e)}
                              name="companyType"
                            >
                              {Type.map((option) => (
                                <option key={option.value} value={option.value}>
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
                          </div>
                          <div className="data-buttons">
                            <DialogActions className="dialog">

                              <Button
                                id="input-btn"
                                onClick={handleBack}

                                variant="outlined"
                              >
                                Back
                              </Button>
                              <Button id="input-btn"
                                type="submit"
                                onClick={handleNext}

                                variant="outlined"
                              >
                                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                              </Button>



                            </DialogActions>
                          </div>
                        </form>
                      </DialogContent>
                    </div>
                  </Card>
                </div>



              )}

              {activeStep === 1 && (
                <div style={{ marginTop: "30px" }}>
                  <Card variant="outlined" style={{ boxShadow: " 1px 1px 10px black" }}>
                    <div style={{ marginTop: "20px" }}>
                      <h3
                        style={{
                          textAlign: "center",
                          marginTop: "25px",
                          fontWeight: "600",
                        }}
                      >
                        BANK DETAILS
                      </h3>
                      <DialogContent>
                        <form onSubmit={{ handleSubmit }}>
                          <div className="data-input-fields">
                            <TextField
                              margin="dense"
                              label="Account Number"
                              type="number"
                              fullWidth
                              name="accountNumber"
                              id="accountNumber"
                              value={formData.accountNumber}
                              onChange={(e) => handleInputChange(e)}
                              required
                              error={accountErrorMsg !== ''}
                              helperText={accountErrorMsg}
                              InputProps={{
                                minLength: 2, // Set your minimum length here
                                maxLength: 15, // Set your maximum length here
                              }}
                              onInput={(e) => {
                                e.target.value = enforceMaxLengthAccount(e.target.value, 10);
                                handleAccountChange(e);
                              }}
                            />

                            <TextField
                              id="bankName"
                              margin="dense"
                              select
                              label="Bank Name"
                              fullWidth
                              defaultValue="Choose"
                              SelectProps={{
                                native: true,
                              }}
                              InputLabelProps={{
                                shrink: true
                              }}
                              value={formData.bankName}
                              onChange={(e) => handleInputChange(e)}
                              name="bankName"
                            >
                              {bankNameType.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>
                          </div>

                          <div
                            className="data-input-fields"
                          >
                            <TextField
                              margin="dense"
                              label="IFCS CODE "
                              type="text"
                              fullWidth
                              name="ifscNumber"
                              id="ifscNumber"
                              value={formData.ifscNumber}
                              onChange={(e) => handleInputChange(e)}
                            />

                            <TextField
                              margin="dense"
                              label="Branch Name "
                              type="text"
                              fullWidth
                              name="branchName"
                              id="branchName"
                              value={formData.branchName}
                              onChange={(e) => handleInputChange(e)}
                              required
                              error={branchErrorMsg !== ''}
                              helperText={branchErrorMsg}
                              InputProps={{
                                minLength: 2, // Set your minimum length here
                                maxLength: 30, // Set your maximum length here
                              }}
                              onInput={(e) => {
                                e.target.value = enforceMaxLengthBranch(e.target.value, 10);
                                handleBranchChange(e);
                              }}

                            />
                          </div>


                          <div className="data-buttons">
                            <DialogActions className="dialog" >
                              <Button id="input-btn"
                                type="submit"
                                onClick={handleBack}

                                variant="outlined"
                              >
                                Previous
                              </Button>

                              <Button id="input-btn"
                                onClick={handleNext}

                                variant="outlined"
                              >
                                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}

                              </Button>
                            </DialogActions>
                          </div>


                        </form>
                      </DialogContent>
                    </div>
                  </Card>
                </div>

              )}

              {activeStep === 2 && (
                <div style={{ marginTop: "30px" }}>
                  <Card variant="outlined" style={{ boxShadow: " 1px 1px 10px black" }}>
                    <div style={{ marginTop: "20px" }}>
                      <h3
                        style={{
                          textAlign: "center",
                          marginTop: "25px",
                          fontWeight: "600",
                        }}
                      >
                        SALARY DETAILS
                      </h3>
                      <DialogContent>
                        <form onSubmit={{ handleSubmit }}>
                          <div className="data-input-fields">
                            <TextField
                              margin="dense"
                              label="Basic Salary*"
                              type="number"
                              fullWidth
                              name="basicSalary"
                              id="basicSalary"
                              value={formData.basicSalary}
                              onChange={(e) => handleInputChange(e)}
                              required

                            />
                            <TextField
                              margin="dense"
                              label="Transport Allowance*"
                              type="number"
                              fullWidth
                              name="transportAllowance"
                              id="transportAllowance"
                              value={formData.transportAllowance}
                              onChange={(e) => handleInputChange(e)}
                              required

                            />

                           
                          </div>

                          <div
                            className="data-input-fields"
                          >
                            <TextField
                              margin="dense"
                              label="Tin Number "
                              type="number"
                              fullWidth
                              name="tinNumber"
                              id=" tinNumber"
                              value={formData.tinNumber}
                              onChange={(e) => handleInputChange(e)}
                              required
                              InputProps={{
                                minLength: 2, // Set your minimum length here
                                maxLength: 20, // Set your maximum length here
                              }}
                              onInput={(e) => {
                                e.target.value = enforceMaxLength(e.target.value, 10);
                                handleTinChange(e);
                              }}

                            />

                            <TextField
                              margin="dense"
                              label="HRA Allowance "
                              type="number"
                              fullWidth
                              name="hraAllowances"
                              id="hraAllowances"
                              value={formData.hraAllowances}
                              onChange={(e) => handleInputChange(e)}
                              required

                            />
                            <TextField
                              margin="dense"
                              label="Other Allowance "
                              type="number"
                              fullWidth
                              name="otherAllowances"
                              id="otherAllowances"
                              value={formData.otherAllowances}
                              onChange={(e) => handleInputChange(e)}
                              required

                            />

                            <TextField
                              margin="dense"
                              label="PF Allowance "
                              type="number"
                              fullWidth
                              name="pfAllowances"
                              id="pfAllowances"
                              value={formData.pfAllowances}
                              onChange={(e) => handleInputChange(e)}
                              required

                            />
                          </div>
                          <div
                            className="data-input-fields"
                          >
                            <TextField
                              margin="dense"
                              label="DA Allowances "
                              type="number"
                              fullWidth
                              name="daAllowances"
                              id="daAllowances"
                              value={formData.daAllowances}
                              onChange={(e) => handleInputChange(e)}
                              required

                            />

                            <TextField
                              margin="dense"
                              label="Medical Allowance "
                              type="number"
                              fullWidth
                              name="medicalAllowances"
                              id="medicalAllowances"
                              value={formData.medicalAllowances}
                              onChange={(e) => handleInputChange(e)}
                              required

                            />
                            <TextField
                              margin="dense"
                              label="Tax "
                              type="number"
                              fullWidth
                              name="tax"
                              id="tax"
                              value={formData.tax}
                              onChange={(e) => handleInputChange(e)}
                              required

                            />
                            <TextField
                              margin="dense"
                              label="Gross Salary "
                              type="number"
                              fullWidth
                              name="grossSalary"
                              id="grossSalary"
                              value={sal}
                              onChange={(e) => handleInputChange(e)}
                              required
                              disabled
                            />

                           
                          </div>
                          <div className="data-buttons">
                            <DialogActions className="dialog" >


                              <Button id="input-btn"
                                type="submit"
                                onClick={handleBack}

                                variant="outlined"
                              >
                                Previous
                              </Button>

                              <Button id="input-btn"
                                onClick={handleNext}

                                variant="outlined"
                              >
                                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                              </Button>
                            </DialogActions>
                          </div>

                        </form>
                      </DialogContent>
                    </div>
                  </Card>
                </div>
              )}

              {activeStep === 3 && (
                <div style={{ marginTop: "30px" }}>
                  <Card variant="outlined" style={{ boxShadow: " 1px 1px 10px black" }}>
                    <div style={{ marginTop: "20px" }}>
                      <h3
                        style={{
                          textAlign: "center",
                          marginTop: "25px",
                          fontWeight: "600",
                        }}
                      >
                        PERSONAL INFO
                      </h3>
                      <DialogContent>
                        <form onSubmit={{ handleSubmit }}>
                          <div className="data-input-fields">
                            <TextField
                              id="subDepartment"
                              margin="dense"
                              select
                              label="Sub Department"
                              fullWidth
                              defaultValue="Choose"
                              required
                              SelectProps={{
                                native: true,
                              }}
                              InputLabelProps={{
                                shrink: true
                              }}
                              value={formData.subDepartment}
                              onChange={(e) => handleInputChange(e)}
                              name="subDepartment"
                            >
                              {SubDepartmentType.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>
                            <TextField
                              margin="dense"
                              label="Position "
                              type="text"
                              fullWidth
                              name="position"
                              id="position"
                              value={formData.position}
                              onChange={(e) => handleInputChange(e)}
                              required

                            />
                          </div>

                          <div
                            className="data-input-fields"
                          >
                            <TextField
                              margin="dense"
                              label="Duty Type"
                              type="number"
                              fullWidth
                              name="dutyType"
                              id="dutyType"
                              value={formData.dutyType}
                              onChange={(e) => handleInputChange(e)}
                              required


                            />

                            <TextField
                              margin="dense"
                              label="Hire Date "
                              type="date"
                              fullWidth
                              name="hireDate"
                              id="hireDate"
                              value={formData.hireDate}
                              onChange={(e) => handleInputChange(e)}
                              required
                              InputLabelProps={{
                                shrink: true
                              }}

                            />
                            <TextField
                              margin="dense"
                              label="Joining Date "
                              type="date"
                              fullWidth
                              name="joiningDate"
                              id="joiningDate"
                              value={formData.joiningDate}
                              onChange={(e) => handleInputChange(e)}
                              required
                              InputLabelProps={{
                                shrink: true
                              }}

                            />
                            <TextField
                              id="rateType"
                              margin="dense"
                              select
                              label="Rate Type"
                              fullWidth
                              defaultValue="Choose"
                              SelectProps={{
                                native: true,
                              }}
                              InputLabelProps={{
                                shrink: true
                              }}
                              value={formData.rateType}
                              onChange={(e) => handleInputChange(e)}
                              name="rateType"
                            >
                              {RateType.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>
                          </div>
                          <div
                            className="data-input-fields"
                          >
                            <TextField
                              margin="dense"
                              label="Rate"
                              type="number"
                              fullWidth
                              name="rateNumber"
                              id="rateNumber"
                              value={formData.rateNumber}
                              onChange={(e) => handleInputChange(e)}
                              required

                            />
                            <TextField
                              margin="dense"
                              label="Monthly Work Hours"
                              type="number"
                              fullWidth
                              name="monthlyWorkHours"
                              id="monthlyWorkHours"
                              value={formData.monthlyWorkHours}
                              onChange={(e) => handleInputChange(e)}
                              required

                            />
                            <TextField
                              margin="dense"
                              label="Pay Frequency"
                              type="string"
                              fullWidth
                              name="payFrequency"
                              id="payFrequency"
                              value={formData.payFrequency}
                              onChange={(e) => handleInputChange(e)}
                              required

                            />
                          </div>

                          <DialogActions className="dialog">
                            <Button id="input-btn"
                              type="submit"
                              onClick={handleBack}
                              style={{
                                background:
                                  "linear-gradient(to right, #1cb5e0, #000046)",
                                height: "35px",
                                width: "49%",
                                color: "white",
                                margin: "0 5px",
                              }}
                              variant="outlined"
                            >
                              Previous
                            </Button>

                            <Button id="input-btn"
                              onClick={handleNext}
                              style={{
                                background:
                                  "linear-gradient(to left, #1cb5e0, #000046)",
                                height: "35px",
                                width: "49%",
                                color: "white",
                                margin: "0 5px",
                              }}
                              variant="outlined"
                            >
                              {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                            </Button>
                          </DialogActions>
                        </form>
                      </DialogContent>
                    </div>
                  </Card>
                </div>

              )}

              {activeStep === 4 && (
                <div style={{ marginTop: "30px" }}>
                  <Card variant="outlined" style={{ boxShadow: " 1px 1px 10px black" }}>
                    <div style={{ marginTop: "20px" }}>
                      <h3
                        style={{
                          textAlign: "center",
                          marginTop: "25px",
                          fontWeight: "600",
                        }}
                      >
                        BENEFIT
                      </h3>
                      <DialogContent>
                        <form onSubmit={{ handleSubmit }}>
                          <div
                            className="data-input-fields"
                          >
                            <TextField
                              id="medical"
                              margin="dense"
                              select
                              label="medical"
                              fullWidth
                              defaultValue="Choose"
                              SelectProps={{
                                native: true,
                              }}
                              InputLabelProps={{
                                shrink: true
                              }}
                              value={formData.medical}
                              onChange={(e) => handleInputChange(e)}
                              name="medical"
                            >
                              {medicalType.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>


                            <TextField
                              id="family"
                              margin="dense"
                              select
                              label="Family"
                              fullWidth
                              defaultValue="Choose"
                              SelectProps={{
                                native: true,
                              }}
                              InputLabelProps={{
                                shrink: true
                              }}
                              value={formData.family}
                              onChange={(e) => handleInputChange(e)}
                              name="family"
                            >
                              {familyType.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>


                            <TextField
                              id="transportation"
                              margin="dense"
                              select
                              label="transportation"
                              fullWidth
                              defaultValue="Choose"
                              SelectProps={{
                                native: true,
                              }}
                              InputLabelProps={{
                                shrink: true
                              }}
                              value={formData.transportation}
                              onChange={(e) => handleInputChange(e)}
                              name="transportation"
                            >
                              {TransportationType.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>

                            <TextField
                              id="others"
                              margin="dense"
                              select
                              label="others"
                              fullWidth
                              defaultValue="Choose"
                              SelectProps={{
                                native: true,
                              }}
                              InputLabelProps={{
                                shrink: true
                              }}
                              value={formData.others}
                              onChange={(e) => handleInputChange(e)}
                              name="others"
                            >
                              {othersType.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>
                          </div>
                          <div className="data-buttons">
                            <DialogActions className="dialog">
                              <Button id="input-btn"
                                type="submit"
                                onClick={handleBack}
                                variant="outlined"
                              >
                                Previous
                              </Button>

                              <Button id="input-btn"
                                onClick={handleNext}
                                variant="outlined"
                              >
                                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                              </Button>
                            </DialogActions>
                          </div>

                        </form>
                      </DialogContent>
                    </div>
                  </Card>
                </div>
              )}
              {activeStep === 5 && (
                <div style={{ marginTop: "30px" }}>
                  <Card variant="outlined" style={{ boxShadow: " 1px 1px 10px black" }}>
                    <div style={{ marginTop: "20px" }}>
                      <h3
                        style={{
                          textAlign: "center",
                          marginTop: "25px",
                          fontWeight: "600",
                        }}
                      >
                        SUPERVISOR
                      </h3>
                      <DialogContent>
                        <form onSubmit={{ handleSubmit }}>
                          <div
                            className="data-input-fields"
                          >
                            <TextField
                              margin="dense"
                              label="Team Leader Name "
                              type="text"
                              fullWidth
                              name="teamLeaderName"
                              id="teamLeaderName"
                              value={formData.teamLeaderName}
                              onChange={(e) => handleInputChange(e)}
                              required
                              InputProps={{
                                minLength: 2, // Set your minimum length here
                                maxLength: 30, // Set your maximum length here
                              }}
                              onInput={(e) => {
                                e.target.value = enforceMaxLength(e.target.value, 10);
                                handleTeamChange(e);
                              }}

                            />

                            <TextField
                              margin="dense"
                              label="Reporting To "
                              type="text"
                              fullWidth
                              name="reportingTo"
                              id="reportingTo"
                              value={formData.reportingTo}
                              onChange={(e) => handleInputChange(e)}
                              required
                              InputProps={{
                                minLength: 2, // Set your minimum length here
                                maxLength: 30, // Set your maximum length here
                              }}
                              onInput={(e) => {
                                e.target.value = enforceMaxLength(e.target.value, 10);
                                handleReportChange(e);
                              }}

                            />
                          </div>

                          <div className="data-buttons">
                            <DialogActions className="dialog">

                              <Button id="input-btn"
                                type="submit"
                                onClick={handleBack}
                                variant="outlined"
                              >
                                Previous
                              </Button>



                              <Button id="input-btn"
                                onClick={handleNext}

                                variant="outlined"
                              >
                                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                              </Button>
                            </DialogActions>
                          </div>


                        </form>
                      </DialogContent>
                    </div>
                  </Card>
                </div>
              )}
              {activeStep === 6 && (
                <div style={{ marginTop: "30px" }}>
                  <Card variant="outlined" style={{ boxShadow: " 1px 1px 10px black" }}>
                    <div style={{ marginTop: "20px" }}>
                      <h3
                        style={{
                          textAlign: "center",
                          marginTop: "25px",
                          fontWeight: "600",
                        }}
                      >
                        BIOGRAPHIHCAL INFO
                      </h3>
                      <DialogContent>
                        <form onSubmit={{ handleSubmit }}>
                          <div
                            className="data-input-fields"
                          >
                            <TextField
                              margin="dense"
                              label="Date Of Birth "
                              type="date"
                              fullWidth
                              name="dateOfBirth"
                              id="dateOfBirth"
                              value={formData.dateOfBirth}
                              onChange={(e) => handleInputChange(e)}
                              required
                              InputLabelProps={{
                                shrink: true
                              }}
                            />
                            <TextField
                              id="gender"
                              margin="dense"
                              select
                              label="Gender"
                              fullWidth
                              defaultValue="Choose"
                              SelectProps={{
                                native: true,
                              }}
                              InputLabelProps={{
                                shrink: true
                              }}
                              value={formData.gender}
                              onChange={(e) => handleInputChange(e)}
                              name="gender"
                            >
                              {gendertype.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>

                            <TextField
                              id="maritalStatus"
                              margin="dense"
                              select
                              label="Marital Status"
                              fullWidth
                              defaultValue="Choose"
                              SelectProps={{
                                native: true,
                              }}
                              InputLabelProps={{
                                shrink: true
                              }}
                              value={formData.maritalStatus}
                              onChange={(e) => handleInputChange(e)}
                              name="maritalStatus"
                            >
                              {status.map((option,index) => (
                                <option key={index} value={option.label}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>

                          </div>
                          <div
                            className="data-input-fields"
                          >

                            <TextField
                              margin="dense"
                              label="Work In City "
                              type="text"
                              fullWidth
                              name="workInCity"
                              id="workInCity"
                              value={formData.workInCity}
                              onChange={(e) => handleInputChange(e)}
                              required
                            />

                            <TextField
                              margin="dense"
                              label="City Of Residence"
                              type="text"
                              fullWidth
                              name="cityOfResidence"
                              id="cityOfResidence"
                              value={formData.cityOfResidence}
                              onChange={(e) => handleInputChange(e)}
                              required
                            />
                            <TextField
                              id="workPermit"
                              margin="dense"
                              select
                              label="Work Permit"
                              fullWidth
                              defaultValue="Choose"
                              SelectProps={{
                                native: true,
                              }}
                              InputLabelProps={{
                                shrink: true
                              }}
                              value={formData.workPermit}
                              onChange={(e) => handleInputChange(e)}
                              name="workPermit"
                            >
                              {Permit.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>

                            <TextField
                              margin="dense"
                              label="Upload Photo"
                              type="file"
                              fullWidth
                              name="uploadPhoto"
                              id="uploadPhoto"
                              inputProps={{ accept: '.jpg, .jpeg, .png' }}
                              value={formData.uploadPhoto}
                              onChange={(e) => handleInputChange(e)}
                              required
                              InputLabelProps={{
                                shrink: true
                              }}

                            />




                          </div>
                          <div className="data-buttons">
                            <DialogActions className="dialog">
                              <Button id="input-btn"
                                type="submit"
                                onClick={handleBack}
                                variant="outlined"
                              >
                                Previous
                              </Button>

                              <Button id="input-btn"
                                onClick={handleNext}
                                variant="outlined"
                              >
                                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                              </Button>
                            </DialogActions>
                          </div>

                        </form>
                      </DialogContent>
                    </div>
                  </Card>
                </div>
              )}
              {activeStep === 7 && (
                <div style={{ marginTop: "30px" }}>
                  <Card variant="outlined" style={{ boxShadow: " 1px 1px 10px black" }}>
                    <div style={{ marginTop: "20px" }}>
                      <h3
                        style={{
                          textAlign: "center",
                          marginTop: "25px",
                          fontWeight: "600",
                        }}
                      >
                        ADDITIONAL ADDRESS
                      </h3>
                      <DialogContent>
                        <form onSubmit={{ handleSubmit }}>


                          <div className="data-input-fields">
                          <TextField
  margin="dense"
  label="Business Email"
  type="email"
  fullWidth
  name="email"
  id="email"
  value={formData.businessEmail}
  onChange={handleBusinessEmailChange}
  required
  error={emailBusinessError}
  helperText={emailBusinessError ? "Please enter a valid email address." : ""}
/>


                            <TextField
                              margin="dense"
                              label="Home Phone "
                              type="number"
                              fullWidth
                              name="homePhone"
                              id="homePhone"
                              value={formData.homePhone}
                              onChange={(e) => handleInputChange(e)}
                              required
                              error={phoneHomeError}
                              helperText={phoneHomeError ? "Invalid phone number" : ""}


                            />
                            <TextField
                              margin="dense"
                              label="Cell Phone "
                              type="number"
                              fullWidth
                              name="cellPhone"
                              id="cellPhone"
                              value={formData.cellPhone}
                              onChange={(e) => handleInputChange(e)}
                              required
                              error={phoneCellError}
                              helperText={phoneCellError ? "Invalid phone number" : ""}


                            />

                          </div>




                          <div className="data-buttons">
                            <DialogActions className="dialog">
                              <Button id="input-btn"
                                type="submit"
                                onClick={handleBack}
                                variant="outlined"
                              >
                                Previous
                              </Button>

                              <Button id="input-btn"
                                onClick={handleNext}
                                variant="outlined"
                              >
                                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                              </Button>
                            </DialogActions>
                          </div>


                        </form>
                      </DialogContent>
                    </div>
                  </Card>
                </div>
              )}

              {activeStep === 8 && (
                <div style={{ marginTop: "30px" }}>
                  <Card variant="outlined" style={{ boxShadow: " 1px 1px 10px black" }}>
                    <div style={{ marginTop: "20px" }}>
                      <h3
                        style={{
                          textAlign: "center",
                          marginTop: "25px",
                          fontWeight: "600",
                        }}
                      >
                        LOGIN INFO
                      </h3>
                      <DialogContent>
                        <form onSubmit={{ handleSubmit }}>


                          <div className="data-input-fields">
                            <TextField
                              margin="dense"
                              label="User Name/Email "
                              type="text"
                              fullWidth
                              name="userEmailOrName"
                              id="userEmailOrName"
                              value={formData.userEmailOrName}
                              onChange={(e) => handleInputChange(e)}
                              required

                            />
                            <TextField
                              margin="dense"
                              label="Password "
                              type="password"
                              fullWidth
                              name="password"
                              id="password"
                              value={formData.password}
                              onChange={(e) => handleInputChange(e)}
                              required


                            />

<TextField
      margin="dense"
      label="Upload Document"
      type="file"
      fullWidth
      name="uploadDocument"
      id="uploadDocument"
      inputProps={{ accept: '.pdf' }}
      onChange={handleInputChange}
      required
      InputLabelProps={{
        shrink: true,
      }}
    />


                          </div>




                          <div className="data-buttons">
                            <DialogActions className="dialog">
                              <Button
                                id="input-btn"
                                type="submit"
                                onClick={saveEmployee}
                                variant="outlined"
                              >
                                SUBMIT
                              </Button>
                              <Button id="input-btn"
                                className="cancel"
                                onClick={() => setFormVisible(false)}
                                variant="outlined"


                              >
                                CANCEL
                              </Button>
                            </DialogActions>
                          </div>

                        </form>
                      </DialogContent>
                    </div>
                  </Card>
                </div>
              )}
            </Collapse>
            <br />

            <table className="table table-bordered table-hover shadow">
              <thead>
                <tr className="text-center">
                  <th>SL</th>
                  <th>Employee Name</th>
                  <th>Photograph</th>
                  <th>Employee Id</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Country</th>
                  <th>State</th>
                  <th>Team Leader Name</th>
                  <th>Status</th>


                  <th colSpan="3">Actions</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {renderEmployeeData()}
                {employee
                  .filter(
                    (st) =>
                      st.employeeName &&
                      st.employeeName.toLowerCase().includes(search)
                  )
                  .map((employee, index) => (
                    <tr key={employee.id}>
                      <th scope="row" key={index}>
                        {index + 1}
                      </th>
                      <td>{employee.employeeName}</td>
                      <td>{employee.uploadPhoto}</td>
                      <td>{employee.employeeId}</td>
                      <td>{employee.phone}</td>
                      <td>{employee.email}</td>
                      <td>{employee.country}</td>
                      <td>{employee.state}</td>
                      <td>{employee.teamLeaderName}</td>
                      <td>{employee.status}</td>

                      <td className="mx-2">
                        <Link
                          to={`/employee-profile/${employee.employeeId}`}
                          className="btn btn-info"
                        >
                          <FaEye />
                        </Link>
                      </td>
                      <td className="mx-2">
                        <Link
                          to={`/edit-employee/${employee.employeeId}`}
                          className="btn btn-warning"
                        >
                          <FaEdit />
                        </Link>
                      </td>
                      <td className="mx-2">
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(employee.employeeId)}
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>


          </section>

        </div>
      </div>


    </div>

  );
};

export default EmployeeView;

