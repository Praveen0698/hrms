import React from "react";
import {  Routes, Route } from "react-router-dom";
import EditAnnnouncements from "./EditAnnnouncements";
import AnnouncementsProfile from "./AnnouncementsProfile";

const RouteAnnouncement = () => {
  return (
    
     
      <div>
        <Routes>
          <Route
            path={"/organisation/editannouncements"}
             element={<EditAnnnouncements />}
          />
          <Route
            path={"/organisation/announcementsprofile"}
            element={<AnnouncementsProfile />}
          />
        </Routes>
      </div>
    
  );
};

export default RouteAnnouncement;
