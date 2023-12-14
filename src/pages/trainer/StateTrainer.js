import {useState} from 'react'


const StateTrainer = () => {
    const [formVisible, setFormVisible] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [overallTrainerRating, setOverallTrainerRating] = useState(0);
    const [uploadCertificate, setUploadCertificate] = useState("");
    const [formControl,setFormControl]=useState(false);
    const [trainer, setTrainer] = useState([]);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [recDelete,setRecDelete]=useState("");
   
   

    const [formData, setFormData] = useState({
        trainersFullName: "",
        emailAddress: "",
        phoneNo: "",
        technicalSkills: "",
        softSkills: "",
        industries: "",
        certifications: "",
        trainingProgramsOffered: "",
        preferredTrainingAudienece: "",
        trainingLanguages: "",
        availability: "",
        previousClients: "",
        trainingMaterialsProvided: "",
        additionalNotes: ""
    
      });
    return {
        formVisible, setFormVisible, toggle, setToggle,overallTrainerRating, setOverallTrainerRating,uploadCertificate, setUploadCertificate,formControl,setFormControl,formData,setFormData,trainer, setTrainer,search, setSearch,open, setOpen,recDelete,setRecDelete
 
    }
}

export default StateTrainer