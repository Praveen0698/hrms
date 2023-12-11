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

const EditWarning = () => {
	let navigate = useNavigate();

	const { id } = useParams();

	const [warning, setwarning] = useState({
		warningName: "",
		warningType: "",
		email: "",
		website: "",
	});
	const {
		warningName,
		warningType,
		email,
		website,
	} = warning;

	useEffect(() => {
		loadwarning();
	}, []);

	const loadwarning = async () => {
		const result = await axios.get(
			`http://localhost:8083/warning/get/${id}`
		);
		setwarning(result.data);
	};

	const handleInputChange = (e) => {
		setwarning({
			...warning,
			[e.target.name]: e.target.value,
		});
	};
	const updatewarning = async (e) => {
		e.preventDefault();
		await axios.put(
			`http://localhost:8083/warning/update/${id}`,
			warning
		);
		navigate("/view-warning");
	};

	return (
		<div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<h2 className="mt-5"> Edit warning</h2>
			<form onSubmit={(e) => updatewarning(e)}>
				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="warningName">
						warning Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="warningName"
						id="warningName"
						required
						value={warningName}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="warningType">
						warning Type
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="warningType"
						id="warningType"
						required
						value={warningType}	
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
							to={"/view-warning"}
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

export default EditWarning;
