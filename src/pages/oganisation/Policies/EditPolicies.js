import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditPolicies = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [expenses, setExpenses] = useState({
    companyName: "",
    title: "",
    description: "",
  });

  const {
    companyName,
    title,
    description,
  } = expenses;

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    const result = await axios.get(`http://localhost:8083/policies/get/${id}`);
    setExpenses(result.data);
  };

  const handleInputChange = (e) => {
    setExpenses({
      ...expenses,
      [e.target.name]: e.target.value,
    });
  };

  const updateExpenses = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8083/policies/update/${id}`, expenses);
    navigate("/view-expenses");
  };

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <h2 className="mt-5"> Edit Expenses</h2>
      <form onSubmit={(e) => updateExpenses(e)}>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="expenceType">
            Comapany Name
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="companyName"
            id="companyName"
            required
            value={companyName}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="purchaseDate">
            Title
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="title"
            id="title"
            required
            value={title}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="amount">
            Description
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="title"
            id="title"
            required
            value={title}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        {/* <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="purchaseBy">
            Purchased By
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="purchaseBy"
            id="purchaseBy"
            required
            value={purchaseBy}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="remarks">
            Remarks
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="remarks"
            id="remarks"
            required
            value={remarks}
            onChange={(e) => handleInputChange(e)}
          />
        </div> */}

        <div className="row mb-5">
          <div className="col-sm-2">
            <button
              type="submit"
              className="btn btn-outline-success btn-lg"
            >
              Save
            </button>
          </div>

          <div className="col-sm-2">
            <Link
              to={"/view-expenses"}
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

export default EditPolicies;
