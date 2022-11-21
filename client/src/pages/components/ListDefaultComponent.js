import React from "react";

function ListDefaultComponent(props) {
	return (
		<li className="collection-item" key={props.id}>
			<p>ID: {props.id}</p>
			<p className="grey-text">Created At: {props.createdAt}</p>
			<p className="grey-text">Updated At: {props.updatedAt}</p>
		</li>
	);
}

export default ListDefaultComponent;
