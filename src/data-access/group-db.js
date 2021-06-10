export default function makeGroupsDb({ Group }) {
	return Object.freeze({
		findAll,
		findByName,
		findByGroupId,
		findPaginatedGroups,
		insert,
		update,
		remove,
	});

	async function findAll() {
		const query = {};
		const result = await Group.find(query).lean();
		return result;
	}

	async function findByName({ name }) {
		const result = await Group.findOne({ name }).lean();
		return result;
	}

	async function findByGroupId({ _id }) {
		const result = await Group.findOne({ _id }).lean();
		return result;
	}

	async function findPaginatedGroups({ skip, limit }) {
		const result = await Group.find({}).skip(skip).limit(limit).lean();
		return result;
	}

	async function insert({ ...groupInfo }) {
		const result = await Group.create({ ...groupInfo });
		return result;
	}

	async function update({ id: _id, ...commentInfo }) {
		const result = await Group.updateOne({ _id }, { $set: { ...commentInfo } });
		return result.nModified > 0 ? { _id, ...commentInfo } : null;
	}

	async function remove({ id: _id }) {
		const result = await Group.deleteOne({ _id });
		return result.deletedCount;
	}
}
