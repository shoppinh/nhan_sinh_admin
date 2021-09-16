import React from "react";
import { TreeNode } from "react-organizational-chart";

const TreeRecursion = (props) => {
	const { child } = props;
	// console.log("child: ", child);
	return (
		<TreeNode
			label={
				<div>
					{child.name}
					<br /> ({child.phone})
				</div>
			}>
			{child.children &&
				child.children.map((node, index) => (
					<TreeRecursion key={index} child={node} />
				))}
		</TreeNode>
	);
};

export default TreeRecursion;
