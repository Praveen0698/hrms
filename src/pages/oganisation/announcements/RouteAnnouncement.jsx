import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnnouncementsView from "./AnnouncementsView";
import EditAnnnouncements from "./EditAnnnouncements";
import AnnouncementsProfile from "./AnnouncementsProfile";

const RouteAnnouncement = () => {
  return (
    <div></div>
    // <BrowserRouter>
    //   <div>
    //     <Routes>
    //       <Route
    //         path={"/organisation/editannouncements"}
    //         element={<EditAnnnouncements />}
    //       />
    //       <Route
    //         path={"/organisation/announcementsprofile"}
    //         element={<AnnouncementsProfile />}
    //       />
    //     </Routes>
    //   </div>
    // </BrowserRouter>
  );
};

export default RouteAnnouncement;
