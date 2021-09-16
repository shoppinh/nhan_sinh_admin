import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import React, { useEffect, useState } from "react";
import servicesApi from "../../../../api/servicesApi";
import formatCash from "../../../../components/FormatMoney";
import AddingServiceForm from "../../components/AddingServiceForm";
import ConfirmDeleteService from "../../components/ConfirmDeleteService";
import EditingServiceForm from "../../components/EdtingServiceForm";

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 275,
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
}));
const Services = () => {
	const classes = useStyles();

	const [dataServices, setNotes] = useState([]);
	const [openAddingServiceForm, setOpenAddingServiceForm] = useState(false);
	const [openEditingServiceForm, setOpenEditingServiceForm] = useState(true);

	const [valuesService, setValuesService] = useState({
		title: "",
		price: "",
		quantity: "",
	});

	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

	const [clickedDeleteId, setClickedDeleteId] = useState("");

	const [clickedEditingId, setClickedEditingId] = useState("");

	const [isDataChanged, setIsDataChanged] = useState(false);

	// get list services
	useEffect(() => {
		const fetchListServices = async () => {
			try {
				const response = await servicesApi.getListServices();
				setNotes(response.data);
			} catch (error) {
				console.log("failed to fetch product list: ", error);
			}
		};

		fetchListServices();
	}, [isDataChanged]);

	// get info service byID
	useEffect(() => {
		const fetchListServices = async () => {
			try {
				const response = await servicesApi.getInfoServiceById(clickedEditingId);
				setValuesService(response.data);
			} catch (error) {
				console.log("failed to fetch product list: ", error);
			}
		};

		fetchListServices();
	}, [clickedEditingId]);

	const handleOpenAddingServiceForm = () => {
		setOpenAddingServiceForm(true);
	};

	const handleCloseAddingServiceForm = () => {
		setOpenAddingServiceForm(false);
	};

	// handle adding new service
	const handleAddingSubmit = (value) => {
		if (value) {
			const data = {
				title: value.title,
				price: value.price,
				quantity: value.quantity,
			};

			const fetchAddNewService = () => {
				servicesApi
					.addService(data)
					.then(function (response) {
						setSuccess(true);

						setTimeout(() => {
							setIsDataChanged(!isDataChanged);
							setOpenAddingServiceForm(false);
							setSuccess(false);
						}, 1500);
					})
					.catch(function (error) {
						setError(true);
						setTimeout(() => {
							setError(false);
						}, 1500);
					});
			};

			fetchAddNewService();
		}
	};

	// handle editing existing services
	const handleEditingSubmit = (id, value) => {
		const data = {
			title: value.title,
			price: value.price,
			quantity: value.quantity,
		};

		const fetchEditNewService = () => {
			servicesApi
				.patchService(id, data)
				.then(function (response) {
					setSuccess(true);
					setTimeout(() => {
						setSuccess(false);
						setOpenEditingServiceForm(false);
						setIsDataChanged(!isDataChanged);
					}, 1500);
				})
				.catch(function (error) {
					setError(true);
					setTimeout(() => {
						setError(false);
					}, 1500);
				});
		};
		fetchEditNewService();
	};

	// handle open editing service form
	const handleOpenEditForm = (id) => {
		setOpenEditingServiceForm(true);
		setClickedEditingId(id);
	};

	const handleCloseEditForm = () => {
		setOpenEditingServiceForm(false);
	};

	const handleOpenDeleteConfirm = (id) => {
		setClickedDeleteId(id);
		setOpenDeleteConfirm(true);
	};

	const handleCloseDeleteConfirm = (id) => {
		setOpenDeleteConfirm(false);
	};

	// handle click confirm delete service
	const handleClickDeleteConfirm = (id) => {
		servicesApi
			.deleteService(id)
			.then(function (response) {
				setSuccess(true);

				setTimeout(() => {
					setIsDataChanged(true);
					setOpenDeleteConfirm(false);
					setSuccess(false);
				}, 1500);
			})
			.catch(function (error) {
				setError(true);
				setTimeout(() => {
					setOpenDeleteConfirm(false);
					setIsDataChanged(true);

					setError(false);
				}, 1500);
			});

		setIsDataChanged(false);
	};

	const setValuesServiceChange = (event) => {
		setValuesService({
			...valuesService,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<React.Fragment>
			<Grid
				container
				style={{ justifyContent: "space-between", marginBottom: "1rem" }}>
				<Grid item>
					<Typography variant='h5'>Danh sách các dịch vụ</Typography>
				</Grid>
				<Grid item>
					<Button
						size='large'
						variant='contained'
						color='primary'
						onClick={handleOpenAddingServiceForm}
						startIcon={<AddIcon />}>
						Thêm dịch vụ
					</Button>
				</Grid>
			</Grid>

			{/* adding service component */}
			<AddingServiceForm
				isAddingServiceOpen={openAddingServiceForm}
				onCloseForm={handleCloseAddingServiceForm}
				onValuesServiceChange={setValuesServiceChange}
				valuesService={valuesService}
				onAddingServiceSubmit={handleAddingSubmit}
				onSuccess={success}
				onError={error}
			/>

			<div>
				<Grid container spacing={3}>
					{dataServices.map((data) => (
						<Grid item xs={12} md={6} lg={4} key={data._id}>
							<Card className={classes.root}>
								<CardContent>
									<Typography variant='h6' component='h2'>
										Tên dịch vụ: {data.title}
									</Typography>
									<Typography className={classes.pos} color='textSecondary'>
										Giá: {formatCash("" + data.price)} VNĐ
									</Typography>
									<Typography variant='body2' component='p'>
										Số lượng: {data.quantity}
									</Typography>
								</CardContent>
								<CardActions>
									<Button
										size='small'
										variant='contained'
										color='secondary'
										onClick={() => {
											handleOpenDeleteConfirm(data._id);
										}}>
										Xóa dịch vụ
									</Button>
									{clickedDeleteId === data._id ? (
										<ConfirmDeleteService
											isOpenDeleteConfirm={openDeleteConfirm}
											onConfirmDeleteClose={handleCloseDeleteConfirm}
											onClickConfirmDeleteService={(e) => {
												handleClickDeleteConfirm(data._id);
											}}
											onSuccess={success}
											onError={error}
											id={data._id}
										/>
									) : (
										""
									)}

									<Button
										size='small'
										variant='contained'
										color='primary'
										onClick={(e) => {
											handleOpenEditForm(data._id);
										}}>
										Chỉnh sửa
									</Button>
									{clickedEditingId === data._id ? (
										<EditingServiceForm
											isOpen={openEditingServiceForm}
											onCloseForm={handleCloseEditForm}
											idService={data._id}
											valuesService={valuesService}
											onValuesServiceChange={setValuesServiceChange}
											onEditingServiceSubmit={handleEditingSubmit}
											onSuccess={success}
											onError={error}
										/>
									) : (
										""
									)}
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</div>
		</React.Fragment>
	);
};

export default Services;
