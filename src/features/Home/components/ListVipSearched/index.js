import { Button, Container, Fade, Modal, Typography } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Alert from "@material-ui/lab/Alert";
import moment from "moment";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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
	container: {
		maxHeight: 440,
	},
}));

const ListVipSearched = (props) => {
	const classes = useStyles();
	const { nameUser, isOpenForm, onCloseForm, listServiceUserBought } = props;

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
			}}
		>
			<Fade in={isOpenForm}>
				<div className={classes.paper}>
					<Container size='sm'>
						<Typography variant='h5' style={{ marginBottom: "1rem" }}>
							Danh sách dịch vụ
							<span
								style={{
									fontWeight: "bold",
									margin: "0 5px",
									fontStyle: "italic",
								}}
							>
								{nameUser}
							</span>
							đã mua
						</Typography>

						{listServiceUserBought.length > 0 ? (
							<TableContainer
								style={{ marginBottom: "1rem" }}
								className={classes.container}
								component={Paper}
							>
								<Table stickyHeader aria-label='sticky table'>
									<TableHead>
										<TableRow>
											<TableCell>ID</TableCell>
											<TableCell>Tên</TableCell>
											<TableCell>Giá</TableCell>
											<TableCell>Lượt Tra Cứu</TableCell>
											<TableCell>Ngày Mua</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{listServiceUserBought.map((serviceBought, index) => (
											<TableRow key={serviceBought._id}>
												<TableCell>{index + 1}</TableCell>
												<TableCell>
													{serviceBought.service == null ? (
														<span>Null</span>
													) : (
														serviceBought.service.title
													)}
												</TableCell>
												<TableCell>
													{serviceBought.service == null ? (
														<span>Null</span>
													) : (
														serviceBought.service.price
													)}
												</TableCell>
												<TableCell>
													{serviceBought.service == null ? (
														<span>Null</span>
													) : (
														serviceBought.service.quantity
													)}
												</TableCell>
												<TableCell>
													{" "}
													{moment(serviceBought.createdAt).format("DD/MM/YYY")}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						) : (
							<Alert
								severity='success'
								color='info'
								style={{ marginBottom: "1rem" }}
							>
								Nguười dùng chưa mua dịch vụ
							</Alert>
						)}

						<Button
							type='submit'
							color='secondary'
							variant='contained'
							onClick={onCloseForm}
						>
							Đóng
						</Button>
					</Container>
				</div>
			</Fade>
		</Modal>
	);
};

export default ListVipSearched;
