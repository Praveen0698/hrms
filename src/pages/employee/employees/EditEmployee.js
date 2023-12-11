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

const Editemployee = () => {
	let navigate = useNavigate();

	const { id } = useParams();

	const [employee, setemployee] = useState({
		employeeName: "",
		employeeType: "",
		email: "",
		website: "",
	});
	const {
		employeeName,
		employeeType,
		email,
		website,
	} = employee;

	useEffect(() => {
		loademployee();
	}, []);

	const loademployee = async () => {
		const result = await axios.get(
			`http://localhost:8083/employee/get/${id}`
		);
		setemployee(result.data);
	};

	const handleInputChange = (e) => {
		setemployee({
			...employee,
			[e.target.name]: e.target.value,
		});
	};
	const updateemployee = async (e) => {
		e.preventDefault();
		await axios.put(
			`http://localhost:8083/employee/update/${id}`,
			employee
		);
		navigate("/view-employee");
	};

	return (
		<div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<h2 className="mt-5"> Edit employee</h2>
			<form onSubmit={(e) => updateemployee(e)}>
				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="employeeName">
						employee Name
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
					<label
						className="input-group-text"
						htmlFor="employeeType">
						employee Type
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="employeeType"
						id="employeeType"
						required
						value={employeeType}	
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
							to={"/view-employee"}
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

export default Editemployee;
