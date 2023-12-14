import React from 'react'
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

const TrainerTable = ({trainer,setRecDelete}) => {

    const handleDelete = (id) => {
        setRecDelete(id)
    }

    console.log(trainer)
    
   
  return (
    <div>
      <table className="table table-bordered table-hover shadow">
              <thead>
                <tr className="text-center">
                  <th>Trainers Full Name</th>
                  <th>Trainers Email Address</th>
                  <th>Trainers Technical Skills</th>
                  <th>Trainers PhoneNo</th>
                  <th>Trainers Soft Skills</th>
                  <th>Certifications</th>
                  <th></th>
                  <th colSpan="3">Actions</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {trainer
                  .filter(
                    (st) =>
                      st.trainersFullName &&
                      st.trainersFullName.toLowerCase().includes()
                  )
                  .map((trainer, index) => (
                    <tr key={trainer.trainersListId}>
                      <th scope="row" key={index}>
                        {index + 1}
                      </th>
                      <td>{trainer.trainersFullName}</td>
                      <td>{trainer.emailAddress}</td>
                      <td>{trainer.technicalSkills}</td>
                      <td>{trainer.phoneNo}</td>
                      <td>{trainer.softSkills}</td>
                      <td>{trainer.certifications}</td>
                      <td className="mx-2">
                        <Link
                          to={`/Trainer-profile/${trainer.trainersListId}`}
                          className="btn btn-info"
                        >
                          <FaEye />
                        </Link>
                      </td>
                      <td className="mx-2">
                        <Link
                          to={`/edit-Trainer/${trainer.trainersListId}`}
                          className="btn btn-warning"
                        >
                          <FaEdit />
                        </Link>
                      </td>
                      <td className="mx-2">
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(trainer.trainersListId)}
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

export default TrainerTable