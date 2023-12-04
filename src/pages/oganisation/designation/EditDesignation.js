import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditDesignation = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [designation, setDesignation] = useState({
   designationName: "",
  });

  const {designationName } = designation;

  useEffect(() => {
    loadDesignation();
  }, []);

  const loadDesignation = async () => {
    const result = await axios.get(`http://localhost:8083/designation/get/${id}`);
    setDesignation(result.data);
  };

  const handleInputChange = (e) => {
    setDesignation({
      ...designation,
      [e.target.name]: e.target.value,
    });
  };

  const updateDesignation = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8083/designation/update/${id}`, designation);
    navigate("/view-designation");
  };

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <h2 className="mt-5">Edit Designation</h2>
      <form onSubmit={(e) => updateDesignation(e)}>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="designationName">
            Designation Name
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="designationName"
            id="designationName"
            required
            value={designationName}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="row mb-5">
          <div className="col-sm-2">
            <button type="submit" className="btn btn-outline-success btn-lg">
              Submit
            </button>
          </div>

          <div className="col-sm-2">
            <Link to={"/designation"} className="btn btn-outline-warning btn-lg">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditDesignation;

