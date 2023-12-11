import React from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import MainFile from "./MainFile";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <SideBar />
        <div className="head-foot-part" style={{ padding: "0" }}>
          <MainFile />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

