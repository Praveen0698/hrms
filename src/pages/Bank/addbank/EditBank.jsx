import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link, useNavigate, useParams } from "react-router-dom";

const EditBank = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [loan, setLoan] = useState({
    bankName: "",
    accountName: "",
    accountNumber: "",
    accountType: "",
    branchName: "",
  });
  const {
    bankName,
    accountName,
    accountNumber,
    accountType,
    branchName,
  } = loan;

  useEffect(() => {
    loadLoan();
  }, []);
  const loadLoan = async () => {
    const result = await axios.get(
        `http://localhost:8092/addbank/get/${id}`
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
        `http://localhost:8092/addbank/update/${id}`,
      loan
    );
    navigate("/Loan");
};

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <h2 className="mt-5">Edit Bank</h2>
      <form onSubmit={(e) => updateLoan(e)}>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="LoanName">
            Bank Name
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="bankName"
            id="bankName"
            required
            value={bankName}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="LoanType">
           Account Name
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="accountName"
            id="accountName"
            required
            value={accountName}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text">Account Number</label>
          <input
            className="form-control col-sm-6"
            type="number"
            name="accountNumber"
            id="accountNumber"
            required
            value={accountNumber}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="website">
            Account Date
          </label>
          <input
            className="form-control col-sm-6"
            type="date"
            name="accountType"
            id="accountType"
            required
            value={accountType}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="website">
            Branch Name
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="branchName"
            id="branchName"
            required
            value={branchName}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        {/* <div className="input-group mb-5">
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
        </div> */}

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

export default EditBank;
