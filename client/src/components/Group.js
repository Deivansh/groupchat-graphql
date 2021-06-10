import { React, useState } from "react";
import { Col } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";
import { useMessageDispatch, useMessageState } from "../contexts/message";

const GET_GROUPS = gql`
	query getGroups($skip: Int!, $limit: Int!) {
		getGroups(skip: $skip, limit: $limit) {
			name
			_id
		}
	}
`;

export default function Group() {
	const [errors, setErrors] = useState({
		isError: false,
		errorMessage: "",
	});
	const dispatch = useMessageDispatch();
	let { groups } = useMessageState();
	const { loading, fetchMore } = useQuery(GET_GROUPS, {
		variables: {
			skip: 0,
			limit: 1,
		},
		onCompleted: (data) => {
			dispatch({ type: "SET_GROUPS", payload: data.getGroups });
		},
		onError: (err) =>
			setErrors({ isError: true, errorMessage: "Error finding groups." }),
	});

	const loadMore = () => {
		fetchMore({
			variables: {
				skip: groups.length,
				limit: 1,
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prev;
				dispatch({
					type: "SET_GROUPS",
					payload: [...groups, ...fetchMoreResult.getGroups],
				});
				groups = [...groups, ...fetchMoreResult.getGroups];
				// return Object.assign({}, prev, fetchMoreResult);
			},
		});
	};

	let groupsMarkup;
	if (!groups || loading) {
		groupsMarkup = <p>Loading...</p>;
	} else if (groups.length <= 0) {
		groupsMarkup = <p>No groups present.</p>;
	} else if (groups.length > 0) {
		groupsMarkup = groups.map((group) => (
			<div
				role="button"
				key={group._id}
				className={
					group.selected ? "group-div d-flex bg-white" : "group-div d-flex"
				}
				onClick={() =>
					dispatch({ type: "SET_SELECTED_GROUP", payload: group._id })
				}
			>
				<p className="text-success p-2">{group.name}</p>
			</div>
		));
	}
	return (
		<Col xs={4} className="p-0 bg-secondary">
			<h3>Groups</h3>
			<hr></hr>
			<div>{groupsMarkup}</div>
			<div>
				<button onClick={loadMore}>Load more...</button>
			</div>
		</Col>
	);
}
