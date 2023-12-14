import React from 'react'
import { FaEye,FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const PerformanceTable = ({performances,setRecDelete}) => {
    const handleDelete = (id) => {
        setRecDelete(id)
    }
  return (
    <table className="table table-bordered table-hover shadow">
          <thead>
            <tr className="text-center">
            <th>Serial No</th>
              <th>Employee name</th>
              <th>Employee id </th>
              <th>Quality of Work Rating</th>
              <th> Rating</th>
              <th>Punctuality Rating</th>
              <th>Problem Solving Skills Rating Rating</th>

              <th colSpan="3">Actions</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {performances
             
              .map((performances, index) => (
                <tr key={performances.id}>
                  <th scope="row" key={index}>
                    {index + 1}
                  </th>
                  <td>{performances.performancesName}</td>
                  <td>{performances.performancesType}</td>
                  <td>{performances.email}</td>
                  <td>{performances.website}</td>
                  <td className="mx-2">
                    <Link
                      to={`/performances-profile/${performances.performancesId}`}
                      className="btn btn-info"
                    >
                      <FaEye />
                    </Link>
                  </td>
                  <td className="mx-2">
                    <Link
                      to={`/edit-performances/${performances.performancesId}`}
                      className="btn btn-warning"
                    >
                      <FaEdit />
                    </Link>
                  </td>
                  <td className="mx-2">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(performances.performancesId)}
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

export default PerformanceTable