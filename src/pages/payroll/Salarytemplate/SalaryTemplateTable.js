import React from 'react'
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

const DepartmentTable = ({payroll,setRecDelete}) => {

    const handleDelete = (id) => {
        setRecDelete(id)
    }

    console.log(payroll);
    
   
  return (
    <div>
        <table className="table table-bordered table-hover shadow">
              <thead>
                <tr className="text-center">
                  <th>SL.</th>
                  <th>Payroll Template</th>
                  <th>Basic Salary</th>
                  <th>Net Salary</th>
                  <th>Created Date</th>
                  <th colSpan="3">Actions</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {payroll
                  
                  .map((payroll, index) => (
                    <tr key={index}>
                      <th scope="row" key={index}>
                        {index + 1}
                      </th>
                      <td>{payroll.salaryTemplate}</td>
                      <td>{payroll.basicSalary}</td>
                      <td>{payroll.netSalary}</td>
                      <td>{payroll.createdDate}</td>
                      <td className="mx-2">
                        <Link
                          to={`/department-profile/${payroll.payrollId}`}
                          className="btn btn-info"
                        >
                          <FaEye />
                        </Link>
                      </td>
                      <td className="mx-2">
                        <Link
                          to={`/edit-department/${payroll.payrollId}`}
                          className="btn btn-warning"
                        >
                          <FaEdit />
                        </Link>
                      </td>
                      <td className="mx-2">
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(payroll.payrollId)}
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