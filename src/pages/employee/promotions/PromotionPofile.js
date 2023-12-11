import React, {
	useEffect,
	useState,
} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PromotionPofile = () => {
	const { id } = useParams();

	const [promotion, setpromotion] = useState({
		promotionName: "",
		promotionType: "",
		email: "",
		webiste: "",
	});

	useEffect(() => {
		loadpromotion();
	}, []);

	const loadpromotion = async () => {
		const result = await axios.get(
			`http://localhost:8083/promotion/get/${id}`
		);
		setpromotion(result.data);
	};

	return (
		<section
			className="shadow"
			style={{ backgroundColor: "whitesmoke" }}>
			<div className="container py-5">
				<div className="row">
					<div className="col-lg-3">
						<div className="card mb-4">
							<div className="card-body text-center">
								<img
									src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
									alt="avatar"
									className="rounded-circle img-fluid"
									style={{ width: 150 }}
								/>
								<h5 className="my-3">
									{`${promotion.promotionName} ${promotion.promotionType}`}
								</h5>
								<div className="d-flex justify-content-center mb-2">
									<button
										type="button"
										className="btn btn-outline-primary">
										Call
									</button>
									<button
										type="button"
										className="btn btn-outline-warning ms-1">
										Message
									</button>
								</div>
							</div>
						</div>
					</div>

					<div className="col-lg-9">
						<div className="card mb-4">
							<div className="card-body">
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											promotion Name
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{promotion.promotionName}
										</p>
									</div>
								</div>

								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											promotion Type
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{promotion.promotionType}
										</p>
									</div>
								</div>
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Email
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{promotion.email}
										</p>
									</div>
								</div>
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Website
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{promotion.website}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PromotionPofile;
