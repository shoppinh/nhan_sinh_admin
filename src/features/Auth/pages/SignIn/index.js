import { Avatar, Container, CssBaseline, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import userApi from "../../../../api/userApi";
import { getMe } from "../../../../app/userSlice";
import satsi_logo from "../../../../assets/images/logo_footer.png";
import "./SignIn.css";
import { addUser } from "./signInSlice";

const useStyles = makeStyles((theme) => ({
	paper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		width: theme.spacing(8),
		height: theme.spacing(8),
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const SignIn = () => {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();

	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [signInError, setSignInError] = useState(false);

	const handleSubmitSignIn = (e) => {
		e.preventDefault();

		const dataSignIn = {
			phone: phone,
			password: password,
		};

		const fetchSignInData = () => {
			try {
				userApi
					.signIn(dataSignIn)
					.then(function (response) {
						localStorage.setItem("token", response.data.token);

						setTimeout(() => {
							const dispatchUser = dispatch(addUser(response.data));
							const currentUser = unwrapResult(dispatchUser);

							// dispatch getMe to redux
							dispatch(getMe(response.data));

							history.push("/");
						}, 1000);
					})
					.catch(function (error) {
						setSignInError(true);
						setTimeout(() => {
							setSignInError(false);
						}, 2000);
					});
			} catch (error) {
				console.log("failed to fetch product list: ", error);
			}
		};

		fetchSignInData();
	};
	return (
		<div className='signIn_wrapper'>
			<div className='signIn_block'>
				<Container component='main' maxWidth='xs'>
					<CssBaseline />
					<div className={classes.paper}>
						<Avatar className={classes.avatar} src={satsi_logo}></Avatar>
						<Typography component='h1' variant='h5' className='titleLogin'>
							Minh Triết Nhân Sinh Admin
						</Typography>
						<form
							className={classes.form}
							autoComplete='off'
							onSubmit={handleSubmitSignIn}>
							<TextField
								label='Phone number'
								color='secondary'
								validate='true'
								type='text'
								onChange={(e) => setPhone(e.target.value)}
								autoFocus
								fullWidth
								variant='outlined'
								margin='normal'
								required
								autoFocus
							/>
							<TextField
								label='Password'
								variant='outlined'
								color='secondary'
								validate='true'
								type='password'
								fullWidth
								onChange={(e) => setPassword(e.target.value)}
								margin='normal'
								required
								autoComplete='current-password'
							/>
							{signInError && (
								<Alert
									variant='filled'
									severity='error'
									style={{ marginTop: "1rem", justifyContent: "center" }}>
									Tài khoản hoặc mật khẩu không chính xác
								</Alert>
							)}
							<Button
								variant='contained'
								color='primary'
								type='submit'
								fullWidth
								className={classes.submit}>
								Đăng Nhập
							</Button>
						</form>
					</div>
				</Container>
			</div>
		</div>
	);
};

export default SignIn;
