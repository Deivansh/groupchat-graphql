export default function makeSendMessage({ groupsDb, usersDb, messagesDb }) {
	return async function sendMessage({ content, author, group }) {
		if (!content || content.trim() === "") return new Error("Invalid content.");
		if (!author || author.trim() === "") return new Error("Invalid author.");
		let userExist = await usersDb.findById({ _id: author });
		if (!userExist) return new Error("Author does not exist.");
		if (!group || !group.trim() === "") return new Error("Invalid group.");
		let groupExist = await groupsDb.findByGroupId({ _id: group });
		if (!groupExist) return new Error("Group does not exist.");
		return await messagesDb.populatedInsert({ content, author, group });
	};
}
