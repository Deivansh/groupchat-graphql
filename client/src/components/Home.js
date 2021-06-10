import { React, useState, Fragment, useEffect } from "react";
import { Row, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { gql, useLazyQuery, useSubscription } from "@apollo/client";
import { useAuthDispatch, useAuthState } from "../contexts/auth";
import { useMessageDispatch } from "../contexts/message";
import Group from "./Group";
import Messages from "./Messages";

const LOGOUT_USER = gql`
	query logoutUser($email: String!) {
		logoutUser(email: $email)
	}
`;

const NEW_MESSAGE = gql`
	subscription newMessage {
		newMessage {
			content
			author {
				email
			}
			group {
				name
				_id
			}
		}
	}
`;

export default function Home() {
	const [errors, setErrors] = useState({
		isError: false,
		errorMessage: "",
	});
	const authDispatch = useAuthDispatch();
	const authState = useAuthState();
	const messageDispatch = useMessageDispatch();

	const [logoutUser, {}] = useLazyQuery(LOGOUT_USER, {
		fetchPolicy: "no-cache",
		onError: (err) => {
			setErrors({ isError: true, errorMessage: err.graphQLErrors[0].message });
		},
		onCompleted: () => {
			authDispatch({ type: "LOGOUT" });
			window.location.href = "/login";
		},
	});

	const logout = () => {
		logoutUser({ variables: { email: authState.user.email } });
	};

	const { data: messageData, error: messageError } =
		useSubscription(NEW_MESSAGE);

	useEffect(() => {
		if (messageError) console.log(messageError);
		if (messageData) {
			// console.log(messageData);
			messageDispatch({
				type: "ADD_MESSAGE",
				payload: {
					groupId: messageData.newMessage.group._id,
					message: messageData.newMessage,
				},
			});
		}
	}, [messageError, messageData]);
	return (
		<div>
			{errors.isError ? (
				<Alert
					variant="danger"
					onClick={() => setErrors({ isError: false, errorMessage: "" })}
					dismissible
				>
					{errors.errorMessage}
				</Alert>
			) : (
				<Fragment>
					<Row className="bg-white justify-content-around mb-5">
						<Link to="/login">
							<Button variant="link">Login</Button>
						</Link>
						<Link to="/register">
							<Button variant="link">Register</Button>
						</Link>
						<Button variant="link" onClick={logout}>
							Logout
						</Button>
					</Row>
					<Row className="bg-white">
						<Group></Group>
						<Messages></Messages>
					</Row>
				</Fragment>
			)}
		</div>
	);
}
