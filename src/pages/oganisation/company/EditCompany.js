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

const EditCompany = () => {
	let navigate = useNavigate();

	const { id } = useParams();

	const [company, setCompany] = useState({
		companyName: "",
		contactNumber: "",
		email: "",
		cin: "",
		gst:"",
		uan:""
	});
	const {
		companyName,
		contactNumber,
		email,
		cin,
		gst,
		uan,
	} = company;

	useEffect(() => {
		loadCompany();
	}, []);

	const loadCompany = async () => {
		const result = await axios.get(
			`http://localhost:8081/company/get/${id}`
		);
		setCompany(result.data);
	};

	const handleInputChange = (e) => {
		setCompany({
			...company,
			[e.target.name]: e.target.value,
		});
	};
	const updateCompany = async (e) => {
		e.preventDefault();
		await axios.put(
			`http://localhost:8081/company/update/${id}`,
			company
		);
		navigate("/company");
	};

	return (
		<div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<h2 className="mt-5"> Edit Company</h2>
			<form onSubmit={(e) => updateCompany(e)}>
				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="companyName">
						Company Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="companyName"
						id="companyName"
						required
						value={companyName}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="contactNumber">
						Contact Number
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="contactNumber"
						id="contactNumber"
						required
						value={contactNumber}	
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
						htmlFor="cin">
						CIN
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="cin"
						id="cin"
						required
						value={cin}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>
				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="gst">
						GST
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="gst"
						id="gst"
						required
						value={gst}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>
				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="uan">
						UAN
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="uan"
						id="uan"
						required
						value={uan}
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
							to={"/company"}
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

export default EditCompany;
