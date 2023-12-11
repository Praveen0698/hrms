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

const EditSetRole = () => {
	let navigate = useNavigate();

	const { id } = useParams();

	const [setRole, setsetRole] = useState({
		setRoleName: "",
		setRoleType: "",
		email: "",
		website: "",
	});
	const {
		setRoleName,
		setRoleType,
		email,
		website,
	} = setRole;

	useEffect(() => {
		loadsetRole();
	}, []);

	const loadsetRole = async () => {
		const result = await axios.get(
			`http://localhost:8083/setRole/get/${id}`
		);
		setsetRole(result.data);
	};

	const handleInputChange = (e) => {
		setsetRole({
			...setRole,
			[e.target.name]: e.target.value,
		});
	};
	const updatesetRole = async (e) => {
		e.preventDefault();
		await axios.put(
			`http://localhost:8083/setRole/update/${id}`,
			setRole
		);
		navigate("/view-setRole");
	};

	return (
		<div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<h2 className="mt-5"> Edit setRole</h2>
			<form onSubmit={(e) => updatesetRole(e)}>
				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="setRoleName">
						setRole Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="setRoleName"
						id="setRoleName"
						required
						value={setRoleName}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="setRoleType">
						setRole Type
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="setRoleType"
						id="setRoleType"
						required
						value={setRoleType}	
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
							to={"/view-setRole"}
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

export default EditSetRole;
