import axios from 'axios';

export const saveSalaryTemplate = async (formData) => {
    try{
        await axios.post(
            "http://localhost:8085/payrolltemplate/create/payrolltemplate",
            formData
          );
    } catch(error) {
        console.error("savePayroll",error)
    }
}

export const deleteSalaryTemplate = async (id) => {
    try{
        await axios.delete(`http://localhost:8085/payrolltemplate/delete/${id}`)
        loadSalaryTemplate();
    } catch(error) {
        console.error("Error deleting Payroll",error)
    }
};

export const loadSalaryTemplate = async () => {
    try {
       const result =  await axios.get(
            "http://localhost:8085/payrolltemplate/get/payrolltemplate",
            {
              validateStatus: () => {
                return true;
              },
            }
          );
          return result.data
    } catch (error) {
        console.error("Error load department", error)
    }
}