import { React, useState } from "react";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";

const REGISTER_USER = gql`
	mutation addUser($email: String!, $password: String!) {
		addUser(email: $email, password: $password) {
			email
			_id
			token
		}
	}
`;

export default function Register(props) {
	const [variables, setVariables] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState({
		isError: false,
		errorMessage: "",
	});
	const [registerUser, { loading }] = useMutation(REGISTER_USER, {
		update: (_, __) => {
			props.history.push("/login");
		},
		onError: (err) => {
			setErrors({ isError: true, errorMessage: err.graphQLErrors[0].message });
		},
	});
	const submitRegisterForm = (e) => {
		e.preventDefault();
		registerUser({ variables });
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
				<Row className="registerBg">
					<Col>
						<h1 className="text-center">REGISTER</h1>
						<Form onSubmit={submitRegisterForm}>
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
									{loading ? "loading..." : "Register"}
								</Button>
							</div>
						</Form>
					</Col>
				</Row>
			)}
		</div>
	);
}
