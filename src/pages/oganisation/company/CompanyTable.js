import React from 'react'
import { Link } from 'react-router-dom'
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
 
const CompanyTable = ({company,setRecDelete}) => {
  
    const handleDelete = (id) => {
        setRecDelete(id)
    }
    console.log(company);
  return (
    <div>
        <table className="table table-bordered table-hover shadow">
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>Company Name</th>
                  <th>Company Type</th>
                  <th>Email</th>
                  <th>Contact Number</th>
                  <th>CIN</th>
                  <th>GST</th>
                  <th>UAN</th>
                  <th colSpan="3">Actions</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {company.map((company, index) => (
                      <tr key={company.id}>
                        <th scope="row" key={index}>
                          {index + 1}
                        </th>
                        <td>{company.companyName}</td>
                        <td>{company.companyType}</td>
                        <td>{company.email}</td>
                        <td>{company.contactNumber}</td>
                        <td>{company.cin}</td>
                        <td>{company.gst}</td>
                        <td>{company.uan}</td>
                        <td className="mx-2">
                          <Link
                            to={`/organisation/editcompany/${company.companyId}`}
                            className="btn btn-info"
                          >
                            <FaEye />
                          </Link>
                        </td>
                        <td className="mx-2">
                          <Link
                            to={`/edit-company/${company.companyId}`}
                            className="btn btn-warning"
                          >
                            <FaEdit />
                          </Link>
                        </td>
                        <td className="mx-2">
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(company.companyId)}
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

export default CompanyTable