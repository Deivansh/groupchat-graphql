export default function makeLogoutUser({ usersDb }) {
	return async function logoutUser({ email }) {
		if (!email || email.trim() === "") return new Error("Invalid email.");
		return await usersDb.logoutByEmail({ email });
	};
}
