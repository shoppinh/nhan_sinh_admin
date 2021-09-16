import React, { useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => {
	const history = useHistory();

	return (
		<Route
			{...rest}
			render={(props) => {
				const currentUser = localStorage.getItem("token");
				if (!currentUser) {
					// not logged in so redirect to login page with the return url
					return (
						<Redirect
							to={{ pathname: "/sign-in", state: { from: props.location } }}
						/>
					);
				}

				// authorised so return component
				return <Component {...props} />;
			}}
		/>
	);
};
