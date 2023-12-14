import {useState} from 'react'
// import DepartmentView from './Mainfile/DepartmentView';

const StateSalaryTemplate = () => {
    const [basicSalary, setBasicSalary] = useState("");
    const [formVisible, setFormVisible] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [payroll, setPayroll] = useState([]);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [grossSal, setGrossSal] = useState(0);
    const [deduction, setDeduction] = useState(0);
    const [netAmount, setNetAmount] = useState(0);
    const [pfVal, setPfVal] = useState(0);
    const [recDelete, setRecDelete] = useState("");
    const [formData, setFormData] = useState({
      basicSalary: " ",
      houseRentAllowance: " ",
      medicalAllowance: " ",
      pf: " ",
      taxDeduction: " ",
      transportAllowance: " ",
      dearnessAllowance: " ",
      grossSalary: " ",
      totalDeduction: " ",
      netSalary: " ",
      payrollTemplate: " ",
      createdDate: " ",
    });
    return {
      pfVal, setPfVal, recDelete, setRecDelete, basicSalary, setBasicSalary,formVisible, setFormVisible,toggle, setToggle,payroll, setPayroll,search, setSearch,open, setOpen,grossSal, setGrossSal,deduction, setDeduction,netAmount, setNetAmount,formData, setFormData
    }
}

export default StateSalaryTemplate;