export default function makeAuthentication({ jwt }) {
	return async function authentication(token) {
		if (!token || token.trim() === "") return new Error("Invalid token.");
		const actualToken = token.split("jwt ")[1];
		return await jwt.verify(actualToken, "graphqlsecret");
	};
}
