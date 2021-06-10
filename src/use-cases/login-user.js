export default function makeLoginUser({ usersDb, bcrypt, jwt, JWT_SECRET }) {
	return async function loginUser({ email, password }) {
		if (!email || email.trim() === "") return new Error("Invalid email.");
		if (!password || password.trim() === "")
			return new Error("Invalid password.");
		const user = await usersDb.findByEmail({ email });
		if (!user) return new Error("User not found.");
		// if (user.loggedIn === true) return new Error("User already logged in.");
		const correctPassword = await bcrypt.compare(password, user.password);
		if (!correctPassword) return new Error("Incorrect password.");
		const token = await jwt.sign(
			{ _id: user._id, email: user.email },
			JWT_SECRET
		);
		return await usersDb.findAndUpdateByEmail({ email, token, loggedIn: true });
	};
}
