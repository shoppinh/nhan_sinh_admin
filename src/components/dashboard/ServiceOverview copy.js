import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import axios from "axios";
import RangeDatePicker from "../common/RangeDatePicker";
import Chart from "../../utils/chart.js";
import statisticApi from "../../api/statisticApi";

class UsersOverview extends React.Component {
	constructor(props) {
		super(props);

		this.canvasRef = React.createRef();
		this.state = {
			resData: {},
			start: "",
			end: "",
		};
	}

	componentDidMount() {
		this.callAPI();

		const chartOptions = {
			...{
				responsive: true,
				legend: {
					position: "top",
				},
				elements: {
					line: {
						// A higher value makes the line look skewed at this ratio.
						tension: 0.3,
					},
					point: {
						radius: 0,
					},
				},
				scales: {
					xAxes: [
						{
							gridLines: false,
							ticks: {},
						},
					],
					yAxes: [
						{
							ticks: {
								suggestedMax: 45,
								callback(tick) {
									if (tick === 0) {
										return tick;
									}
									// Format the amounts using Ks for thousands.
									return tick > 999 ? `${(tick / 1000).toFixed(1)}K` : tick;
								},
							},
						},
					],
				},
				hover: {
					mode: "nearest",
					intersect: false,
				},
				tooltips: {
					custom: false,
					mode: "nearest",
					intersect: false,
				},
			},
			...this.props.chartOptions,
		};

		const BlogUsersOverview = new Chart(this.canvasRef.current, {
			type: "LineWithLine",
			data: this.props.chartData,
			options: chartOptions,
		});

		// They can still be triggered on hover.
		const buoMeta = BlogUsersOverview.getDatasetMeta(0);
		buoMeta.data[0]._model.radius = 0;
		buoMeta.data[
			this.props.chartData.datasets[0].data.length - 1
		]._model.radius = 0;

		// Render the chart.
		BlogUsersOverview.render();
	}

	const fetchSearchStatistic =  () => {
		statisticApi
		.postSearchStatistic()
		.then((response) => {
			console.log(response.data);
			this.setState({ resData: response.data });
		})
		.catch((error) => {
			console.log(error);
		});
	};
	fetchSearchStatistic();

	render() {
		const { title } = this.props;
		return (
			<Card small className='h-100'>
				<CardHeader className='border-bottom'>
					<h6 className='m-0'>{title}</h6>
				</CardHeader>
				<CardBody className='pt-0'>
					<Row className='border-bottom py-2 bg-light'>
						<Col sm='6' className='d-flex mb-2 mb-sm-0'>
							<RangeDatePicker />
						</Col>
					</Row>
					<canvas
						height='120'
						ref={this.canvasRef}
						style={{ maxWidth: "100% !important" }}
					/>
				</CardBody>
			</Card>
		);
	}
}

UsersOverview.propTypes = {
	/**
	 * The component's title.
	 */
	title: PropTypes.string,
	/**
	 * The chart dataset.
	 */
	chartData: PropTypes.object,
	/**
	 * The Chart.js options.
	 */
	chartOptions: PropTypes.object,
};
const dayRange = [
	"2021-07-18",
	"2021-07-19",
	"2021-07-20",
	"2021-07-21",
	"2021-07-22",
	"2021-07-23",
	"2021-07-24",
	"2021-07-25",
	"2021-07-26",
	"2021-07-27",
	"2021-07-28",
	"2021-07-29",
	"2021-07-30",
	"2021-07-31",
	"2021-08-01",
	"2021-08-02",
	"2021-08-03",
	"2021-08-04",
	"2021-08-05",
	"2021-08-06",
	"2021-08-07",
	"2021-08-08",
	"2021-08-09",
	"2021-08-10",
	"2021-08-11",
	"2021-08-12",
	"2021-08-13",
	"2021-08-14",
	"2021-08-15",
	"2021-08-16",
	"2021-08-17",
	"2021-08-18",
];

UsersOverview.defaultProps = {
	title: "Thống kê số lượt tra cứu trong các ngày",
	chartData: {
		labels: Array.from(new Array(30), (_, i) => dayRange[i]),
		datasets: [
			{
				label: "Số lượt tra miễn phí trong ngày",
				fill: "start",
				data: [
					0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
					0, 0, 0, 0, 0, 0, 0, 0, 0,
				],
				backgroundColor: "rgba(0,123,255,0.1)",
				borderColor: "rgba(0,123,255,1)",
				pointBackgroundColor: "#ffffff",
				pointHoverBackgroundColor: "rgb(0,123,255)",
				borderWidth: 1.5,
				pointRadius: 0,
				pointHoverRadius: 3,
			},
		],
	},
};

export default UsersOverview;
