import { Button, Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import Ratings from "react-ratings-declarative";
import coacherApi from "../../../../api/coacherApi";
import formatCash from "../../../../components/FormatMoney";
import SearchTerm from "../../../../components/Search";
import AddingCoacher from "../../components/AddingCoacher";
import ConfirmDeleteCoacher from "../../components/ConfirmDeleteCoacher";
import EditingCoacher from "../../components/EditingCoacher";

const useStyles = makeStyles((theme) => ({
	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: "rotate(180deg)",
	},
	avatar: {
		width: theme.spacing(9),
		height: theme.spacing(9),
	},
}));

const Coachers = () => {
	const classes = useStyles();
	var FormData = require("form-data");
	const [listCoacher, setListCoacher] = useState([]);

	const [isDataChanged, setIsDataChanged] = useState(false);

	const [isOpenDialog, setIsOpenDialog] = useState(false);
	const [isOpenAddingCoacher, setIsOpenAddingCoacher] = useState(false);
	const [isOpenEditingCoacher, setIsOpenEditingCoacher] = useState(false);

	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	const [coacherInfo, setCoacherInfo] = useState({
		avatar: "",
		name: "",
		phone: "",
		email: "",
		intro: "",
		price: "",
	});

	const [clickedCoacher, setClickedCoacher] = useState("");

	const [clickedEditingId, setClickedEditingId] = useState(null);

	// get list coachers
	useEffect(() => {
		const fetchListCoachers = async () => {
			try {
				const response = await coacherApi.getListCoacher();
				setListCoacher(response.data);
			} catch (error) {
				console.log("failed to fetch product list: ", error);
			}
		};
		fetchListCoachers();
	}, [isDataChanged]);

	// get info service byID
	useEffect(() => {
		const fetchListServices = async () => {
			try {
				const response = await coacherApi.getCoacherById(clickedEditingId);
				setCoacherInfo(response.data);
			} catch (error) {
				// console.log("failed to fetch product list: ", error);
			}
		};

		fetchListServices();
	}, [clickedEditingId]);

	const handleOpenDeleteConfirm = (idCoacher) => {
		setClickedCoacher(idCoacher);
		setIsOpenDialog(true);
	};

	const handleCloseDeleteConfirm = () => {
		setIsOpenDialog(false);
	};

	// handle delete coacher
	const handleClickDeleteConfirm = (id) => {
		coacherApi
			.deleteCoacher(id)
			.then(function (response) {
				setSuccess(true);

				setTimeout(() => {
					setIsDataChanged(!isDataChanged);
					setIsOpenDialog(false);
					setSuccess(false);
				}, 1500);
			})
			.catch(function (error) {
				setError(true);
				setTimeout(() => {
					setIsOpenDialog(false);
					setError(false);
				}, 1500);
			});
	};

	const handleOpenAddingCoacher = () => {
		setIsOpenAddingCoacher(true);
	};

	const handleCloseAddingCoacher = () => {
		setIsOpenAddingCoacher(false);
	};

	// handle value input onchange
	const handleCoacherInfoChange = (event) => {
		setCoacherInfo({
			...coacherInfo,
			[event.target.name]: event.target.value,
		});
	};

	// handle submit adding new coacher
	const handleAddingCoacherSubmit = (value) => {
		var dataPost = new FormData();

		if (value) {
			dataPost.append("name", value.name);
			dataPost.append("email", value.email);
			dataPost.append("intro", value.intro);
			dataPost.append("price", value.price);
			dataPost.append("phone", value.phone);
			dataPost.append("avatar", value.avatar);

			const fetchAddingCoacher = async () => {
				try {
					await coacherApi.postAddCoacher(dataPost);
					setSuccess(true);

					setTimeout(() => {
						setSuccess(false);
						setIsDataChanged(!isDataChanged);
						setIsOpenAddingCoacher(false);
					}, 1500);
				} catch (error) {
					setError(true);

					setTimeout(() => {
						setError(false);
					}, 1500);
				}
			};

			fetchAddingCoacher();
		}
	};

	const openEditCoacher = (id) => {
		setIsOpenEditingCoacher(true);
		setClickedEditingId(id);
	};

	const closeEditCoacher = () => {
		setIsOpenEditingCoacher(false);
	};

	// handle editing coacher
	const handleEditingCoacherSubmit = (coacherId, coacherInfo) => {
		// var dataEditPost = new FormData();

		// console.log("coacherInfo: ", coacherInfo);

		if (coacherInfo) {
			const dataEditPost = {
				name: coacherInfo.name,
				email: coacherInfo.email,
				intro: coacherInfo.intro,
				phone: coacherInfo.phone,
				price: coacherInfo.price,
			};
			const fetchEditingService = async () => {
				try {
					await coacherApi.patchChangeCoacherInfo(coacherId, dataEditPost);
					setSuccess(true);

					setTimeout(() => {
						setSuccess(false);
						setIsOpenEditingCoacher(false);
						setIsDataChanged(!isDataChanged);
					}, 1500);
				} catch (error) {
					setError(true);

					setTimeout(() => {
						setError(false);
					}, 1500);
				}
			};

			fetchEditingService();
		}
	};

	// handle search
	function handleFiltersChange(newFilters) {
		let arrayFiltered = [];

		const lowerCasedFilter = newFilters.searchTerm.toLowerCase();

		if (lowerCasedFilter) {
			// setIsRowsChanges(!isRowsChanges);

			listCoacher.filter((item) => {
				const nameFiltered = item.phone
					.toLowerCase()
					.includes(lowerCasedFilter);
				if (nameFiltered) {
					arrayFiltered.push(item);
				}
			});

			setListCoacher(arrayFiltered);
		} else {
			setIsDataChanged(!isDataChanged);
		}
	}

	return (
		<React.Fragment>
			<Grid
				container
				style={{ justifyContent: "space-between", marginBottom: "1rem" }}>
				<Grid item>
					<Typography variant='h5'>Danh sách coaches</Typography>
				</Grid>
				<Grid item>
					<Button
						size='large'
						variant='contained'
						color='primary'
						onClick={handleOpenAddingCoacher}
						startIcon={<AddIcon />}>
						Thêm Coacher
					</Button>

					<AddingCoacher
						isAddingCoacherOpen={isOpenAddingCoacher}
						onCloseForm={handleCloseAddingCoacher}
						coacherInfo={coacherInfo}
						onCoacherInfoChange={handleCoacherInfoChange}
						onAddingCoacherSubmit={handleAddingCoacherSubmit}
						onSuccess={success}
						onError={error}
					/>
				</Grid>
			</Grid>

			<SearchTerm
				onSubmit={handleFiltersChange}
				handleReload={() => setIsDataChanged(!isDataChanged)}
			/>
			<div>
				<Grid container spacing={3}>
					{listCoacher.length > 0 ? (
						listCoacher.map((coacher) => (
							<Grid item xs={12} md={6} lg={4} key={coacher._id}>
								<Card className={classes.root}>
									<CardHeader
										avatar={
											<Avatar
												alt='Remy Sharp'
												src={coacher.avatar}
												style={{
													backgroundPosition: "center",
													boxShadow: ".25rem .5rem 1rem rgba(0,0,0,.3)",
												}}
												className={classes.avatar}
											/>
										}
										title={
											<Typography variant='h6' style={{ fontSize: "1.1rem" }}>
												{coacher.name} ({coacher.id})
											</Typography>
										}
										subheader={
											<div>
												<Typography variant='body2'>
													Email: {coacher.email}
												</Typography>
												<Typography variant='body2'>
													SĐT: {coacher.phone}
												</Typography>
												<Typography variant='body2'>
													Giá: {formatCash("" + coacher.price)} vnđ/h
												</Typography>
											</div>
										}
									/>

									<CardContent>
										<Typography
											variant='body2'
											color='textSecondary'
											style={{
												height: "100px",
												overflow: "hidden",
												textOverflow: "ellipsis",
												// whiteSpace: "pre-wrap",
												textAlign: "justify",
											}}
											component='p'>
											{coacher.intro}
										</Typography>
										<div
											style={{
												marginTop: "1rem",
											}}>
											<Ratings
												rating={coacher.avgPoint / 2}
												widgetDimensions='1.3rem'
												widgetSpacings='2px'>
												<Ratings.Widget
													widgetRatedColor='#f39c12'
													widgetEmptyColors='#f39c12'
												/>
												<Ratings.Widget
													widgetRatedColor='#f39c12'
													widgetEmptyColors='#f39c12'
												/>
												<Ratings.Widget
													widgetRatedColor='#f39c12'
													widgetEmptyColors='#f39c12'
												/>
												<Ratings.Widget
													widgetRatedColor='#f39c12'
													widgetEmptyColors='#f39c12'
												/>
												<Ratings.Widget
													widgetRatedColor='#f39c12'
													widgetEmptyColors='#f39c12'
												/>
											</Ratings>
										</div>
									</CardContent>
									<CardActions disableSpacing>
										<Button
											size='small'
											variant='contained'
											color='secondary'
											style={{ marginRight: "8px" }}
											onClick={() => {
												handleOpenDeleteConfirm(coacher._id);
											}}>
											Xóa coacher
										</Button>

										{/* delete coacher confirm dialog */}
										{clickedCoacher === coacher._id && (
											<ConfirmDeleteCoacher
												isOpenDeleteConfirm={isOpenDialog}
												onConfirmDeleteClose={handleCloseDeleteConfirm}
												onClickConfirmDeleteCoacher={(e) => {
													handleClickDeleteConfirm(coacher._id);
												}}
												onSuccess={success}
												onError={error}
												nameCoacher={coacher.name}
												id={coacher._id}
											/>
										)}

										<Button
											size='small'
											variant='contained'
											color='primary'
											onClick={(e) => {
												openEditCoacher(coacher._id);
											}}>
											Chỉnh sửa
										</Button>
										{clickedEditingId === coacher._id && (
											<EditingCoacher
												isEditingCoacherOpen={isOpenEditingCoacher}
												onCloseForm={closeEditCoacher}
												coacherInfo={coacherInfo}
												onCoacherInfoChange={handleCoacherInfoChange}
												coacherId={coacher._id}
												onEditingCoacherSubmit={handleEditingCoacherSubmit}
												onSuccess={success}
												onError={error}
											/>
										)}
									</CardActions>
								</Card>
							</Grid>
						))
					) : (
						<Alert severity='success' color='info'>
							Chưa có dữ liệu
						</Alert>
					)}
				</Grid>
			</div>
		</React.Fragment>
	);
};

export default Coachers;
