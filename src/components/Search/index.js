import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import ReplayIcon from "@material-ui/icons/Replay";
import React, { useRef, useState } from "react";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: "2px 4px",
		display: "flex",
		alignItems: "center",
		width: 300,
		marginBottom: "1rem",
		border: "1px solid #bdc3c7",
		borderBottomLeftRadius: 0,
		borderTopLeftRadius: 0,
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
		padding: 10,
	},
	divider: {
		height: 20,
		margin: 4,
	},
}));
const SearchTerm = (props) => {
	const classes = useStyles();
	const { onSubmit, handleReload } = props;
	const [searchTerm, setSearchTerm] = useState("");
	const typingTimeoutRef = useRef(null);

	function handleSearchTermChange(e) {
		const value = e.target.value;
		setSearchTerm(value);

		if (!onSubmit) return;

		if (typingTimeoutRef.current) {
			clearTimeout(typingTimeoutRef.current);
		}

		typingTimeoutRef.current = setTimeout(() => {
			const formValues = {
				searchTerm: value,
			};

			onSubmit(formValues);
		}, 300);
	}

	const handleClickReload = () => {
		setSearchTerm("");
		handleReload();
	};
	return (
		<React.Fragment>
			<Paper component='form' className={classes.root}>
				<InputBase
					className={classes.input}
					placeholder='Search by phone number...'
					value={searchTerm}
					onChange={handleSearchTermChange}
				/>
				<IconButton
					// type='submit'
					onClick={handleClickReload}
					color='primary'
					className={classes.iconButton}
					aria-label='search'>
					<ReplayIcon />
				</IconButton>
			</Paper>
		</React.Fragment>
	);
};

export default SearchTerm;
