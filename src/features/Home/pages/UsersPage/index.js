import { Grid, TableHead, Tooltip, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import AddShoppingCartOutlinedIcon from "@material-ui/icons/AddShoppingCartOutlined";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import customerApi from "../../../../api/customerApi";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import formatCash from "../../../../components/FormatMoney";
import SearchTerm from "../../../../components/Search";
import AddingSlotVip from "../../components/AddingSlotVip";
import DepositUserForm from "../../components/DepositUserForm";
import ListServiceBought from "../../components/ListServiceBought";

const useStyles1 = makeStyles((theme) => ({
	root: {
		flexShrink: 0,
		marginLeft: theme.spacing(2.5),
	},

	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},

	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	table: {
		minWidth: 650,
	},
}));

function TablePaginationActions(props) {
	const classes = useStyles1();
	const theme = useTheme();
	const { count, page, rowsPerPage, onPageChange } = props;

	const handleFirstPageButtonClick = (event) => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<div className={classes.root}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label='first page'>
				{theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label='previous page'>
				{theme.direction === "rtl" ? (
					<KeyboardArrowRight />
				) : (
					<KeyboardArrowLeft />
				)}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label='next page'>
				{theme.direction === "rtl" ? (
					<KeyboardArrowLeft />
				) : (
					<KeyboardArrowRight />
				)}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label='last page'>
				{theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</div>
	);
}

TablePaginationActions.propTypes = {
	count: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
	table: {
		minWidth: 500,
	},
});

