import React from 'react'
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Design = ({designation,setRecDelete}) => {

    const handleDelete = (id) => {
        setRecDelete(id)
    }
  return (
    <table className="table table-bordered table-hover shadow">
    <thead>
      <tr className="text-center">
        <th>ID</th>
        <th>Department Name</th>
        <th>Designation Type</th>
        <th>created Date</th> 
        <th>Status</th>
        <th colSpan="3">Actions</th>
      </tr>
    </thead>

    <tbody className="text-center">
      {designation
        .map((designation, index) => (
          <tr key={designation.designationId}>
            <th scope="row" key={index}>
              {index + 1}
            </th>
            <td>{designation.departmentName}</td>
            <td>{designation.designationName}</td>
            <td>{designation.createdDate}</td>
            <td>{designation.status}</td>
           
            <td className="mx-2">
              <Link
                to={`/organisation/edit-designation/${designation.designationId}`}
                className="btn btn-warning"
              >
                <FaEdit />
              </Link>
            </td>
            <td className="mx-2">
              <button
                className="btn btn-danger"
                onClick={() =>
                  handleDelete(designation.designationId)
                }
              >
                <FaTrashAlt />
              </button>
            </td>
          </tr>
        ))}
    </tbody>
  </table>
  )
}

export default Design