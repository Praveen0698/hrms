import React from 'react'
import {Route, Routes} from 'react-router-dom';
import EditLocation from './EditLocation';


const RouteLocation = () => {
  return (
    <div>
       <Routes>
        <Route path={"/organisation/editlocation/:id"} element={<EditLocation />} />
        
      </Routes>
    </div>
  )
}

export default RouteLocation