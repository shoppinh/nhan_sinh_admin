import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import statisticApi from "../../../../api/statisticApi";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import moment from "moment";
import RangeDatePicker from "../../../../components/common/RangeDatePicker";

const date = new Date();

const initialEndDay = moment(date).format("YYYY-MM-DD");

const initialStartDay = moment().subtract(1, "months").format("YYYY-MM-DD");

const StatisticDeposit = () => {
	const [labelsDayRange, setLabelsDayRange] = useState([]);
	const [amountMoney, setAmountMoney] = useState([]);
	const [startDay, setStartDay] = useState(initialStartDay);
	const [endDay, setEndDay] = useState(initialEndDay);

	const [isStateChanged, setIsStartChanged] = useState(false);

	useEffect(() => {
		const fetchStatisticDeposit = () => {
			statisticApi
				.postDepositStatistic({
					start: startDay,
					end: endDay,
				})
				.then((response) => {
					setLabelsDayRange(response.data.dayRange);
					setAmountMoney(response.data.count);
					// this.setState({ resData: response.data });
				})
				.catch((error) => {
					console.log(error);
				});
		};
		fetchStatisticDeposit();
	}, [isStateChanged]);

	const data = {
		labels: labelsDayRange,
		datasets: [
			{
				label: "Số tiền",
				data: amountMoney,
				backgroundColor: "rgba(54, 162, 235, 0.6)",
				borderColor: "rgba(54, 162, 235, 1)",
				borderWidth: 1,
			},
		],
	};

	const options = {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
					},
				},
			],
		},
	};

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
					Tổng số tiền nhận được theo từng ngày
				</Typography>
			</div>
			<Card small className='h-100'>
				<CardHeader className='border-bottom'>
					<h6 className='m-0'>Thống kê tổng số tiền nhận trong ngày</h6>
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
					<Bar data={data} options={options} />
				</CardBody>
			</Card>
		</React.Fragment>
	);
};

export default StatisticDeposit;
