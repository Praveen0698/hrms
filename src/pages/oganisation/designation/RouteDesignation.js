import React from 'react'
import {Route, Routes} from 'react-router-dom';
import EditDesignation from './EditDesignation';

const RouteDesignation = () => {
  return (
    <div>
     <Routes>
        <Route path={"/organisation/editdesignation/:id"} element={<EditDesignation />} />
        
      </Routes>
    </div>
  )
}

export default RouteDesignation;