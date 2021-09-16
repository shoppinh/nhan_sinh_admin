import { ThemeProvider } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import React, { Suspense } from "react";
import { createTheme } from "@material-ui/core/styles";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

const MainPage = React.lazy(() => import("./features/Home/pages/MainPage"));
const SignIn = React.lazy(() => import("./features/Auth/pages/SignIn"));
const Users = React.lazy(() => import("./features/Home/pages/UsersPage"));
const DirectMeeting = React.lazy(() =>
	import("./features/Home/pages/DirectMeeting")
);
const ListSearchFree = React.lazy(() =>
	import("./features/Home/pages/ListSearchFree")
);
const Services = React.lazy(() => import("./features/Home/pages/Services"));
const Coachers = React.lazy(() => import("./features/Home/pages/Coachers"));

const theme = createTheme({
	palette: {
		primary: {
			main: "#34495e",
		},
		secondary: purple,
	},
	typography: {
		fontFamily: "Quicksand",
		fontWeightLight: 400,
		fontWeightRegular: 500,
		fontWeightMedium: 600,
		fontWeightBold: 700,
	},
});

function App() {
	// viet 1 ham de auth state and set the local state
	// nhan 1 user, kiem tra xem co user hay ko, neu	 ko thi redirect sang trang login form

	// check neu nhu co user -> hanlde something here

	// -> la 1 useEffect de lang nghe xem nguoi dung da dang nhap hay chua
	return (
		<Suspense fallback={<div>Loading ...</div>}>
			<ThemeProvider theme={theme}>
				<Router>
					<Switch>
						<Route path='/sign-in' component={SignIn} />
						<Layout>
							<PrivateRoute exact path='/' component={MainPage} />
							<PrivateRoute exact path='/users' component={Users} />
							<PrivateRoute
								exact
								path='/list-search-free'
								component={ListSearchFree}
							/>
							<PrivateRoute exact path='/services' component={Services} />
							<PrivateRoute exact path='/coachers' component={Coachers} />
							<PrivateRoute
								exact
								path='/direct-meeting'
								component={DirectMeeting}
							/>
						</Layout>
						{/* <PrivateRoute path='*' component={NotFound} /> */}
						<Redirect from='/' to='/sign-in' />
					</Switch>
				</Router>
			</ThemeProvider>
		</Suspense>
	);
}

export default App;
