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

const EditResignation = () => {
	let navigate = useNavigate();

	const { id } = useParams();

	const [resignation, setresignation] = useState({
		resignationName: "",
		resignationType: "",
		email: "",
		website: "",
	});
	const {
		resignationName,
		resignationType,
		email,
		website,
	} = resignation;

	useEffect(() => {
		loadresignation();
	}, []);

	const loadresignation = async () => {
		const result = await axios.get(
			`http://localhost:8083/resignation/get/${id}`
		);
		setresignation(result.data);
	};

	const handleInputChange = (e) => {
		setresignation({
			...resignation,
			[e.target.name]: e.target.value,
		});
	};
	const updateresignation = async (e) => {
		e.preventDefault();
		await axios.put(
			`http://localhost:8083/resignation/update/${id}`,
			resignation
		);
		navigate("/view-resignation");
	};

	return (
		<div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<h2 className="mt-5"> Edit resignation</h2>
			<form onSubmit={(e) => updateresignation(e)}>
				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="resignationName">
						resignation Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="resignationName"
						id="resignationName"
						required
						value={resignationName}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="resignationType">
						resignation Type
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="resignationType"
						id="resignationType"
						required
						value={resignationType}	
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
							to={"/view-resignation"}
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

export default EditResignation;
