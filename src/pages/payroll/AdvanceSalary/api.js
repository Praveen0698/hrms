import axios from 'axios';

export const saveAdvanceSalary = async (formData) => {
    try{
        await axios.post(
            "http://localhost:8085/advancesalery/create/advancesalery",
            formData
          );
    } catch(error) {
        console.error("saveAdvanceSalary",error)
    }
}

export const deleteAdvanceSalary = async (id) => {
    try{
        await axios.delete(`http://localhost:8085/advancesalery/delete/${id}`)
    } catch(error) {
        console.error("Error deleting Advance Salary",error)
    }
};

export const loadAdvanceSalary = async () => {
    try {
       const result =  await axios.get(
            "http://localhost:8085/advancesalery/create/advancesalery",
            {
              validateStatus: () => {
                return true;
              },
            }
        
          );
          return result.data
    } catch (error) {
        console.error("Error load Advance Salary", error)
    }
}

export const fetchCompanies = async () => {
    try {
        const response = await axios.get(
            "http://localhost:8085/advancesalery/create/advancesalery"
          );
          return response.data
    } catch (error){
        console.error("Error fetching company data", error);
        return []
    }
}

export const fetchLocations = async () => {
    try {
        const response = await axios.get(
          "http://localhost:8085/advancesalery/create/advancesalery"
        );
       return response.data 
      } catch (error) {
        console.error("Error fetching Advance Salary data", error);
      }
}