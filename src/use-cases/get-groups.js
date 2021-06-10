export default function makeGetGroups({ groupsDb }) {
	return Object.freeze({
		getAllGroups,
		getGroupsById,
		getPaginatedGroups,
	});

	async function getAllGroups() {
		let groups = await groupsDb.findAll();
		return groups;
	}

	async function getPaginatedGroups({ skip, limit }) {
		if (skip < 0) return new Error("Invalid skip count.");
		if (limit < 1) return new Error("Invalid limit count.");
		return await groupsDb.findPaginatedGroups({ skip, limit });
	}

	async function getGroupsById(_id) {
		return await groupsDb.findByGroupId({ _id });
	}
}
