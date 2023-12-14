import React, { useEffect } from "react";

import SideBar from "../../../../components/SideBar";
import Header from "../../../../components/Header";

import * as api from "../api"
import StateLocation from "../StateLocation";
import LocationTable from "../LocationTable";
import LocationForm from "../LocationForm";

import { MdAdd } from "react-icons/md";
import { BiSolidHide } from "react-icons/bi";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import Collapse from "@mui/material/Collapse";

import { Card } from "@mui/material";

const LocationView = () => {

 const {toggle,setToggle,formVisible,setFormVisible,location,setLocation,recDelete,setRecDelete} = StateLocation()

  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

  useEffect(() => {
    loadLocation();
  }, []);

  const loadLocation = async () => {
    const result = await api.loadLocation()
    setLocation(result);
  };

  const handleDelete = async () => {
    await api.deleteLocation(recDelete)
    loadLocation();
  };

  useEffect(() => {
    if (recDelete !== "") {
      handleDelete()
      setRecDelete("")
    }
  })

  // const [faxError, setFaxError] = useState(false);
  // const [addressError, setAddressError] = useState(false);

  

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
              <div>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setToggle(!toggle);
                    handleButtonClick();
                  }}
                  style={{ height: "35px", marginBottom: "10px " }}
                >
                  {toggle ? (
                    <div className="hide">
                      <BiSolidHide />
                      HIDE
                    </div>
                  ) : (
                    <div className="add">
                      <MdAdd />
                      ADD LOCATION
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
                <div style={{ marginTop: "20px" }}>
                  <h3
                    style={{
                      textAlign: "center",
                      marginTop: "25px",
                      fontWeight: "600",
                    }}
                  >
                    LOCATION FORM
                  </h3>
                  <DialogContent>
                    <LocationForm/>
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
           <LocationTable location={location} setRecDelete={setRecDelete} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default LocationView;
