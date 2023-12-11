import React from "react";

import DashboardFile from "./sidebarComponent/DashboardFile";
import Organisationfile from "./sidebarComponent/Organisationfile";
import EmployeesFile from "./sidebarComponent/EmployeesFile";
import PerformanceFile from "./sidebarComponent/PerformanceFile";
import TimesheetsFile from "./sidebarComponent/TimesheetsFile";
import PayrollFile from "./sidebarComponent/PayrollFile";
import ProjectsFile from "./sidebarComponent/ProjectsFile";
import TicketsFile from "./sidebarComponent/TicketsFile";
import WorksheetsFile from "./sidebarComponent/Worksheetsfile";
import Bankfile from "./sidebarComponent/Bankfile";
import Loanfile from "./sidebarComponent/Loanfile";
import Accountfile from "./sidebarComponent/Accountfile";
import ProcurementFile from "./sidebarComponent/ProcurementFile";
import Recuitmentfile from "./sidebarComponent/Recuitmentfile";
import Trainingfile from "./sidebarComponent/Trainingfile";

const SideBar = () => {
  return (
    <>
      <div className="sidebar-container">
        <DashboardFile />
        <Organisationfile />
        <EmployeesFile />
        <PerformanceFile />
        <TimesheetsFile />
        <PayrollFile />
        <ProjectsFile />
        <TicketsFile />
        <WorksheetsFile />
        <Bankfile />
        <Loanfile />
        <Accountfile />
        <ProcurementFile />
        <Recuitmentfile />
        <Trainingfile />
      </div>
    </>
  );
};

export default SideBar;
