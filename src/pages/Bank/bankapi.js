import axios from 'axios';

export const saveAddbank = async (formData) => {
    try{
        await axios.post(
            "http://localhost:8092/addbank/create/addbank",
            formData
          );
    } catch(error) {
        console.error("saveAddBank",error)
    }
}

export const deleteBank = async (id) => {
    try{
        await axios.delete(`http://localhost:8092/addbank/delete/${id}`)
    } catch(error) {
        console.error("Error deleting addbank",error)
    }
};

export const loadAddbank = async () => {
    try {
       const result =  await axios.get(
            "http://localhost:8092/addbank/get/addbank",
            {
              validateStatus: () => {
                return true;
              },
            }
        
          );
          return result.data
    } catch (error) {
        console.error("Error loading addbank", error)
    }
}


