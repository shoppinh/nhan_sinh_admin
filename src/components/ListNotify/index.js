import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles(() => ({
	root: {
		position: "absolute",
		right: "0px",
		width: "300px",
		backgroundColor: "#34495e",
		top: "56px",
		borderBottomLeftRadius: "1rem",
		borderBottomRightRadius: "1rem",
		color: "#fff",
		transitionDelay: "0.4s",
		boxShadow: ".4rem .5rem 1rem rgba(0,0,0,.35)",
	},
	inline: {
		display: "inline",
		color: "#95a5a6",
		fontSize: "0.8rem",
	},
}));

export default function ListNotify(props) {
	const classes = useStyles();

	const { listNotify, isOpen } = props;

	return (
		<List
			className={classes.root}
			style={{ display: isOpen ? "block" : "none" }}>
			{listNotify.map((notify) => (
				<ListItem alignItems='flex-start' key={notify._id}>
					<ListItemAvatar>
						<Avatar alt='coacher_avatar' src={notify.coacher.avatar} />
					</ListItemAvatar>
					<ListItemText
						primary='Thông báo quá hạn!'
						secondary={
							<React.Fragment>
								<Typography
									component='span'
									variant='body2'
									className={classes.inline}>
									Coacher{" "}
									<b style={{ color: "#ecf0f1" }}>{notify.coacher.name} </b> có
									lịch hẹn coaching với{" "}
									<b style={{ color: "#ecf0f1" }}> {notify.name}</b> nhưng chưa
									thấy phản hồi.
								</Typography>
							</React.Fragment>
						}
					/>
				</ListItem>
			))}
		</List>
	);
}
