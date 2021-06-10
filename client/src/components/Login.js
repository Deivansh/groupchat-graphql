import { React, useState } from "react";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { gql, useLazyQuery } from "@apollo/client";
import { useAuthDispatch } from "../contexts/auth";

const LOGIN_USER = gql`
	query loginUser($email: String!, $password: String!) {
		loginUser(email: $email, password: $password) {
			email
			_id
			token
		}
	}
`;

export default function Login(props) {
	const [variables, setVariables] = useState({
		email: "",
		password: "",
	});
	const dispatch = useAuthDispatch();
	const [errors, setErrors] = useState({
		isError: false,
		errorMessage: "",
	});
	const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
		fetchPolicy: "no-cache",
		onError: (err) => {
			setErrors({ isError: true, errorMessage: err.graphQLErrors[0].message });
		},
		onCompleted: (data) => {
			dispatch({ type: "LOGIN", payload: data.loginUser });
			window.location.href = "/";
		},
	});
	const submitLoginForm = (e) => {
		e.preventDefault();
		loginUser({ variables });
	};
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
				<Row className="loginBg">
					<Col>
						<h1 className="text-center">LOGIN</h1>
						<Form onSubmit={submitLoginForm}>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Email address</Form.Label>
								<Form.Control
									type="email"
									placeholder="Enter email"
									value={variables.email}
									onChange={(e) =>
										setVariables({ ...variables, email: e.target.value })
									}
								/>
								<Form.Text className="text-muted">
									We'll never share your email with anyone else.
								</Form.Text>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="Password"
									value={variables.password}
									onChange={(e) =>
										setVariables({ ...variables, password: e.target.value })
									}
								/>
							</Form.Group>
							<div className="text-center">
								<Button variant="success" type="submit" disabled={loading}>
									{loading ? "loading..." : "Login"}
								</Button>
							</div>
						</Form>
					</Col>
				</Row>
			)}
		</div>
	);
}
