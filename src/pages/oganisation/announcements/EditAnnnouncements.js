import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditAnnnouncements = () => {
  let navigate = useNavigate();
  const { id } = useParams();

  const [announcement, setAnnouncement] = useState({
    title: " ",
    startDate: " ",
    endDate: " ",
    companyName: " ",
    locationName: " ",
    departmentName: " ",
    summary: " ",
    description: " ",
  });

  const {
    title,
    startDate,
    endDate,
    companyName,
    departmentName,
    locationName,
    summary,
    description
  } = announcement;

  useEffect(() => {
    loadAnnouncement();
  }, []);

  const loadAnnouncement = async () => {
    const result = await axios.get(
      `http://localhost:8083/announcement/get/${id}`
    );
    setAnnouncement(result.data);
  };

  const handleInputChange = (e) => {
    setAnnouncement({
      ...announcement,
      [e.target.name]: e.target.value,
    });
  };

  const updateAnnouncement = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:8083/announcement/update/${id}`,
      announcement // Fix: should be announcement, not company
    );
    navigate("/announcements");
  };

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <h2 className="mt-5"> Edit Announcement</h2>
      <form onSubmit={(e) => updateAnnouncement(e)}>
        {/* ... (other input fields) ... */}

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="title">
            Title
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="title"
            id="title"
            required
            value={title}
            onChange={(e) => handleInputChange(e)}
          />
          </div>
          <div className="input-group mb-5">
           <label className="input-group-text" htmlFor="start-date">
            Start-Date
          </label>
          <input
            className="form-control col-sm-6"
            type="date"
            name="startDate"
            id="start-date"
            required
            value={startDate}
            onChange={(e) => handleInputChange(e)}
          />
          </div>
          <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="endDate">
           End-Date
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
          <label className="input-group-text" htmlFor="companyName">
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
          <label className="input-group-text" htmlFor="departmentName">
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
          <label className="input-group-text" htmlFor="locationName">
           Location Name
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
          <label className="input-group-text" htmlFor="summary">
            Summary
          </label>
           <input
            className="form-control col-sm-6"
            type="text"
            name="summary"
            id="summary"
            required
            value={summary}
            onChange={(e) => handleInputChange(e)}
          />
          </div>
          <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="description">
            Description
          </label>
           <input
            className="form-control col-sm-6"
            type="text"
            name="description"
            id="description"
            required
            value={description}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="row mb-5">
          <div className="col-sm-2">
            <button
              type="submit"
              className="btn btn-outline-success btn-lg" 
            >
              Update
            </button>
          </div>

          <div className="col-sm-2">
            <Link
              to={"/announcements"}
              type="submit"
              className="btn btn-outline-warning btn-lg"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditAnnnouncements;
