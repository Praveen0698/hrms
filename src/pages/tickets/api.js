import axios from 'axios';

export const saveTicket = async (formData) => {
    try{
        await axios.post(
            "http://localhost:8089/tickets/create/tickets",
            formData
          );
    } catch(error) {
        console.error("saveTicket",error)
    }
}

export const deleteTicket = async (id) => {
    try{
        await axios.delete(`http://localhost:8089/tickets/delete/${id}`)
    } catch(error) {
        console.error("Error deleting department",error)
    }
};

export const loadTicket = async () => {
    try {
       const result =  await axios.get(
        "http://localhost:8089/tickets/get/tickets",
            {
              validateStatus: () => {
                return true;
              },
            }
        
          );
          return result.data
    } catch (error) {
        console.error("Error load ticket", error)
    }
}

export const fetchEmployee = async () => {
    try {
        const response = await axios.get(
            "http://localhost:8082/employee/get/employee"
          );
          return response.data
    } catch (error){
        console.error("Error fetching employee data", error);
        return []
    }
}

