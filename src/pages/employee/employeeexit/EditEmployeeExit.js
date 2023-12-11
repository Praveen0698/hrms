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

const EditEmployeeExit = () => {
	let navigate = useNavigate();

	const { id } = useParams();

	const [employeeExit, setemployeeExit] = useState({
		employeeExitName: "",
		employeeExitType: "",
		email: "",
		website: "",
	});
	const {
		employeeExitName,
		employeeExitType,
		email,
		website,
	} = employeeExit;

	useEffect(() => {
		loademployeeExit();
	}, []);

	const loademployeeExit = async () => {
		const result = await axios.get(
			`http://localhost:8083/employeeExit/get/${id}`
		);
		setemployeeExit(result.data);
	};

	const handleInputChange = (e) => {
		setemployeeExit({
			...employeeExit,
			[e.target.name]: e.target.value,
		});
	};
	const updateemployeeExit = async (e) => {
		e.preventDefault();
		await axios.put(
			`http://localhost:8083/employeeExit/update/${id}`,
			employeeExit
		);
		navigate("/view-employeeExit");
	};

	return (
		<div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<h2 className="mt-5"> Edit employeeExit</h2>
			<form onSubmit={(e) => updateemployeeExit(e)}>
				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="employeeExitName">
						employeeExit Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="employeeExitName"
						id="employeeExitName"
						required
						value={employeeExitName}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="employeeExitType">
						employeeExit Type
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="employeeExitType"
						id="employeeExitType"
						required
						value={employeeExitType}	
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
							to={"/view-employeeExit"}
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

export default EditEmployeeExit;
