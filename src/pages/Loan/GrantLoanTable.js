import React from 'react'
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

const GrantLoanTable = ({loan,setRecDelete}) => {

    const handleDelete = (id) => {
        setRecDelete(id)
    }

    console.log(loan)
    
   
  return (
    <div>
        <table className="table table-bordered table-hover shadow">
        <thead>
          <tr className="text-center">
            <th>Sl.</th>
            <th>Employee Name</th>
            <th>Permitted By</th>
            <th>Loan Details</th>
            <th>Amount</th>
            <th>Interest</th>
            <th>Installment Period</th>
            <th>Installment Cleared</th>
            <th>Repayment Total</th>
            <th>Total Payment Cleared</th>
            {/* <th>Status</th> */}
            <th colSpan="3">Actions</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {loan && loan.map((loan, index) => (
              <tr key={loan.id}>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{loan.employeeName}</td>
                <td>{loan.permittedBy}</td>
                <td>{loan.loanDetails}</td>
                <td>{loan.amount}</td>
                <td>{loan.installment}</td>
                <td>{loan.installmentPeriod}</td>
                <td>{loan.installmentCleared}</td>
                <td>{loan.repaymentTotal}</td>
                <td>{loan.totalPaymentCleared}</td>
                <td className="mx-2">
                  <Link
                    to={`/grantloan-profile/${loan.grantLoanId}`}
                    className="btn btn-info"
                  >
                    <FaEye />
                  </Link>
                </td>
                <td className="mx-2">
                  <Link
                    to={`/edit-grantloan/${loan.grantLoanId}`}
                    className="btn btn-warning"
                  >
                    <FaEdit />
                  </Link>
                </td>
                <td className="mx-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(loan.grantLoanId)}
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

export default GrantLoanTable;