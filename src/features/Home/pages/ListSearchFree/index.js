import { TableHead, Tooltip, Typography } from "@material-ui/core";
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
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import NoteAddOutlinedIcon from "@material-ui/icons/NoteAddOutlined";
import Alert from "@material-ui/lab/Alert";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import listSearchFreeApi from "../../../../api/listSearchFreeApi";
import SearchTerm from "../../../../components/Search";
import NoteSearchFree from "../../components/NoteSearchFree";

const useStyles1 = makeStyles((theme) => ({
	root: {
		flexShrink: 0,
		marginLeft: theme.spacing(2.5),
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

	// dataUser == row in table in material ui
	const [rows, setRows] = useState([]);

	const [openNote, setOpenNote] = useState(false);
	const [clickedIdChangeForm, setClickedIdChangeForm] = useState("");
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	const handleChangeNoteOpen = (id) => {
		setOpenNote(true);
		setClickedIdChangeForm(id);
	};

	const handleChangeNoteClose = () => {
		setOpenNote(false);
	};

	const [newNote, setNewNote] = useState("");
	const [isRowsChanges, setIsRowsChanges] = useState(false);
	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	// get list free service
	useEffect(() => {
		const fetchGetListSearchFree = async () => {
			try {
				const response = await listSearchFreeApi.getListSearchFree();
				setRows(response.data);
			} catch (error) {
				console.log("failed to fetch product list: ", error);
			}
		};

		fetchGetListSearchFree();
	}, [isRowsChanges]);

	// handle change content of note
	const handleNoteSubmit = (id) => {
		if (id && newNote) {
			const dataNewNote = {
				note: newNote,
			};

			const fetchChangeNote = () => {
				listSearchFreeApi
					.patchNoteListSearchFree(id, dataNewNote)
					.then(function (response) {
						setSuccess(true);

						setTimeout(() => {
							setNewNote(response.data.note);

							setOpenNote(false);
							setSuccess(false);
							setIsRowsChanges(true);
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
			setIsRowsChanges(false);

			fetchChangeNote();
		}
	};

	function handleFiltersChange(newFilters) {
		let arrayFiltered = [];

		const lowerCasedFilter = newFilters.searchTerm.toLowerCase();

		if (lowerCasedFilter) {
			// setIsRowsChanges(!isRowsChanges);

			rows.filter((item) => {
				const nameFiltered = item.phoneNumber
					.toLowerCase()
					.includes(lowerCasedFilter);
				if (nameFiltered) {
					arrayFiltered.push(item);
				}
			});

			setRows(arrayFiltered);
		} else {
			setIsRowsChanges(!isRowsChanges);
		}
	}

	return (
		<React.Fragment>
			<Typography variant='h5' style={{ marginBottom: "1rem" }}>
				Danh sách tra cứu miễn phí
			</Typography>
			<TableContainer component={Paper}>
				<SearchTerm
					onSubmit={handleFiltersChange}
					handleReload={() => setIsRowsChanges(!isRowsChanges)}
				/>
				<Table className={classes.table} aria-label='custom pagination table'>
					<TableHead style={{ backgroundColor: "#bdc3c7" }}>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Tên</TableCell>
							<TableCell>SĐT</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Ngày Sinh</TableCell>
							<TableCell>Địa Chỉ</TableCell>
							<TableCell>Vai Trò</TableCell>
							<TableCell>Note</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{(rowsPerPage > 0
							? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							: rows
						).map((row, index) => (
							<TableRow key={row._id}>
								<TableCell>{index + 1}</TableCell>
								<TableCell component='th' scope='row'>
									{row.name}
								</TableCell>
								<TableCell>{row.phoneNumber}</TableCell>
								<TableCell>{row.email}</TableCell>
								<TableCell>
									{" "}
									{moment(row.birthDay).format("MM/DD/YYYY")}
								</TableCell>
								<TableCell>{row.address}</TableCell>
								<TableCell>
									{row.user ? <span>User</span> : <span>Khách</span>}
								</TableCell>
								<TableCell>
									<Tooltip title='Note thông tin'>
										<IconButton
											aria-label='deposit'
											type='button'
											onClick={() => handleChangeNoteOpen(row._id)}>
											<NoteAddOutlinedIcon color='secondary' />
										</IconButton>
									</Tooltip>
									{row._id === clickedIdChangeForm ? (
										<NoteSearchFree
											nameUserChange={row.name}
											idUserChange={row._id}
											isOpenForm={openNote}
											onCloseForm={handleChangeNoteClose}
											onChangeNoteSubmit={handleNoteSubmit}
											onFormChange={(e) => setNewNote(e.target.value)}
											onSuccess={success}
											onError={error}
											currentNote={row.note}
										/>
									) : (
										""
									)}
								</TableCell>
							</TableRow>
						))}

						{emptyRows > 0 && (
							<TableRow style={{ height: 53 * emptyRows }}>
								<TableCell colSpan={6}></TableCell>
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
