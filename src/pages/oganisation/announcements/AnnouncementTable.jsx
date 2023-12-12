import React from 'react'
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

const AnnouncementTable = ({announcements,setRecDelete}) => {

    const handleDelete = (id) => {
        setRecDelete(id)
    }
  return (
    <table className="table table-bordered table-hover shadow">
              <thead>
                <tr className="text-center">
                  <th>Sl.</th>
                  <th>Title</th>
                  <th>Start-Date</th>
                  <th>End-Date</th>
                  <th>Created-Date</th>
                  <th>Department Name</th>
                  <th>Location Name</th>
                  <th>Company Name</th>
                  <th>Summary</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {announcements.map((announcements, index) => (
                  <tr key={announcements.id}>
                    <td scope="row" key={index}>
                      {index + 1}
                    </td>
                    <td>{announcements.title}</td>
                    <td>{announcements.startDate}</td>
                    <td>{announcements.endDate}</td>
                    <td>{announcements.createdDate}</td>
                    <td>{announcements.departmentName}</td>
                    <td>{announcements.locationName}</td>
                    <td>{announcements.companyName}</td>
                    <td>{announcements.summary}</td>
                    <td>{announcements.description}</td>

                    <td className="mx-2">
                      <Link
                        to={`/announcements-profile/${announcements.announcementsId}`}
                        className="btn btn-info"
                      >
                        <FaEye />
                      </Link>
                    </td>
                    <td className="mx-2">
                      <Link
                        to={`/edit-annnouncements/${announcements.announcementsId}`}
                        className="btn btn-warning"
                      >
                        <FaEdit />
                      </Link>
                    </td>
                    <td className="mx-2">
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          handleDelete(announcements.announcementsId)
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

export default AnnouncementTable