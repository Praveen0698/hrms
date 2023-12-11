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

const EditPromotion = () => {
	let navigate = useNavigate();

	const { id } = useParams();

	const [promotion, setpromotion] = useState({
		promotionName: "",
		promotionType: "",
		email: "",
		website: "",
	});
	const {
		promotionName,
		promotionType,
		email,
		website,
	} = promotion;

	useEffect(() => {
		loadpromotion();
	}, []);

	const loadpromotion = async () => {
		const result = await axios.get(
			`http://localhost:8083/promotion/get/${id}`
		);
		setpromotion(result.data);
	};

	const handleInputChange = (e) => {
		setpromotion({
			...promotion,
			[e.target.name]: e.target.value,
		});
	};
	const updatepromotion = async (e) => {
		e.preventDefault();
		await axios.put(
			`http://localhost:8083/promotion/update/${id}`,
			promotion
		);
		navigate("/view-promotion");
	};

	return (
		<div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<h2 className="mt-5"> Edit promotion</h2>
			<form onSubmit={(e) => updatepromotion(e)}>
				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="promotionName">
						promotion Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="promotionName"
						id="promotionName"
						required
						value={promotionName}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="promotionType">
						promotion Type
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="promotionType"
						id="promotionType"
						required
						value={promotionType}	
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
							to={"/view-promotion"}
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

export default EditPromotion;
