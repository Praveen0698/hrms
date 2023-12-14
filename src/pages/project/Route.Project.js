import React from 'react'
import {Route, Routes} from "react-router-dom"
import ProjectEdit from './ProjectEdit';

const RouteProject = () => {
  return (
    <div>
        <Routes>
            <Route path={"/project/projectedit/:id"} element={<ProjectEdit />}/>
        </Routes>
    </div>
  )
}

export default RouteProject;