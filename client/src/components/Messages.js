import { React, useState, useEffect, Fragment } from "react";
import { Col, Form } from "react-bootstrap";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useMessageDispatch, useMessageState } from "../contexts/message";
import Message from "./Message";

const GET_MESSAGES = gql`
	query getMessages($group: String!) {
		getMessages(group: $group) {
			_id
			content
			createdOn
			author {
				email
			}
			group {
				name
			}
		}
	}
`;

const SEND_MESSAGE = gql`
	mutation sendMessage($content: String!, $group: String!) {
		sendMessage(content: $content, group: $group) {
			content
			createdOn
			author {
				email
			}
			group {
				name
			}
		}
	}
`;

export default function Messages() {
	const [
		getMessages,
		{
			loading: messagesLoading,
			data: messagesData,
			refetch: getMessagesRefetch,
		},
	] = useLazyQuery(GET_MESSAGES, {
		fetchPolicy: "network-only",
		// nextFetchPolicy: "cache-first",
	});
	const [sendMessage] = useMutation(SEND_MESSAGE, {
		onError: (err) => console.log(err),
	});
	const dispatch = useMessageDispatch();
	const { groups } = useMessageState();
	const [content, setContent] = useState("");
	const selectedGroup = groups?.find((group) => group.selected === true);
	const messages = selectedGroup?.messages;
	useEffect(() => {
		if (selectedGroup) {
			getMessages({ variables: { group: selectedGroup._id } });
		}
	}, [selectedGroup ? selectedGroup._id : null]);
	useEffect(() => {
		if (messagesData) {
			dispatch({
				type: "SET_GROUP_MESSAGES",
				payload: {
					groupId: selectedGroup._id,
					messages: messagesData.getMessages,
				},
			});
		}
	}, [messagesData]);

	const submitMessage = (e) => {
		e.preventDefault();
		if (!content || content.trim() === "" || !selectedGroup) return;
		setContent("");
		sendMessage({ variables: { content, group: selectedGroup._id } });
	};
	let selectChatMarkup;
	if (!messages && !messagesLoading) {
		selectChatMarkup = <p className="info-text">Select a group.</p>;
	} else if (messagesLoading) {
		selectChatMarkup = <p className="info-text">Messages Loading...</p>;
	} else if (messages.length > 0) {
		selectChatMarkup = messages.map((message, index) => (
			<Fragment key={message._id}>
				<Message message={message}></Message>
				{index === messages.length - 1 && (
					<div className="invisible">
						<hr className="m-0" />
					</div>
				)}
			</Fragment>
		));
	} else if (messages.length === 0) {
		selectChatMarkup = (
			<p className="info-text">
				You are now connected. Send your first message.
			</p>
		);
	}
	return (
		<Col xs={8}>
			<div className="message-box d-flex flex-column-reverse">
				{selectChatMarkup}
			</div>
			<div>
				<Form onSubmit={submitMessage}>
					<Form.Group>
						<Form.Control
							type="text"
							className="message-input rounded-pill bg-secondary border-0 p-4"
							placeholder="Type a message..."
							value={content}
							onChange={(e) => setContent(e.target.value)}
						></Form.Control>
					</Form.Group>
				</Form>
			</div>
		</Col>
	);
}
