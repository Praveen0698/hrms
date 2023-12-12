import {useState} from 'react'

const StateExpenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [open, setOpen] = useState(false);
   const [recDelete,setRecDelete] = useState("")
  
    const [formData, setFormData] = useState({
      expenceType: "",
      purchaseDate: "",
      amount: "",
      purchaseBy: "",
      remarks: "",
    });
  return {
    expenses,setExpenses,open,setOpen,formData,setFormData,recDelete,setRecDelete
  }
}

export default StateExpenses