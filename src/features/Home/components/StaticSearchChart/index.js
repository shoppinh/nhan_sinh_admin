import { Typography } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Card, CardBody, CardHeader, Col, Row } from "shards-react";
import statisticApi from "../../../../api/statisticApi";
import RangeDatePicker from "../../../../components/common/RangeDatePicker";

const date = new Date();

const initialEndDay = moment(date).format("YYYY-MM-DD");

const initialStartDay = moment().subtract(1, "months").format("YYYY-MM-DD");

const StaticSearchChart = () => {
	const [labelsDayRange, setLabelsDayRange] = useState([]);
	const [countFreeSearch, setCountFreeSearch] = useState([]);
	const [countVipSearch, setCountVipSearch] = useState([]);
	const [amountDirection, setAmountDirection] = useState([]);

	const [startDay, setStartDay] = useState(initialStartDay);
	const [endDay, setEndDay] = useState(initialEndDay);

	const [isStateChanged, setIsStartChanged] = useState(false);

	const data = {
		labels: labelsDayRange,
		datasets: [
			{
				data: countFreeSearch,
				label: "Tra cứu miễn phí",
				borderColor: "#2c3e50",
				fill: false,
			},
			{
				data: countVipSearch,
				label: "Tra cứu VIP",
				borderColor: "#16a085",
				fill: false,
			},
			{
				data: amountDirection,
				label: "Gặp trực tiếp",
				borderColor: "#c0392b",
				fill: false,
			},
		],
	};
	const options = {
		legend: {
			display: true,
			position: "bottom",
		},
	};

	// get statistic amount of search free, vip search and direct coaching
	useEffect(() => {
		const fetchStatisticSearchFree = () => {
			statisticApi
				.postSearchFreeStatistic({
					start: startDay,
					end: endDay,
				})
				.then((response) => {
					setLabelsDayRange(response.data.dayRange);
					setCountFreeSearch(response.data.count);
				})
				.catch((error) => {
					console.log(error);
				});
		};

		const fetchStatisticSearchVip = () => {
			statisticApi
				.postSearchVipStatistic({
					start: startDay,
					end: endDay,
				})
				.then((response) => {
					setCountVipSearch(response.data.count);
				})
				.catch((error) => {
					console.log(error);
				});
		};

		const fetchStatisticDirect = () => {
			statisticApi
				.postDirectionalStatistic({
					start: startDay,
					end: endDay,
				})
				.then((response) => {
					setAmountDirection(response.data.count);
				})
				.catch((error) => {
					console.log(error);
				});
		};

		fetchStatisticSearchFree();
		fetchStatisticSearchVip();
		fetchStatisticDirect();
	}, [isStateChanged]);

	const handleFilter = (data) => {
		setIsStartChanged(true);
		setTimeout(() => {
			setIsStartChanged(false);
		}, 1500);

		setStartDay(data.start);
		setEndDay(data.end);
	};

	return (
		<React.Fragment>
			<div className='header'>
				<Typography
					variant='h5'
					style={{ margin: "2rem 0 1rem", textAlign: "center" }}>
					Số lượt tra cứu theo từng ngày
				</Typography>
			</div>
			<Card small className='h-100'>
				<CardHeader className='border-bottom'>
					<h6 className='m-0'>Thống kê số lượt tra cứu theo từng ngày</h6>
				</CardHeader>
				<CardBody className='pt-0'>
					<Row className='border-bottom py-2 bg-light'>
						<Col sm='6' className='d-flex mb-2 mb-sm-0'>
							<RangeDatePicker
								startDay={startDay}
								endDay={endDay}
								onStartDayChange={(e) => {
									setStartDay(e.target.value);
								}}
								onEndDayChange={(e) => {
									setEndDay(e.target.value);
								}}
								onFilter={handleFilter}
							/>
						</Col>
					</Row>
					<Line data={data} options={options} />
				</CardBody>
			</Card>
		</React.Fragment>
	);
};

export default StaticSearchChart;
