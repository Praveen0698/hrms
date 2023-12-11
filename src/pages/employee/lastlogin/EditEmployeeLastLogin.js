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

const EditEmployeeLastLogin = () => {
	let navigate = useNavigate();

	const { id } = useParams();

	const [employeeLastLogin, setemployeeLastLogin] = useState({
		employeeLastLoginName: "",
		employeeLastLoginType: "",
		email: "",
		website: "",
	});
	const {
		employeeLastLoginName,
		employeeLastLoginType,
		email,
		website,
	} = employeeLastLogin;

	useEffect(() => {
		loademployeeLastLogin();
	}, []);

	const loademployeeLastLogin = async () => {
		const result = await axios.get(
			`http://localhost:8083/employeeLastLogin/get/${id}`
		);
		setemployeeLastLogin(result.data);
	};

	const handleInputChange = (e) => {
		setemployeeLastLogin({
			...employeeLastLogin,
			[e.target.name]: e.target.value,
		});
	};
	const updateemployeeLastLogin = async (e) => {
		e.preventDefault();
		await axios.put(
			`http://localhost:8083/employeeLastLogin/update/${id}`,
			employeeLastLogin
		);
		navigate("/view-employeeLastLogin");
	};

	return (
		<div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<h2 className="mt-5"> Edit employeeLastLogin</h2>
			<form onSubmit={(e) => updateemployeeLastLogin(e)}>
				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="employeeLastLoginName">
						employeeLastLogin Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="employeeLastLoginName"
						id="employeeLastLoginName"
						required
						value={employeeLastLoginName}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="employeeLastLoginType">
						employeeLastLogin Type
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="employeeLastLoginType"
						id="employeeLastLoginType"
						required
						value={employeeLastLoginType}	
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="email">
						Your Email
					</label>
					<input
						className="form-control col-sm-6"
						type="email"
						name="email"
						id="email"
						required
						value={email}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="website">
						Website
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="website"
						id="website"
						required
						value={website}
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
							to={"/view-employeeLastLogin"}
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

export default EditEmployeeLastLogin;
