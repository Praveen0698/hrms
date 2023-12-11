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

const EditTransfer = () => {
	let navigate = useNavigate();

	const { id } = useParams();

	const [transfer, settransfer] = useState({
		transferName: "",
		transferType: "",
		email: "",
		website: "",
	});
	const {
		transferName,
		transferType,
		email,
		website,
	} = transfer;

	useEffect(() => {
		loadtransfer();
	}, []);

	const loadtransfer = async () => {
		const result = await axios.get(
			`http://localhost:8083/transfer/get/${id}`
		);
		settransfer(result.data);
	};

	const handleInputChange = (e) => {
		settransfer({
			...transfer,
			[e.target.name]: e.target.value,
		});
	};
	const updatetransfer = async (e) => {
		e.preventDefault();
		await axios.put(
			`http://localhost:8083/transfer/update/${id}`,
			transfer
		);
		navigate("/view-transfer");
	};

	return (
		<div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<h2 className="mt-5"> Edit transfer</h2>
			<form onSubmit={(e) => updatetransfer(e)}>
				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="transferName">
						transfer Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="transferName"
						id="transferName"
						required
						value={transferName}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="transferType">
						transfer Type
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="transferType"
						id="transferType"
						required
						value={transferType}	
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
							to={"/view-transfer"}
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

export default EditTransfer;