import axios from 'axios';

export const saveCompany = async (formData) => {
    try{
        await axios.post(
            "http://localhost:8081/company/create/company",
            formData
          );
          
    } catch(error) {
        console.error("saveCompany",error)
    }
}

export const deleteCompany = async (id) => {
    try{
        await axios.delete(`http://localhost:8081/company/delete/${id}`)
    } catch(error) {
        console.error("Error deleting company",error)
    }
};

export const loadCompany = async () => {
    try {
       const result =  await axios.get(
            "http://localhost:8081/company/get/company",
            {
              validateStatus: () => {
                return true;
              },
            }
        
          );
          return result.data
    } catch (error) {
        console.error("Error load company", error)
    }
}