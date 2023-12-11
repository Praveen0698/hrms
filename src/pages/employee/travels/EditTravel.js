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

const EditTravel = () => {
	let navigate = useNavigate();

	const { id } = useParams();

	const [travel, settravel] = useState({
		travelName: "",
		travelType: "",
		email: "",
		website: "",
	});
	const {
		travelName,
		travelType,
		email,
		website,
	} = travel;

	useEffect(() => {
		loadtravel();
	}, []);

	const loadtravel = async () => {
		const result = await axios.get(
			`http://localhost:8083/travel/get/${id}`
		);
		settravel(result.data);
	};

	const handleInputChange = (e) => {
		settravel({
			...travel,
			[e.target.name]: e.target.value,
		});
	};
	const updatetravel = async (e) => {
		e.preventDefault();
		await axios.put(
			`http://localhost:8083/travel/update/${id}`,
			travel
		);
		navigate("/view-travel");
	};

	return (
		<div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<h2 className="mt-5"> Edit travel</h2>
			<form onSubmit={(e) => updatetravel(e)}>
				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="travelName">
						travel Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="travelName"
						id="travelName"
						required
						value={travelName}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="travelType">
						travel Type
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="travelType"
						id="travelType"
						required
						value={travelType}	
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
							to={"/view-travel"}
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

export default EditTravel;
