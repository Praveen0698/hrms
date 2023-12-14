
import React, {
	useEffect,
	useState,
} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const GrantLoanProfile = () => {
	const { id } = useParams();

	const [loan, setLoan] = useState({
		    employeeName: "",
        permittedBy: "",
         loanDetails: "",
         approveDate: "",
         repaymentForm: "",
         Amount: "",
         interestPersentage: "",
	});
    useEffect(() => {
        loadLoan();
      }, []);

const loadLoan = async () => {
    const result = await axios.get(
        `http://localhost:8089/grantloan/get/${id}`
    );
    setLoan(result.data);
};

  return (<div
    className="shadow"
     style={{backgroundColor: "whitesmoke" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-3">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: 150 }}
                />
                <h5 className="my-3">
                  {`${loan.employeeName} ${loan.companyName}`}
                </h5>
                <div className="d-flex justify-content-center mb-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary">
                    call
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-warning ms-1">
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>
          

              <div className="col-lg-9">
                <div className="card mb-4">
                  <div className="card-body">
                    <hr />

                    <div className="row">
                      <div className="col-sm-3">
                        <h5 className="mb-0">Employee Name</h5>
                      </div>

                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {loan.employeeName}
                        </p>
                      </div>
                    </div>

                    <hr />

                    <div className="row">
                      <div className="col-sm-3">
                        <h5 className="mb-0">Permitted By</h5>
                      </div>

                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{loan.employeeName}</p>
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col-sm-3">
                        <h5 className="mb-0">Loan Details</h5>
                      </div>

                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{loan.permittedBy}</p>
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col-sm-3">
                        <h5 className="mb-0">Approve Date</h5>
                      </div>

                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{loan.approveDate}</p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-3">
                        <h5 className="mb-0">Repayment Form</h5>
                      </div>

                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {loan.repaymentForm}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <h5 className="mb-0">Amount</h5>
                      </div>

                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{loan.amount}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <h5 className="mb-0">Interest Percentage</h5>
                      </div>

                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {loan.interestPersentage}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <h5 className="mb-0">Installment Period</h5>
                      </div>

                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {loan.installmentPeriod}
                        </p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-3">
                        <h5 className="mb-0">Repayment Total</h5>
                      </div>

                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {loan.repaymentTotal}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <h5 className="mb-0">Installment</h5>
                      </div>

                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{loan.installment}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <h5 className="mb-0">Status</h5>
                      </div>

                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{loan.status}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
      </div>
   
  );
};

export default GrantLoanProfile;
