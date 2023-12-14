import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link, useNavigate, useParams } from "react-router-dom";

const EditLoan = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [loan, setLoan] = useState({
    employeeName: "",
    permittedBy: "",
    loanDetails: "",
    approveDate: "",
    repaymentForm: "",
    Amount: "",
    interestPersentage: "",
    installmentPeriod: "",
    repaymentTotal: "",
    installment: "",
    status: "",
  });
  const {
    employeeName,
    permittedBy,
    loanDetails,
    approveDate,
    repaymentForm,
    Amount,
    interestPersentage,
    installmentPeriod,
    repaymentTotal,
    installment,
    status,
  } = loan;

  useEffect(() => {
    loadLoan();
  }, []);
  const loadLoan = async () => {
    const result = await axios.get(
        `http://localhost:8089/grantloan/get/${id}`
    );
    setLoan(result.data);
};

  const handleInputChange = (e) => {
    setLoan({
      ...loan,
      [e.target.name]: e.target.value,
    });
  };
const updateLoan = async (e) => {
    e.preventDefault();
    await axios.put(
        `http://localhost:8089/grantloan/update/${id}`,
      loan
    );
    navigate("/Loan");
};

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <h2 className="mt-5"> Edit Loan</h2>
      <form onSubmit={(e) => updateLoan(e)}>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="LoanName">
            Employee Name
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="employeeName"
            id="employeeName"
            required
            value={employeeName}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="LoanType">
            Permitted By
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="permittedBy"
            id="permittedBy"
            required
            value={permittedBy}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text">Loan Details</label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="loanDetails"
            id="loanDetails"
            required
            value={loanDetails}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="website">
            Approve Date
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="approveDate"
            id="approveDate"
            required
            value={approveDate}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="website">
            Repayment Form
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="repaymentForm"
            id="repaymentForm"
            required
            value={repaymentForm}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="website">
            Amount
          </label>
          <input
            className="form-control col-sm-6"
            type="number"
            name="Amount"
            id="Amount"
            required
            value={Amount}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="website">
            Interest Percentage
          </label>
          <input
            className="form-control col-sm-6"
            type="number"
            name="interestPersentage"
            id="interestPersentage"
            required
            value={interestPersentage}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="website">
            Installment Period
          </label>
          <input
            className="form-control col-sm-6"
            type="number"
            name="installmentPeriod"
            id="installmentPeriod"
            required
            value={installmentPeriod}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="website">
            Repayment Total
          </label>
          <input
            className="form-control col-sm-6"
            type="number"
            name="repaymentTotal"
            id="repaymentTotal"
            required
            value={repaymentTotal}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="website">
            Installment
          </label>
          <input
            className="form-control col-sm-6"
            type="number"
            name="installment"
            id="installment"
            required
            value={installment}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="row mb-5">
          <div className="col-sm-2">
            <button type="submit" className="btn btn-outline-success btn-lg">
              Save
            </button>
          </div>

          <div className="col-sm-2">
            <Link
              to={"/organisation/Loan"}
              type="submit"
              className="btn btn-outline-warning btn-lg"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditLoan;
