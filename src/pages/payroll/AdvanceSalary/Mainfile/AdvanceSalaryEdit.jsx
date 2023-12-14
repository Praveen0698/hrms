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
  
  const EditProject = () => {
    let navigate = useNavigate();
  
    const { id } = useParams();
  
    const [project, setProject] = useState({
      projectTitle: "",
    clientName: "",
    companyName: "",
    startDate: "",
    endDate: "",
    projectManagers: "",
    priority: "",
    description: "",
    summary: "",
    });
    const {
      projectTitle,
    clientName,
    companyName,
    startDate,
    endDate,
    projectManagers,
    priority,
    description,
    summary
  
    useEffect(() => {
      loadProject();
    }, []);
  
    const loadProject = async () => {
      const result = await axios.get(
        `http://localhost:8086/projects/get/${id}`
      );
      setProject(result.data);
    };
  
    const handleInputChange = (e) => {
      setProject({
        ...project,
        [e.target.name]: e.target.value,
      });
    };
    const updateProject = async (e) => {
      e.preventDefault();
      await axios.put(
        `http://localhost:8086/projects/update/${id}`,
        project
      );
      navigate("/project-view");
    };
  
    return (
      <div className="col-sm-8 py-2 px-5 offset-2 shadow">
        <h2 className="mt-5"> Edit Project</h2>
        <form onSubmit={(e) => updateProject(e)}>
          <div className="input-group mb-5">
            <label
              className="input-group-text"
              htmlFor="projectTitle">
              Project Title
            </label>
            <input
              className="form-control col-sm-6"
              type="text"
              name="projectTitle"
              id="projectTitle"
              required
              value={projectTitle}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
  
          <div className="input-group mb-5">
            <label
              className="input-group-text"
              htmlFor="clientName">
              Client Name
            </label>
            <input
              className="form-control col-sm-6"
              type="text"
              name="clientName"
              id="clientName"
              required
              value={clientName}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
  
          <div className="input-group mb-5">
            <label
              className="input-group-text"
            >
            Company Name
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
            Start Date
            </label>
            <input
              className="form-control col-sm-6"
              type="date"
              name="startDate"
              id="startDate"
              required
              value={startDate}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="input-group mb-5">
          <label
            className="input-group-text"
          >
          End Date
          </label>
          <input
            className="form-control col-sm-6"
            type="date"
            name="endDate"
            id="endDate"
            required
            value={endDate}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input-group mb-5">
        <label
          className="input-group-text"
        >
        Project Managers
        </label>
        <input
          className="form-control col-sm-6"
          type="text"
          name=" projectManagers"
          id=" projectManagers"
          required
          value={ projectManagers}
          onChange={(e) => handleInputChange(e)}
        />
      </div>
      <div className="input-group mb-5">
      <label
        className="input-group-text"
      >
      Priority
      </label>
      <input
        className="form-control col-sm-6"
        type="text"
        name=" priority"
        id=" priority"
        required
        value={ priority}
        onChange={(e) => handleInputChange(e)}
      />
    </div>
    <div className="input-group mb-5">
    <label
      className="input-group-text"
    >
    Description
    </label>
    <input
      className="form-control col-sm-6"
      type="text"
      name=" description"
      id="description"
      required
      value={ description}
      onChange={(e) => handleInputChange(e)}
    />
  </div>
  <div className="input-group mb-5">
  <label
    className="input-group-text"
  >
  Summary
  </label>
  <input
    className="form-control col-sm-6"
    type="text"
    name=" summary"
    id=" summary"
    required
    value={ summary}
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
  
  export default EditProject;
  