export default function CustomPaginationActionsTable() {
	const classes = useStyles2();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	// confirm dialog
	const [confirmID, setConfirmID] = useState(false);
	const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);

	// check state change and update use useEffect
	const [isListChanged, setIsListChanged] = useState(false);

	// dataUser == row in table in material ui
	const [rows, setRows] = useState([]);

	const [listServiceUserBought, setListServiceUserBought] = useState([]);

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const [openChangeMoneyForm, setOpenChangeMoneyForm] = useState(false);
	const [openListServiceBought, setOpenListServiceBought] = useState(false);
	const [clickedOpenChangeMoneyFromID, setClickedOpenChangeMoneyFromID] =
		useState("");
	const [clickedOpenListServiceBought, setClickedOpenListServiceBought] =
		useState("");
	const [newMoney, setNewMoney] = useState("");
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	const handleChangeMoneyOpen = (id) => {
		setOpenChangeMoneyForm(true);
		setClickedOpenChangeMoneyFromID(id);
	};

	const handleChangeMoneyClose = () => {
		setOpenChangeMoneyForm(false);
	};

	const handleListServiceBoughtOpen = (id) => {
		setOpenListServiceBought(true);
		setClickedOpenListServiceBought(id);
	};

	const handleListServiceBoughtClose = () => {
		setOpenListServiceBought(false);
	};

	// get list info users
	useEffect(() => {
		const fetchGetListUsers = async () => {
			try {
				const response = await customerApi.getListUsers();
				console.log(response.data);
				setRows(response.data);
			} catch (error) {
				// console.log("failed to fetch product list: ", error);
			}
		};

		fetchGetListUsers();
	}, [isListChanged]);

	// // handle change money of users using async function and promise technique
	// const handleSubmit = (idUser) => {
	// 	if (idUser && newMoney) {
	// 		const dataNewMoney = {
	// 			newMoney: newMoney,
	// 		};

	// 		const fetchChangeMoney = () => {
	// 			customerApi
	// 				.patchMoney(idUser, dataNewMoney)
	// 				.then(function (response) {
	// 					setSuccess(true);

	// 					setTimeout(() => {
	// 						setIsListChanged(false);
	// 						setOpenChangeMoneyForm(false);
	// 						setSuccess(false);
	// 					}, 1500);
	// 				})
	// 				.catch(function (error) {
	// 					setError(true);
	// 					setTimeout(() => {
	// 						setOpenChangeMoneyForm(false);
	// 						setError(false);
	// 					}, 1500);
	// 				});
	// 		};

	// 		setIsListChanged(true);
	// 		fetchChangeMoney();
	// 	}
	// };

	// handle change money of users using async/await technique
	const handleSubmit = (idUser) => {
		if (idUser && newMoney) {
			const dataNewMoney = {
				newMoney: newMoney,
			};

			const fetchChangeMoney = async () => {
				try {
					await customerApi.patchMoney(idUser, dataNewMoney);
					setSuccess(true);

					setTimeout(() => {
						setIsListChanged(false);
						setOpenChangeMoneyForm(false);
						setSuccess(false);
					}, 1500);
				} catch {
					setError(true);
					setTimeout(() => {
						setOpenChangeMoneyForm(false);
						setError(false);
					}, 1500);
				}
			};

			setIsListChanged(true);
			fetchChangeMoney();
		}
	};

	// get list service users bought
	useEffect(() => {
		if (clickedOpenListServiceBought) {
			const fetchListServiceUserBought = async () => {
				try {
					const response = await customerApi.getListServiceUserBought(
						clickedOpenListServiceBought
					);
					setListServiceUserBought(response.data);
				} catch (error) {
					console.log("failed to fetch product list: ", error);
				}
			};
			fetchListServiceUserBought();
		}
	}, [clickedOpenListServiceBought]);

	const handleDeleteUser = (id) => {
		setConfirmID(id);
		setIsOpenConfirmDialog(true);
	};

	// handle delete users
	const handleClickConfirmDelete = (id) => {
		if (id) {
			const fetchDeleteUser = () => {
				customerApi
					.deleteUser(id)
					.then(function (response) {
						setSuccess(true);

						setTimeout(() => {
							setIsListChanged(false);

							setIsOpenConfirmDialog(false);
							setSuccess(false);
						}, 1500);
					})
					.catch(function (error) {
						setError(true);
						setTimeout(() => {
							setIsOpenConfirmDialog(false);
							setError(false);
						}, 1500);
					});
			};

			setIsListChanged(true);
			fetchDeleteUser();
		}
	};

	const [openAddingSlotVip, setOpenAddingSlotVip] = useState(false);
	const [clickedOpenAddingSlotVip, setClickedOpenAddingSlotVip] = useState("");

	const handleOpenAddingSlotVip = (id) => {
		setOpenAddingSlotVip(true);
		setClickedOpenAddingSlotVip(id);
	};

	const handleCloseAddingSlotVip = (id) => {
		setOpenAddingSlotVip(false);
	};

	// adding new slot vip for user by admin
	const handleSubmitChangeSlotVipSubmit = (idUser, idService) => {
		if (idUser && idService) {
			const dataSlotVip = {
				serviceID: idService,
				userID: idUser,
			};

			const fetchChangeSlotVip = () => {
				customerApi
					.postAddingSlotVip(dataSlotVip)
					.then(function (response) {
						setSuccess(true);

						setTimeout(() => {
							setIsListChanged(false);

							setOpenAddingSlotVip(false);
							setSuccess(false);
						}, 1500);
					})
					.catch(function (error) {
						setError(true);
						setTimeout(() => {
							setOpenAddingSlotVip(false);
							setError(false);
						}, 1500);
					});
			};

			setIsListChanged(true);
			fetchChangeSlotVip();
		}
	};

	function handleFiltersChange(newFilters) {
		let arrayFiltered = [];

		const lowerCasedFilter = newFilters.searchTerm.toLowerCase();

		if (lowerCasedFilter) {
			// setIsRowsChanges(!isRowsChanges);

			rows.filter((item) => {
				const nameFiltered = item.phone
					.toLowerCase()
					.includes(lowerCasedFilter);
				if (nameFiltered) {
					arrayFiltered.push(item);
				}
			});

			setRows(arrayFiltered);
		} else {
			setIsListChanged(!isListChanged);
		}
	}

	return (
		<React.Fragment>
			<Typography variant='h5' style={{ marginBottom: "1rem" }}>
				Danh sách users
			</Typography>
			<TableContainer component={Paper}>
				<SearchTerm
					onSubmit={handleFiltersChange}
					handleReload={() => setIsListChanged(!isListChanged)}
				/>
				<Table className={classes.table} aria-label='custom pagination table'>
					<TableHead style={{ backgroundColor: "#bdc3c7" }}>
						<TableRow>
							<TableCell>ID </TableCell>
							<TableCell>Phone</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Service Bought</TableCell>
							<TableCell>Full Report</TableCell>
							<TableCell>Coaching</TableCell>
							<TableCell>Vip Search</TableCell>
							<TableCell>Money</TableCell>
							<TableCell>Delete</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{(rowsPerPage > 0
							? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							: rows
						).map((row, index) => (
							<TableRow key={row._id}>
								<TableCell>{index + 1}</TableCell>
								<TableCell>{row.phone}</TableCell>
								<TableCell>
									{row.isVerified === true
										? "Đã xác thực tài khoản"
										: "Chưa xác thực tài khoản"}
								</TableCell>
								<TableCell>{row.name}</TableCell>
								<TableCell>{row.email}</TableCell>
								<TableCell>
									<Grid container alignItems='center'>
										<Grid item style={{ paddingRight: "5px" }}>
											{row.serviceBought}
										</Grid>
										<Grid item>
											<Tooltip title='Thông tin dịch vụ đã mua'>
												<IconButton
													aria-label='deposit'
													type='button'
													onClick={() => handleListServiceBoughtOpen(row._id)}>
													<CheckBoxOutlinedIcon color='secondary' />
												</IconButton>
											</Tooltip>
										</Grid>
										{row._id === clickedOpenListServiceBought ? (
											<ListServiceBought
												nameUser={row.name}
												idListService={row._id}
												isOpenForm={openListServiceBought}
												onCloseForm={handleListServiceBoughtClose}
												listServiceUserBought={listServiceUserBought}
											/>
										) : (
											""
										)}
									</Grid>
								</TableCell>
								<TableCell>{row.vip}</TableCell>
								<TableCell>{row.trucTiep}</TableCell>

								<TableCell>
									<Grid container alignItems='center'>
										<Grid item style={{ paddingRight: "5px" }}>
											{row.slotVip}
										</Grid>
										<Grid item>
											<Tooltip title='Thêm lượt tra cứu VIP cho user'>
												<IconButton
													aria-label='deposit'
													type='button'
													onClick={() => handleOpenAddingSlotVip(row._id)}>
													<AddShoppingCartOutlinedIcon color='secondary' />
												</IconButton>
											</Tooltip>
										</Grid>
										<Grid item xs={12}>
											expire: {moment(row.expirySlotVIP).format("DD/MM/YYYY")}
										</Grid>
									</Grid>
									{row._id === clickedOpenAddingSlotVip ? (
										<AddingSlotVip
											nameUserChange={row.name}
											isOpenForm={openAddingSlotVip}
											onCloseForm={handleCloseAddingSlotVip}
											onClickAddingService={(idService) => {
												handleSubmitChangeSlotVipSubmit(row._id, idService);
											}}
											onSuccess={success}
											onError={error}
										/>
									) : (
										""
									)}
								</TableCell>

								<TableCell>
									<Grid container alignItems='center'>
										<Grid item style={{ paddingRight: "5px" }}>
											{formatCash("" + row.money)} VNĐ
										</Grid>
										<Grid item>
											<Tooltip title='Chỉnh sửa ngân lượng'>
												<IconButton
													aria-label='deposit'
													type='button'
													onClick={() => handleChangeMoneyOpen(row._id)}>
													<AddOutlinedIcon color='secondary' />
												</IconButton>
											</Tooltip>
										</Grid>
									</Grid>
									{row._id === clickedOpenChangeMoneyFromID ? (
										<DepositUserForm
											nameUserChange={row.name}
											idUserChange={row._id}
											isOpenForm={openChangeMoneyForm}
											onCloseForm={handleChangeMoneyClose}
											onChangeMoneyFormSubmit={handleSubmit}
											onFormChange={(e) => setNewMoney(e.target.value)}
											onSuccess={success}
											onError={error}
										/>
									) : (
										""
									)}
								</TableCell>
								<TableCell>
									<Tooltip title='Xóa user'>
										<IconButton
											aria-label='deposit'
											type='button'
											onClick={() => handleDeleteUser(row._id)}>
											<DeleteOutlineOutlinedIcon color='secondary' />
										</IconButton>
									</Tooltip>

									{confirmID === row._id ? (
										<ConfirmDialog
											isOpen={isOpenConfirmDialog}
											onClose={(e) => setIsOpenConfirmDialog(false)}
											onClickConfirm={(e) => {
												handleClickConfirmDelete(row._id);
											}}
											id={row._id}
											userName={row.name}
											onSuccess={success}
											onError={error}
										/>
									) : (
										""
									)}
								</TableCell>
							</TableRow>
						))}

						{emptyRows > 0 && (
							<TableRow style={{ height: 53 * emptyRows }}>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
								count={rows.length}
								rowsPerPage={rowsPerPage}
								page={page}
								SelectProps={{
									inputProps: { "aria-label": "rows per page" },
									native: true,
								}}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
								ActionsComponent={TablePaginationActions}
							/>
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</React.Fragment>
	);
}
