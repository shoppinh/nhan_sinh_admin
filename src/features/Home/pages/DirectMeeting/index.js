import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Alert from "@material-ui/lab/Alert";
import moment from "moment";
import React, { useEffect, useState } from "react";
import directMeetingApi from "../../../../api/directMeetingApi";
import SearchTerm from "../../../../components/Search";
import AddingCoachingService from "../../components/AddingCoachingService";
import ConfirmDeleteService from "../../components/ConfirmDeleteService";
import EditCoachingStatusForm from "../../components/EditCoachingStatusForm";
import NoteSearchFree from "../../components/NoteSearchFree";
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
		marginBottom: 5,
	},
}));

const date = new Date();

const DirectMeeting = () => {
	const classes = useStyles();

	const [openAddingCoaching, setOpenAddingCoaching] = useState(false);

	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	const [name, setName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [coacher, setCoacher] = useState("");
	const [time, setTime] = useState(date);
	const [address, setAddress] = useState("");
	const [birthDay, setBirthDay] = useState(date);

	const [listDirectMeet, setListDirectMeet] = useState([]);
	const [listCoacher, setListCoacher] = useState([]);

	const [isDataChanged, setIsDataChanged] = useState(false);

	const [openNote, setOpenNote] = useState(false);
	const [clickedIdChangeForm, setClickedIdChangeForm] = useState("");
	const [newNote, setNewNote] = useState("");

	const [clickedDeleteId, setClickedDeleteId] = useState("");
	const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

	// get list direct meet
	useEffect(() => {
		const fetchListDirectMeet = async () => {
			try {
				const response = await directMeetingApi.getListDirectMeet();
				setListDirectMeet(response.data);
			} catch (error) {
				console.log("failed to fetch product list: ", error);
			}
		};

		fetchListDirectMeet();
	}, [isDataChanged]);

	// get list coachers
	useEffect(() => {
		const fetchListCoachers = async () => {
			try {
				const response = await directMeetingApi.getListCoacher();
				setListCoacher(response.data);
			} catch (error) {
				console.log("failed to fetch product list: ", error);
			}
		};
		fetchListCoachers();
	}, []);

	const handleOpenAddingCoaching = () => {
		setOpenAddingCoaching(true);
	};

	const handleCloseAddingCoaching = () => {
		setOpenAddingCoaching(false);
	};

	const handleChangeNoteClose = () => {
		setOpenNote(false);
	};

	const handleOpenEditNote = (id) => {
		setOpenNote(true);
		setClickedIdChangeForm(id);
	};

	// handle adding new coaching
	const handleAddingCoachingSubmit = () => {
		const useInfo = {
			name: name,
			phoneNumber: phoneNumber,
			email: email,
			coacher: coacher,
			time: moment(time).format("YYYY-MM-DD"),
			address: address,
			birthDay: moment(birthDay).format("YYYY-MM-DD"),
		};

		const fetchAddCoaching = () => {
			directMeetingApi
				.postNewDirectMeeting(useInfo)
				.then(function (response) {
					setSuccess(true);
					setTimeout(() => {
						setOpenAddingCoaching(false);
						setSuccess(false);
						setIsDataChanged(true);
					}, 1500);
				})
				.catch(function (error) {
					setError(true);
					setTimeout(() => {
						setError(false);
					}, 1500);
				});
		};
		setIsDataChanged(false);
		fetchAddCoaching();
	};

	// handle change content of note
	const handleNoteSubmit = (id) => {
		if (id && newNote) {
			const dataNewNote = {
				note: newNote,
			};

			const fetchChangeNote = () => {
				directMeetingApi
					.patchEditNote(id, dataNewNote)
					.then(function (response) {
						setSuccess(true);

						setTimeout(() => {
							setNewNote(response.data.note);

							setOpenNote(false);
							setSuccess(false);
							setIsDataChanged(true);
						}, 1500);
					})
					.catch(function (error) {
						setError(true);
						setTimeout(() => {
							setOpenNote(false);
							setError(false);
						}, 1500);
					});
			};
			setIsDataChanged(false);

			fetchChangeNote();
		}
	};

	const handleOpenDeleteConfirm = (id) => {
		console.log(id);
		setClickedDeleteId(id);
		setOpenDeleteConfirm(true);
	};

	const handleCloseDeleteConfirm = (id) => {
		setOpenDeleteConfirm(false);
	};

	// handle click confirm delete coaching service
	const handleClickDeleteConfirm = (id) => {
		directMeetingApi
			.deleteCoaching(id)
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

	const [isOpenEditStatus, setIsOpenEditStatus] = useState(false);
	const [clickedEdit, setClickedEdit] = useState("");

	const handleOpenEditStatus = (id) => {
		setIsOpenEditStatus(true);
		setClickedEdit(id);
	};

	const handleCloseEditStatus = () => {
		setIsOpenEditStatus(false);
	};

	const handleEditStatusSubmit = (status, id) => {
		if (id && status) {
			const dataEditStatus = {
				status: status,
			};

			const fetchEditStatus = async () => {
				try {
					await directMeetingApi.patchEditStatus(id, dataEditStatus);
					setSuccess(true);

					setTimeout(() => {
						setIsOpenEditStatus(false);
						setSuccess(false);
						setIsDataChanged(true);
					}, 1500);
				} catch (error) {
					setError(true);
					setTimeout(() => {
						setIsOpenEditStatus(false);
						setError(false);
					}, 1500);
				}
			};

			setIsDataChanged(false);
			fetchEditStatus();
		} else {
			setError(true);
			setTimeout(() => {
				setIsOpenEditStatus(false);
				setError(false);
			}, 1500);
		}
	};

	function handleFiltersChange(newFilters) {
		let arrayFiltered = [];

		const lowerCasedFilter = newFilters.searchTerm.toLowerCase();

		if (lowerCasedFilter) {
			// setIsRowsChanges(!isRowsChanges);

			listDirectMeet.filter((item) => {
				const nameFiltered = item.phoneNumber
					.toLowerCase()
					.includes(lowerCasedFilter);
				if (nameFiltered) {
					arrayFiltered.push(item);
				}
			});

			setListDirectMeet(arrayFiltered);
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
					<Typography variant='h5'>
						Danh sách sử dụng dịch vụ Coaching
					</Typography>
				</Grid>
				<Grid item>
					<Button
						size='large'
						variant='contained'
						color='primary'
						onClick={handleOpenAddingCoaching}
						startIcon={<AddIcon />}>
						Thêm COACHING
					</Button>
				</Grid>
			</Grid>

			{/* adding coaching service form */}
			<AddingCoachingService
				isOpen={openAddingCoaching}
				onCloseForm={handleCloseAddingCoaching}
				onNameChange={(e) => setName(e.target.value)}
				onEmailChange={(e) => setEmail(e.target.value)}
				onTimeChange={(e) => setTime(e.target.value)}
				onPhoneNumberChange={(e) => setPhoneNumber(e.target.value)}
				onCoacherChange={(e) => setCoacher(e.target.value)}
				listCoacher={listCoacher}
				coacher={coacher}
				onAddressChange={(e) => setAddress(e.target.value)}
				onBirthDayChange={(e) => setBirthDay(e.target.value)}
				birthDay={birthDay}
				time={time}
				onAddingCoachingSubmit={handleAddingCoachingSubmit}
				onSuccess={success}
				onError={error}
			/>

			<SearchTerm
				onSubmit={handleFiltersChange}
				handleReload={() => setIsDataChanged(!isDataChanged)}
			/>
			<div>
				<Grid container spacing={3}>
					{listDirectMeet.length > 0 ? (
						listDirectMeet.map((data) => (
							<Grid item xs={12} md={6} lg={4} key={data._id}>
								<Card className={classes.root}>
									<CardContent>
										<Typography
											variant='h6'
											component='h2'
											style={{ marginBottom: "1rem" }}>
											Khách hàng: {data.name}
										</Typography>

										<Typography className={classes.pos} color='textSecondary'>
											SĐT: {data.phoneNumber} - Email: {data.email}
										</Typography>

										{data.coacher ? (
											<Typography className={classes.pos} color='textSecondary'>
												Coacher: <b>{data.coacher.name}</b>
											</Typography>
										) : (
											<Typography className={classes.pos} color='textSecondary'>
												Coacher: NULL
											</Typography>
										)}
										<Typography className={classes.pos} color='textSecondary'>
											Thời gian coaching:{" "}
											{moment(data.time).format("DD/MM/YYYY")}
										</Typography>
										<Typography className={classes.pos} color='textSecondary'>
											Trạng thái: <b>{data.status} </b>
											<Button
												size='small'
												color='secondary'
												onClick={() => {
													handleOpenEditStatus(data._id);
												}}>
												Sửa trạng thái
											</Button>
										</Typography>
										{data.status === "Đã gặp" && (
											<Typography className={classes.pos} color='textSecondary'>
												Phản hồi KH: {data.comment}
											</Typography>
										)}
										<Typography
											variant='body2'
											component='p'
											style={{ color: "rgb(36, 51, 65)" }}>
											Note: {data.note}{" "}
										</Typography>
									</CardContent>
									<CardActions>
										<Button
											size='small'
											variant='contained'
											color='primary'
											onClick={(e) => {
												handleOpenEditNote(data._id);
											}}>
											Thêm note
										</Button>

										{/* edit status */}
										{data._id === clickedEdit && (
											<EditCoachingStatusForm
												idBookedCoaching={data._id}
												isOpen={isOpenEditStatus}
												onCloseForm={handleCloseEditStatus}
												value={data.status}
												// onStatusChange={(e) => setStatusChange(e.target.value)}
												onEditStatusSubmit={handleEditStatusSubmit}
												onSuccess={success}
												onError={error}
											/>
										)}

										{/* edit note */}
										{data._id === clickedIdChangeForm ? (
											<NoteSearchFree
												nameUserChange={data.name}
												idUserChange={data._id}
												isOpenForm={openNote}
												onCloseForm={handleChangeNoteClose}
												onChangeNoteSubmit={handleNoteSubmit}
												onFormChange={(e) => setNewNote(e.target.value)}
												onSuccess={success}
												onError={error}
												currentNote={data.note}
											/>
										) : (
											""
										)}

										<Button
											size='small'
											variant='contained'
											color='secondary'
											onClick={() => {
												handleOpenDeleteConfirm(data._id);
											}}>
											Xóa
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

export default DirectMeeting;
