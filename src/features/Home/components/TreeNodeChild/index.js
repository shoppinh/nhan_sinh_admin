import { Typography } from "@material-ui/core";
import React from "react";
import { Tree } from "react-organizational-chart";
import { Card, CardBody, CardHeader } from "shards-react";
import TreeRecursion from "./TreeRecursion";

const TreeNodeChild = (props) => {
	const { listTree } = props;

	// console.log("listTree: ", listTree);

	return (
		<React.Fragment>
			<div className='header'>
				<Typography
					variant='h5'
					style={{ margin: "2rem 0 1rem", textAlign: "center" }}>
					Sơ đồ các cấp users
				</Typography>
			</div>
			<Card small className='h-100'>
				<CardHeader className='border-bottom'>
					<h6 className='m-0'>Sơ đồ các cấp users</h6>
				</CardHeader>
				<CardBody className='pt-0'>
					<Tree
						label='ROOT'
						lineBorderRadius='10px'
						lineColor='green'
						lineHeight='30px'
						lineWidth='3px'
						nodePadding='5px'>
						{/* {!listTree.children && <TreeRecursion nameChild={listTree.name} />} */}
						{/* <TreeRecursion nameChild={listTree.name} /> */}

						{/* {listTree.children && */}
						{listTree.map((node) => (
							<TreeRecursion key={node._id} child={node}>
								{/* {node.children && (
									<TreeNodeChild
										key={node.children._id}
										listTree={node.children}
									/>
								)} */}
							</TreeRecursion>
						))}
					</Tree>
				</CardBody>
			</Card>
		</React.Fragment>
	);
};

export default TreeNodeChild;
