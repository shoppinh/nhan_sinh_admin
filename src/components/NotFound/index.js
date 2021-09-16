import { Button, Typography } from "@material-ui/core";
import React from "react";

function NotFound() {
	return (
		<React.Fragment>
			<Typography variant='h3'>Oopss ... Not found</Typography>

			<Button href='/' color='secondary'>
				Back to Home Page
			</Button>
		</React.Fragment>
	);
}

export default NotFound;
