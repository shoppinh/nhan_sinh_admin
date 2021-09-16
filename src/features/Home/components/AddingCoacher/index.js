import {
	Button,
	Container,
	Fade,
	Modal,
	TextField,
	Typography,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import React, { useState } from "react";

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
		maxWidth: 500,
	},
	field: {
		marginBottom: "1rem",
	},
	img: {
		marginLeft: "auto",
		marginRight: "auto",
		width: "100px",
		height: "100px",
		objectFit: "cover",
		marginBottom: "1rem",
		borderRadius: "12px",
		boxShadow: ".25rem .25rem 1rem rgba(0,0,0,.3)",
	},
	input: {
		position: "absolute",
		left: "0px",
		cursor: "pointer",
		opacity: 0,
		overFlow: "hidden",
	},
}));

const AddingCoacher = (props) => {
	const classes = useStyles();

	const {
		isAddingCoacherOpen,
		onCloseForm,
		coacherInfo,
		onAddingCoacherSubmit,
		onCoacherInfoChange,
		onSuccess,
		onError,
	} = props;

	const [picture, setPicture] = useState(null);
	const [imgData, setImgData] = useState(null);

	const onChangePicture = (e) => {
		if (e.target.files[0]) {
			setPicture(e.target.files[0]);
			const reader = new FileReader();
			reader.addEventListener("load", () => {
				setImgData(reader.result);
			});
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		var dataAdd = coacherInfo;
		dataAdd.avatar = picture;

		onAddingCoacherSubmit(coacherInfo);
	};

	return (
		<React.Fragment>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={isAddingCoacherOpen}
				onClose={onCloseForm}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}>
				<Fade in={isAddingCoacherOpen}>
					<div className={classes.paper}>
						<Container size='sm'>
							<Typography variant='h5' style={{ marginBottom: "1rem" }}>
								Thêm coacher
							</Typography>

							<form
								autoComplete='off'
								onSubmit={handleSubmit}
								encType='multipart/form-data'>
								<Button
									variant='contained'
									color='primary'
									style={{ position: "relative", cursor: "pointer" }}
									className={classes.field}>
									Chọn avatar
									<input
										name='avatar'
										id='profilePic'
										type='file'
										className={classes.input}
										onChange={onChangePicture}
										// onChange={onCoacherInfoChange}
									/>
								</Button>

								{imgData && (
									<div className='previewProfilePic'>
										<img
											className='playerProfilePic_home_tile'
											src={imgData}
											className={classes.img}
										/>
									</div>
								)}

								<TextField
									className={classes.field}
									label='Họ Tên Coacher'
									variant='outlined'
									color='secondary'
									fullWidth
									type='text'
									name='name'
									onChange={onCoacherInfoChange}
								/>

								<TextField
									className={classes.field}
									label='Số Điện Thoại'
									variant='outlined'
									color='secondary'
									fullWidth
									type='number'
									name='phone'
									onChange={onCoacherInfoChange}
								/>
								<TextField
									className={classes.field}
									label='Email'
									variant='outlined'
									color='secondary'
									fullWidth
									type='email'
									name='email'
									onChange={onCoacherInfoChange}
								/>
								<TextField
									className={classes.field}
									label='Giá'
									variant='outlined'
									color='secondary'
									fullWidth
									type='number'
									name='price'
									onChange={onCoacherInfoChange}
								/>

								<TextField
									className={classes.field}
									label='Giới thiệu'
									variant='outlined'
									color='secondary'
									multiline
									rows={4}
									fullWidth
									type='text'
									name='intro'
									style={{ marginBottom: "1rem" }}
									onChange={onCoacherInfoChange}
								/>
								<Button
									color='secondary'
									variant='contained'
									onClick={onCloseForm}>
									Hủy bỏ
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
									Thêm coacher thành công
								</Alert>
							)}

							{onError && (
								<Alert
									variant='filled'
									severity='error'
									style={{ marginTop: "1rem", justifyContent: "center" }}>
									Thêm coacher không thành công
								</Alert>
							)}
						</Container>
					</div>
				</Fade>
			</Modal>
		</React.Fragment>
	);
};

export default AddingCoacher;
