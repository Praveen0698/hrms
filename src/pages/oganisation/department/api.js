import axios from 'axios';

export const saveDepartment = async (formData) => {
    try{
        await axios.post(
            "http://localhost:8081/department/create/department",
            formData
          );
    } catch(error) {
        console.error("saveDepartment",error)
    }
}

export const deleteDepartment = async (id) => {
    try{
        await axios.delete(`http://localhost:8081/department/delete/${id}`)
    } catch(error) {
        console.error("Error deleting department",error)
    }
};

export const loadDepartment = async () => {
    try {
       const result =  await axios.get(
            "http://localhost:8081/department/get/department",
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

export const fetchCompanies = async () => {
    try {
        const response = await axios.get(
            "http://localhost:8081/company/get/company"
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
          "http://localhost:8081/location/get/location"
        );
       return response.data 
      } catch (error) {
        console.error("Error fetching department data", error);
      }
}