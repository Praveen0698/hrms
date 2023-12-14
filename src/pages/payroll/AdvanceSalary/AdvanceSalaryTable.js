import React from 'react'
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

const AdvanceSalaryTable = ({advanceSalary,setRecDelete}) => {

    const handleDelete = (id) => {
        setRecDelete(id)
    }

    console.log(advanceSalary)
    
   
  return (
    <div>
        <table className="table table-bordered table-hover shadow">
              <thead>
                <tr className="text-center">
                <th>SL.</th>
              <th>Employee name</th>
              <th>Salary</th>
              <th>Advance Amount</th>
              <th>Salary Due</th>
              <th>Salary Month & Year</th>
              {/* <th>Status</th> */}
              <th colSpan="3">Actions</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {advanceSalary && 
                advanceSalary.map((advanceSalary, index) => (
                    <tr key={index}>
                      <th scope="row" key={index}>
                        {index + 1}
                      </th>
                      <td>{advanceSalary.employeeName}</td>
                      <td>{advanceSalary.salary}</td>
                      <td>{advanceSalary.advanceAmount}</td>
                      <td>{advanceSalary.salaryDue}</td>
                      <td>{advanceSalary.monthAndYear}</td>
                     
                      <td className="mx-2">
                        <Link
                          to={`/edit-advanceSalary/${advanceSalary.advanceSalaryId}`}
                          className="btn btn-warning"
                        >
                          <FaEdit />
                        </Link>
                      </td>
                      <td className="mx-2">
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(advanceSalary.advanceSalaryId)}
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

export default AdvanceSalaryTable