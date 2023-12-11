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

const Editaward = () => {
	let navigate = useNavigate();

	const { id } = useParams();

	const [award, setaward] = useState({
		awardName: "",
		awardType: "",
		email: "",
		website: "",
	});
	const {
		awardName,
		awardType,
		email,
		website,
	} = award;

	useEffect(() => {
		loadaward();
	}, []);

	const loadaward = async () => {
		const result = await axios.get(
			`http://localhost:8083/award/get/${id}`
		);
		setaward(result.data);
	};

	const handleInputChange = (e) => {
		setaward({
			...award,
			[e.target.name]: e.target.value,
		});
	};
	const updateaward = async (e) => {
		e.preventDefault();
		await axios.put(
			`http://localhost:8083/award/update/${id}`,
			award
		);
		navigate("/view-award");
	};

	return (
		<div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<h2 className="mt-5"> Edit award</h2>
			<form onSubmit={(e) => updateaward(e)}>
				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="awardName">
						award Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="awardName"
						id="awardName"
						required
						value={awardName}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="awardType">
						award Type
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="awardType"
						id="awardType"
						required
						value={awardType}	
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
							to={"/view-award"}
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

export default Editaward;
