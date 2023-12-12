import React, { useEffect } from "react";

import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";

import Button from "@mui/material/Button";

import DialogContent from "@mui/material/DialogContent";

import { MdAdd } from "react-icons/md";
import Collapse from "@mui/material/Collapse";
import { BiSolidHide } from "react-icons/bi";
import { Card } from "@mui/material";

import * as api from "../AnnouncementApi"
import AnnouncementTable from "../AnnouncementTable";

import StateAnnouncement from "../StateAnnouncement";
import AnnouncementForm from "../AnnouncementForm";

const AnnouncementsView = () => {
  const {
    
    recDelete,
    setRecDelete,
    
    announcements,
    setAnnouncements,
    company,
    
    department,
    
    location,
   
    formVisible,
    setFormVisible,
    toggle,
    setToggle,
  } = StateAnnouncement();




  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    const result = await api.loadAnnouncements()
    setAnnouncements(result);
  };
 


  console.log("dept", department);
  console.log("loc", location);
  console.log("comp", company);
  console.log(announcements);
  const handleDelete = async () => {
    await api.deleteAnnouncement(recDelete)
    loadAnnouncements();
  };

  useEffect(() => {
    if (recDelete !== "") {
      handleDelete()
      setRecDelete("")
    }
  })

  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };
 

  // useEffect(() => {
  //   // Set the initial value to the current date
  //   const currentDate = new Date().toISOString().split('T')[0];
  //   setCreatedDate(currentDate);
  // }, []); // The empty dependency array ensures this runs only once on mount

  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <SideBar />
        <div className="head-foot-part">
          <section>
            <div
              className="above-table"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              {/* <Search search={search} setSearch={setSearch} /> */}
              <div>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setToggle(!toggle);
                    handleButtonClick();
                  }}
                  style={{ height: "35px", marginBottom: "10px" }}
                >
                  {toggle ? (
                    <div className="hide">
                      <BiSolidHide />
                      HIDE
                    </div>
                  ) : (
                    <div className="add">
                      <MdAdd />
                      ADD ANNOUNCEMENTS
                    </div>
                  )}
                </Button>
              </div>
            </div>

            <Collapse in={formVisible}>
              <Card
                variant="outlined"
                style={{ boxShadow: " 1px 1px 10px black" }}
              >
                <div>
                  <h3
                    style={{
                      textAlign: "center",
                      marginTop: "25px",
                      fontWeight: "600",
                    }}
                  >
                    ANNOUNCEMENTS
                  </h3>
                  <DialogContent>
                    <AnnouncementForm />
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <br />
            <AnnouncementTable  announcements={announcements} setRecDelete={setRecDelete}/>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsView;
