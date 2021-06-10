export default function makeGetUsers({ usersDb }) {
	return Object.freeze({
		getAllUsers,
		getUserById,
	});

	async function getAllUsers() {
		return await usersDb.findAll();
	}

	async function getUserById(_id) {
		return await usersDb.findById({ _id });
	}
}
