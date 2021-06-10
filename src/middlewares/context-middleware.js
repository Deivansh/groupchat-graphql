export default function makeContextMiddleware({ jwt, pubsub }) {
	return async function contextMiddleware(context) {
		let token, actualToken;

		if (context.connection && context.connection.context.Authorization) {
			token = context.connection.context.Authorization;
			if (!token || token.trim() === "") return new Error("Invalid token.");
			actualToken = token.split("jwt ")[1];
		} else if (context.req && context.req.headers.authorization) {
			token = context.req.headers.authorization;
			if (!token || token.trim() === "") return new Error("Invalid token.");
			actualToken = token.split("jwt ")[1];
		} else {
			return new Error("Authorization header missing.");
		}

		if (actualToken) {
			const verifiedUser = await jwt.verify(actualToken, "graphqlsecret");
			context.user = verifiedUser;
		}
		context.pubsub = pubsub;
		return context;
	};
}
