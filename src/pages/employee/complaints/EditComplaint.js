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

const EditComplaint = () => {
	let navigate = useNavigate();

	const { id } = useParams();

	const [complaint, setcomplaint] = useState({
		complaintName: "",
		complaintType: "",
		email: "",
		website: "",
	});
	const {
		complaintName,
		complaintType,
		email,
		website,
	} = complaint;

	useEffect(() => {
		loadcomplaint();
	}, []);

	const loadcomplaint = async () => {
		const result = await axios.get(
			`http://localhost:8083/complaint/get/${id}`
		);
		setcomplaint(result.data);
	};

	const handleInputChange = (e) => {
		setcomplaint({
			...complaint,
			[e.target.name]: e.target.value,
		});
	};
	const updatecomplaint = async (e) => {
		e.preventDefault();
		await axios.put(
			`http://localhost:8083/complaint/update/${id}`,
			complaint
		);
		navigate("/view-complaint");
	};

	return (
		<div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<h2 className="mt-5"> Edit complaint</h2>
			<form onSubmit={(e) => updatecomplaint(e)}>
				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="complaintName">
						complaint Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="complaintName"
						id="complaintName"
						required
						value={complaintName}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="complaintType">
						complaint Type
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="complaintType"
						id="complaintType"
						required
						value={complaintType}	
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
							to={"/view-complaint"}
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

export default EditComplaint;
