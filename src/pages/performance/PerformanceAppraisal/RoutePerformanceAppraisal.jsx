import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PerformancesAppraisalView from './PerformancesAppraisalView'

const RoutePerformanceAppraisal = () => {
  return (
    <div>
        <Routes>
        <Route path={"/performance/PerformanceAppraisal"} element={<PerformancesAppraisalView />} />
      </Routes>
    </div>
  )
}

export default RoutePerformanceAppraisal