import React from 'react'
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

const TicketTable = ({ticket,setRecDelete}) => {

    const handleDelete = (id) => {
        setRecDelete(id)
    }

    console.log(ticket)
    
   
  return (
    <div>
       <table className="table table-bordered table-hover shadow">
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>Ticket Code</th>
                  <th>Subject</th>
                  <th>Employee</th>
                  <th>Date</th>
                  <th colSpan="3">Actions</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {ticket
                  .filter(
                    (st) =>
                      st.subject && st.subject.toLowerCase().includes()
                  )
                  .map((ticket, index) => (
                    <tr key={ticket.ticketsId}>
                      <th scope="row" key={index}>
                        {index + 1}
                      </th>
                      <td>{ticket.ticketsCode}</td>
                      <td>{ticket.subject}</td>
                      <td>{ticket.employeeName}</td>
                      <td>{ticket.date}</td>
                      <td className="mx-2">
                        <Link
                          to={`/edit-ticket/${ticket.ticketsId}`}
                          className="btn btn-warning"
                        >
                          <FaEdit />
                        </Link>
                      </td>
                      <td className="mx-2">
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(ticket.ticketsId)}
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

export default TicketTable