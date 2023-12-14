import React from 'react'
import { Link } from 'react-router-dom' 
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const LocationTable = ({location,setRecDelete}) => {

    const handleDelete = (id) =>{
        setRecDelete(id)
    }
    console.log("data",location)
  return (
    <div>
         <table className="table table-bordered table-hover shadow">
              <thead>
                <tr className="text-center">
                  <th>Sl No</th>
                  <th>Company Name</th>
                  <th>Location Name</th>
                  <th>Email</th>
                  <th>Location Head</th>
                  <th>Address</th>
                  <th>Fax Number</th>
                  <th>Phone Number</th>
                  <th>Status</th>

                  <th colSpan="3">Action</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {location.map((item, index) => (
                  <tr key={location.id}>
                    <th scope="row" key={index}>
                      {index + 1}
                    </th>
                    <td>{item.companyName}</td>
                    <td>{item.locationName}</td>
                    <td>{item.email}</td>
                    <td>{item.locationHead}</td>
                    <td>{item.address}</td>
                    <td>{item.faxNumber}</td>
                    <td>{item.phone}</td>
                    <td>{item.status}</td>

                    <td className="mx-2">
                      <Link
                        to={`/edit-location/${location.locationId}`}
                        className="btn btn-warning"
                      >
                        <FaEdit />
                      </Link>
                    </td>
                    <td className="mx-2">
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(location.locationId)}
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

export default LocationTable