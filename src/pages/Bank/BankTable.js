import React from 'react'
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

const BankTable = ({addbank,setRecDelete}) => {

    const deleteBank = (id) => {
        setRecDelete(id)
    }

    console.log(addbank)
    
   
  return (
    <div>
        <table className="table table-bordered table-hover shadow">
              <thead>
                <tr className="text-center">
                  <th>SL.</th>
                  <th>Bank Name</th>
                  <th>Account Name</th>
                  <th>Account Number</th>
                  <th>Branch Name</th>
                  {/* <th>Status</th> */}
                  <th colSpan="3">Actions</th>

                </tr>
              </thead>

              <tbody className="text-center">
                {addbank && 
                 addbank.map((addbank, index) => (
                    <tr key={addbank.id}>
                      <th scope="row" key={index}>
                        {index + 1}
                      </th>
                      <td>{addbank.bankName}</td>
                      <td>{addbank.accountName}</td>
                      <td>{addbank.accountNumber}</td>
                      <td>{addbank.branchName}</td>


                      <td className="mx-2">

                        <Link
                          to={`/addbank-profile/${addbank.addBankId}`}
                          className="btn btn-info"
                        >
                          <FaEye />
                        </Link>
                      </td>
                      <td className="mx-2">
                        <Link
                          to={`/edit-addbank/${addbank.addBankId}`}
                          className="btn btn-warning"
                        >
                          <FaEdit />
                        </Link>
                      </td>
                      <td className="mx-2">
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteBank(addbank.addBankId)}
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
export  default BankTable;
