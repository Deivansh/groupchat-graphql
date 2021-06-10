import React from "react";
import { useAuthState } from "../contexts/auth";
import classNames from "classnames";
export default function Message({ message }) {
	const { user } = useAuthState();
	const sent = message.author.email === user.email;
	return (
		<div
			className={classNames("d-flex my-3", {
				"ml-auto": sent,
				"mr-auto": !sent,
			})}
		>
			<div
				className={classNames("py-2 px-3 rounded-pill", {
					"bg-primary": sent,
					"bg-secondary": !sent,
				})}
			>
				<p className={classNames({ "text-white": sent })} key={message._id}>
					{message.content}
				</p>
			</div>
		</div>
	);
}
