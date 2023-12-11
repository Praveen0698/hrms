import React from 'react'
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

const DepartmentTable = ({department,setRecDelete}) => {

    const handleDelete = (id) => {
        setRecDelete(id)
    }

    console.log(department)
    
   
  return (
    <div>
        <table className="table table-bordered table-hover shadow">
              <thead>
                <tr className="text-center">
                  <th>SL.</th>
                  <th>Department Name</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Department Head</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {department
                  
                  .map((department, index) => (
                    <tr key={index}>
                      <th scope="row" key={index}>
                        {index + 1}
                      </th>
                      <td>{department.departmentName}</td>
                      <td>{department.companyName}</td>
                      <td>{department.locationName}</td>
                      <td>{department.departmentHead}</td>
                      <td>{department.status}</td>
                      <td className="mx-2">
                        <Link
                          to={`/department-profile/${department.departmentId}`}
                          className="btn btn-info"
                        >
                          <FaEye />
                        </Link>
                      </td>
                      <td className="mx-2">
                        <Link
                          to={`/edit-department/${department.departmentId}`}
                          className="btn btn-warning"
                        >
                          <FaEdit />
                        </Link>
                      </td>
                      <td className="mx-2">
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(department.departmentId)}
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
    </div>
  )
}

export default DepartmentTable