import { Container, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import statisticApi from "../../../../api/statisticApi";
import StaticSearchChart from "../../components/StaticSearchChart";
import StatisticDeposit from "../../components/StatisticDeposit";
import TreeNodeChild from "../../components/TreeNodeChild";

const MainPage = () => {
	const [listTree, setListTree] = useState([]);

	useEffect(() => {
		const fetchStatisticDeposit = () => {
			statisticApi
				.getTreeUsers()
				.then((response) => {
					setListTree(response.data);
				})
				.catch((error) => {
					console.log(error);
				});
		};
		fetchStatisticDeposit();
	}, []);

	return (
		<React.Fragment>
			<Container>
				<Typography
					style={{ margin: "1rem 0 ", textAlign: "center" }}
					variant='h4'
					component='h1'>
					Trang chủ admin Minh Triết Nhân Sinh
				</Typography>

				<StaticSearchChart />

				<StatisticDeposit />

				<TreeNodeChild listTree={listTree} />
			</Container>
		</React.Fragment>
	);
};

export default MainPage;
