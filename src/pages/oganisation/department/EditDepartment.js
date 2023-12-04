import React, {
  useEffect,
  useState,
} from "react";
import axios from "axios";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

const EditDepartment = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [department, setDepartment] = useState({
    departmentName: "",
    companyName: "",
    locationName: "",
    departmentHead: "",
  });
  const {
    departmentName, companyName, locationName, departmentHead
  } = department;

  useEffect(() => {
    loadDepartment();
  }, []);

  const loadDepartment = async () => {
    const result = await axios.get(
      `http://localhost:8083/department/get/${id}`
    );
    setDepartment(result.data);
  };

  const handleInputChange = (e) => {
    setDepartment({
      ...department,
      [e.target.name]: e.target.value,
    });
  };
  const updateDepartment = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:8083/department/update/${id}`,
      department
    );
    navigate("/view-department");
  };

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <h2 className="mt-5"> Edit Department</h2>
      <form onSubmit={(e) => updateDepartment(e)}>
        <div className="input-group mb-5">
          <label
            className="input-group-text"
            htmlFor="departmentName">
            Department Name
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="departmentName"
            id="departmentName"
            required
            value={departmentName}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="input-group mb-5">
          <label
            className="input-group-text"
            htmlFor="departmentType">
            Company
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="companyName"
            id="companyName"
            required
            value={companyName}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="input-group mb-5">
          <label
            className="input-group-text"
          >
            Location
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="locationName"
            id="locationName"
            required
            value={locationName}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="input-group mb-5">
          <label
            className="input-group-text"
          >
            Department Head
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="departmentHead"
            id="departmentHead"
            required
            value={departmentHead}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="row mb-5">
          <div className="col-sm-2">
            <button
              type="submit"
              className="btn btn-outline-success btn-lg">
              Save
            </button>
          </div>

          <div className="col-sm-2">
            <Link
              to={"/view-department"}
              type="submit"
              className="btn btn-outline-warning btn-lg">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditDepartment;
