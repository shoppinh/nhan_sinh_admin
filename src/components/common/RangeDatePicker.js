import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import React from "react";
import "./RangeDatePicker.css";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexWrap: "wrap",
		alignItems: "center",
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
}));

const RangeDatePicker = (props) => {
	const classes1 = useStyles();
	const classes = classNames("d-flex", "my-auto", "date-range");

	const { startDay, endDay, onStartDayChange, onEndDayChange, onFilter } =
		props;

	const handleClick = () => {
		const dataFilter = { start: startDay, end: endDay };
		onFilter(dataFilter);

		console.log(dataFilter);
	};

	return (
		<form className={classes1.container} noValidate>
			<TextField
				id='startDate'
				label='Ngày bắt đầu'
				type='date'
				defaultValue={startDay}
				className={classes.textField}
				onChange={onStartDayChange}
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<TextField
				id='endDate'
				label='Ngày kết thúc'
				type='date'
				defaultValue={endDay}
				className={classes.textField}
				onChange={onEndDayChange}
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<Button
				color='primary'
				variant='contained'
				size='small'
				style={{ marginLeft: "0.3rem" }}
				onClick={(e) => {
					handleClick();
				}}>
				Lọc
			</Button>
		</form>
	);
};

export default RangeDatePicker;
