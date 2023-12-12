import React from 'react'
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ExpensesTable = ({expenses,setRecDelete}) => {

    const handleDelete = (id) => {
        setRecDelete(id)
    }

  return (
    <table className="table table-bordered table-hover shadow">
              <thead>
                <tr className="text-center">
                  <th>SL.</th>
                  <th>Expense Type</th>
                  <th>Purchase Date</th>
                  <th>Amount</th>
                  <th>Purchased By</th>
                  <th>Remarks</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {expenses
                 
                  .map((expense, index) => (
                    <tr key={expense.expenceId}>
                      <th scope="row" key={index}>
                        {index + 1}
                      </th>
                      <td>{expense.expenceType}</td>
                      <td>{expense.purchaseDate}</td>
                      <td>{expense.amount}</td>
                      <td>{expense.purchaseBy}</td>
                      <td>{expense.remarks}</td>
                      <td>{expense.status}</td>
                      <td className="mx-2">
                        <Link
                          to={`/organisation/expenses-profile/${expense.expenceId}`}
                          className="btn btn-info"
                        >
                          <FaEye />
                        </Link>
                      </td>
                      <td className="mx-2">
                        <Link
                          to={`/organisation/edit-expenses/${expense.expenceId}`}
                          className="btn btn-warning"
                        >
                          <FaEdit />
                        </Link>
                      </td>
                      <td className="mx-2">
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(expense.expenceId)}
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

export default ExpensesTable