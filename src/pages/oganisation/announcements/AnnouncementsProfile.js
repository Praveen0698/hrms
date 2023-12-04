import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AnnouncementsProfile = () => {
  const { id } = useParams();

  const [announcements, setAnnouncements] = useState({
    title: " ",
    startDate: " ",
    endDate: " ",
    companyName: " ",
    locationName: " ",
    departmentName: " ",
    summary: " ",
    description: " ",
  });

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    const result = await axios.get(
      `http://localhost:8083/announcement/get/${id}`
    );
    setAnnouncements(result.data);
  };

  return (
    <section className="shadow" style={{ backgroundColor: "whitesmoke" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-3">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: 150 }}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="card mb-4">
              <div className="card-body">
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h5 className="mb-0">Title :</h5>
                  </div>

                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{announcements.title}</p>
                  </div>
                  <div className="row">
                    <div className="col-sm-3">
                      <h5 className="mb-0">Start-Date :</h5>
                    </div>

                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {announcements.startDate}
                      </p>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <h5 className="mb-0">End-Date :</h5>
                      </div>

                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {announcements.endDate}
                        </p>
                      </div>
                      <div className="row">
                        <div className="col-sm-3">
                          <h5 className="mb-0">Department :</h5>
                        </div>

                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {announcements.departmentName}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-3">
                          <h5 className="mb-0">Company :</h5>
                        </div>

                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {announcements.companyName}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-3">
                          <h5 className="mb-0">Location :</h5>
                        </div>

                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {announcements.locationName}
                          </p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-3">
                          <h5 className="mb-0">Summary :</h5>
                        </div>

                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {announcements.summary}
                          </p>
                        </div>
                      </div>

                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                        <h5 className="mb-0">Description :</h5>
                        </div>

                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {announcements.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnnouncementsProfile;
