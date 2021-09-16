import { CssBaseline, Hidden, IconButton, Tooltip } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { ExitToApp, SubjectOutlined } from "@material-ui/icons";
import DirectionsBikeOutlinedIcon from "@material-ui/icons/DirectionsBikeOutlined";
import DnsOutlinedIcon from "@material-ui/icons/DnsOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsActiveOutlinedIcon from "@material-ui/icons/NotificationsActiveOutlined";
import PeopleOutlinedIcon from "@material-ui/icons/PeopleOutlined";
import PermContactCalendarOutlinedIcon from "@material-ui/icons/PermContactCalendarOutlined";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import userApi from "../../api/userApi";
import logoSatsi from "../../assets/images/logo_satsi.png";
import ListNotify from "../ListNotify";
import "./Layout.css";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
	return {
		root: {
			display: "flex",
		},
		drawer: {
			[theme.breakpoints.up("lg")]: {
				width: drawerWidth,
				flexShrink: 0,
			},
		},

		appBar: {
			[theme.breakpoints.up("lg")]: {
				width: `calc(100% - ${drawerWidth}px)`,
				marginLeft: drawerWidth,
			},
		},

		menuButton: {
			marginRight: theme.spacing(2),
			[theme.breakpoints.up("lg")]: {
				display: "none",
			},
		},

		drawerPaper: {
			width: drawerWidth,
		},
		active: {
			background: "#f4f4f4",
		},
		title: {
			padding: theme.spacing(2),
		},

		date: {
			flexGrow: 1,
		},
		toolbar: theme.mixins.toolbar,
		avatar: {
			margin: theme.spacing(1),
			width: theme.spacing(8),
			height: theme.spacing(8),
			margin: "0 auto",
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
		},

		wrapperNotify: {
			position: "relative",
		},
	};
});

export default function Layout({ children }) {
	const classes = useStyles();
	const history = useHistory();
	const location = useLocation();
	const theme = useTheme();

	// const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const menuItems = [
		{
			text: "Home",
			icon: <HomeOutlinedIcon color='primary' />,
			path: "/",
		},
		{
			text: "Users",
			icon: <PeopleOutlinedIcon color='primary' />,
			path: "/users",
		},
		{
			text: "Coachers",
			icon: <PermContactCalendarOutlinedIcon color='primary' />,
			path: "/coachers",
		},

		{
			text: "Coaching",
			icon: <DirectionsBikeOutlinedIcon color='primary' />,
			path: "/direct-meeting",
		},
		{
			text: "Services",
			icon: <DnsOutlinedIcon color='primary' />,
			path: "/services",
		},
		{
			text: "Voucher Free",
			icon: <SubjectOutlined color='primary' />,
			path: "/list-search-free",
		},
	];
	const handleLogout = () => {
		localStorage.removeItem("token");
		history.push("/sign-in");
	};

	const handleClickNavigate = (path) => {
		setMobileOpen(false);
		history.push(path);
	};

	/* side drawer */
	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<div style={{ textAlign: "center" }}>
				<img alt='admin' src={logoSatsi} style={{ width: "140px" }} />
			</div>
			<Typography variant='h6' className={classes.title}>
				Minh Triết Nhân Sinh
			</Typography>
			<List>
				{menuItems.map((item) => (
					<ListItem
						button
						key={item.text}
						onClick={(e) => {
							handleClickNavigate(item.path);
						}}
						className={location.pathname == item.path ? classes.active : null}>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText primary={item.text} />
					</ListItem>
				))}
			</List>
		</div>
	);

	const [reload, setReload] = useState(false);
	const [listNotify, setListNotify] = useState([]);
	const [isOpen, setIsOpen] = useState(false);

	// setInterval(function () {
	// 	setReload(!reload);
	// }, 3000);

	// get notify three days
	useEffect(() => {
		const fetchListCoachers = async () => {
			try {
				const interval = setInterval(async () => {
					const response = await userApi.getNotify();
					setListNotify(response.data);
				}, 300000);

				return () => clearInterval(interval);
			} catch (error) {
				console.log("failed to fetch product list: ", error);
			}
		};
		fetchListCoachers();
	}, []);

	const handleShowNotification = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			{/* app bar */}
			<AppBar position='fixed' className={classes.appBar} color='primary'>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						className={classes.menuButton}>
						<MenuIcon />
					</IconButton>
					<Typography className={classes.date}>
						{moment(new Date()).format("DD/MM/YYYY")}
					</Typography>

					{/* {listNotify.length > 0 } */}
					<div className={classes.wrapperNotify}>
						<IconButton
							style={{ marginRight: "2rem", color: "#fff" }}
							variant='contained'
							onClick={handleShowNotification}>
							<Badge badgeContent={listNotify.length} color='secondary'>
								<NotificationsActiveOutlinedIcon />
							</Badge>
						</IconButton>
						{listNotify.length > 0 && (
							<ListNotify listNotify={listNotify} isOpen={isOpen} />
						)}
					</div>

					<Tooltip title='Đăng Xuất'>
						<IconButton
							variant='contained'
							onClick={handleLogout}
							aria-label='delete'>
							<Typography variant='caption' style={{ color: "white" }}>
								Đăng xuất
							</Typography>
							<ExitToApp
								color='secondary'
								style={{ color: "white", marginLeft: "5px" }}
							/>
						</IconButton>
					</Tooltip>
				</Toolbar>
			</AppBar>

			<nav className={classes.drawer} aria-label='mailbox folders'>
				<Hidden lgUp implementation='css'>
					<Drawer
						// container={container}
						variant='temporary'
						anchor={theme.direction === "rtl" ? "right" : "left"}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden mdDown implementation='css'>
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant='permanent'
						open>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>

			{/* main content */}
			<div className={classes.content}>
				<div className={classes.toolbar}></div>
				{children}
			</div>
		</div>
	);
}
