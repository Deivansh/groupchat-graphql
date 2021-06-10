export default function makeUsersDb({ User }) {
	return Object.freeze({
		findAll,
		findByEmail,
		findById,
		logoutByEmail,
		findAndUpdateByEmail,
		insert,
		update,
		remove,
	});

	async function findAll() {
		const query = {};
		const result = await User.find(query).lean();
		return result;
	}

	async function findById({ _id }) {
		const result = await User.findOne({ _id }).lean();
		return result;
	}

	async function findByEmail({ email }) {
		const result = await User.findOne({ email }).lean();
		return result;
	}

	async function logoutByEmail({ email }) {
		const result = await User.updateOne(
			{ email },
			{ $set: { loggedIn: false, token: "" } }
		);
		return result.nModified > 0 ? "Logged Out!" : "Could not log out.";
	}

	async function findAndUpdateByEmail({ email, ...updateInfo }) {
		const result = await User.findOneAndUpdate(
			{ email },
			{ $set: { ...updateInfo } },
			{ new: true }
		);
		return result;
	}

	async function insert({ ...userInfo }) {
		const result = await User.create({
			...userInfo,
		});
		return result;
	}

	async function update({ id: _id, ...commentInfo }) {
		const result = await User.updateOne({ _id }, { $set: { ...commentInfo } });
		return result.nModified > 0 ? { _id, ...commentInfo } : null;
	}

	async function remove({ id: _id }) {
		const result = await User.deleteOne({ _id });
		return result.deletedCount;
	}
}
