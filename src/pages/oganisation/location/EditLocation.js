import React, {
  useEffect,
  useState,
} from "react";
import axios from "axios";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

const EditLocation = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [location, setLocation] = useState({
    companyName: " ",
    locationName: " ",
    email: " ",
    phone: " ",
    faxNumber: " ",
    locationHead: " ",
    address: " "
  });
  const {
    companyName,
    locationName,
    email,
    phone,
    faxNumber,
    locationHead,
    address
  } = location;

  useEffect(() => {
    loadLocation();
  }, []);

  const loadLocation = async () => {
    const result = await axios.get(
      `http://localhost:8081/location/get/${id}`
    );
    setLocation(result.data);
  };

  const handleInputChange = (e) => {
    setLocation({
      ...location,
      [e.target.name]: e.target.value,
    });
  };
  const updateLocation = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:8081/location/update/${id}`,
      location
    );
    navigate("/location");
  };

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <h2 className="mt-5"> Edit Location</h2>
      <form onSubmit={(e) => updateLocation(e)}>
        <div className="input-group mb-5">
          <label
            className="input-group-text"
            htmlFor="locationType">
            Company
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="companyName"
            id="companyName"
            required
            value={companyName}
            onChange={(e) => handleInputChange(e)}
            readOnly
          />
        </div><div className="input-group mb-5">
          <label
            className="input-group-text"
            htmlFor="locationType">
            Location Head
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="locationHead"
            id="locationHead"
            required
            value={locationHead}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input-group mb-5">
          <label
            className="input-group-text"
            htmlFor="locationType">
            Location Name
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="locationName"
            id="locationName"
            required
            value={locationName}
            onChange={(e) => handleInputChange(e)}
          />

        </div><div className="input-group mb-5">
          <label
            className="input-group-text"
            htmlFor="locationType">
            Email
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="email"
            id="email"
            required
            value={email}
            onChange={(e) => handleInputChange(e)}
            readOnly
          />
        </div><div className="input-group mb-5">
          <label
            className="input-group-text"
            htmlFor="locationType">
            Address
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="address"
            id="address"
            required
            value={address}
            onChange={(e) => handleInputChange(e)}
          />
        </div><div className="input-group mb-5">
          <label
            className="input-group-text"
            htmlFor="locationType">
            Phone
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="phone"
            id="phone"
            required
            value={phone}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input-group mb-5">
          <label
            className="input-group-text"
            htmlFor="locationType">
            Fax Number
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="faxNumber"
            id="faxNumber"
            required
            value={faxNumber}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="row mb-5">
          <div className="col-sm-2">
            <button
              type="submit"
              className="btn btn-outline-success btn-lg">
              Save
            </button>
          </div>

          <div className="col-sm-2">
            <Link
              to={"/location"}
              type="submit"
              className="btn btn-outline-warning btn-lg">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditLocation;
