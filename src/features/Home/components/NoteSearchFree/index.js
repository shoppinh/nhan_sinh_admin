import {
	Button,
	Container,
	Fade,
	Modal,
	TextField,
	Typography,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
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
}));

const NoteSearchFree = (props) => {
	const classes = useStyles();
	const {
		nameUserChange,
		idUserChange,
		isOpenForm,
		onCloseForm,
		onChangeNoteSubmit,
		onFormChange,
		onSuccess,
		onError,
		currentNote,
	} = props;

	const handleFormSubmit = (e) => {
		e.preventDefault();
		onChangeNoteSubmit(idUserChange);
		// console.log(object);
	};

	return (
		<Modal
			aria-labelledby='transition-modal-title'
			aria-describedby='transition-modal-description'
			className={classes.modal}
			open={isOpenForm}
			onClose={onCloseForm}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}>
			<Fade in={isOpenForm}>
				<div className={classes.paper}>
					<Container size='sm'>
						<Typography variant='h5' style={{ marginBottom: "1rem" }}>
							Note - khách hàng:
							<span
								style={{
									fontWeight: "bold",
									margin: "0 5px",
									fontStyle: "italic",
								}}>
								{nameUserChange}
							</span>
						</Typography>

						<form noValidate autoComplete='off' onSubmit={handleFormSubmit}>
							<TextField
								className={classes.field}
								id='outlined-multiline-static'
								label='Note'
								multiline
								color='secondary'
								fullWidth
								rows={5}
								defaultValue={currentNote}
								onChange={onFormChange}
								variant='outlined'
								style={{ marginBottom: "1rem" }}
								type='text'
							/>
							<Button
								color='secondary'
								variant='contained'
								onClick={onCloseForm}>
								Hủy
							</Button>
							<Button
								style={{ float: "right" }}
								type='submit'
								color='primary'
								variant='contained'>
								Xác nhận
							</Button>
						</form>
						{onSuccess && (
							<Alert
								variant='filled'
								severity='success'
								style={{ marginTop: "1rem", justifyContent: "center" }}>
								Thay đổi note thành công
							</Alert>
						)}
						{onError && (
							<Alert
								variant='filled'
								severity='error'
								style={{ marginTop: "1rem", justifyContent: "center" }}>
								Thay đổi note không thành công
							</Alert>
						)}
					</Container>
				</div>
			</Fade>
		</Modal>
	);
};

export default NoteSearchFree;
