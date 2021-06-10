export default function makeCreateGroup({ groupsDb }) {
	return async function createGroup({ name }) {
		if (!name || name.trim() === "") return new Error("Invalid name.");
		const groupExist = await groupsDb.findByName({ name });
		if (groupExist) return new Error("Group already exist.");
		return await groupsDb.insert({ name });
	};
}
