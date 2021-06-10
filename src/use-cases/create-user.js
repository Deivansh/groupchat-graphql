export default function makeCreateUser({ usersDb, bcrypt, jwt }) {
	return async function createUser({ email, password }) {
		if (!email || email.trim() === "") return new Error("Invalid name.");
		if (!password || password.trim() === "")
			return new Error("Invalid password.");
		const userExist = await usersDb.findByEmail({ email });
		if (userExist) return new Error("User already exist.");
		const hashPassword = await bcrypt.hash(password, 8);
		const userObj = {
			email,
			password: hashPassword,
			loggedIn: false,
		};
		return await usersDb.insert(userObj);
	};
}
