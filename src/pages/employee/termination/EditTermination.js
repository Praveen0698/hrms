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

const EditTermination = () => {
	let navigate = useNavigate();

	const { id } = useParams();

	const [termination, settermination] = useState({
		terminationName: "",
		terminationType: "",
		email: "",
		website: "",
	});
	const {
		terminationName,
		terminationType,
		email,
		website,
	} = termination;

	useEffect(() => {
		loadtermination();
	}, []);

	const loadtermination = async () => {
		const result = await axios.get(
			`http://localhost:8083/termination/get/${id}`
		);
		settermination(result.data);
	};

	const handleInputChange = (e) => {
		settermination({
			...termination,
			[e.target.name]: e.target.value,
		});
	};
	const updatetermination = async (e) => {
		e.preventDefault();
		await axios.put(
			`http://localhost:8083/termination/update/${id}`,
			termination
		);
		navigate("/view-termination");
	};

	return (
		<div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<h2 className="mt-5"> Edit termination</h2>
			<form onSubmit={(e) => updatetermination(e)}>
				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="terminationName">
						termination Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="terminationName"
						id="terminationName"
						required
						value={terminationName}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="terminationType">
						termination Type
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="terminationType"
						id="terminationType"
						required
						value={terminationType}	
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
							to={"/view-termination"}
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

export default EditTermination;
