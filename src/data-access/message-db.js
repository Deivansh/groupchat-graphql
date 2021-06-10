export default function makeMessagesDb({ Message }) {
	return Object.freeze({
		findAll,
		findByAuthor,
		findByGroup,
		insert,
		populatedInsert,
		findPopulatedMessagesByGroup,
	});

	async function findAll() {
		const query = {};
		const result = await Message.find(query).lean();
		return result;
	}

	async function findByAuthor({ author }) {
		const result = await Message.find({ author }).lean();
		return result;
	}

	async function findByGroup({ group }) {
		const result = await Message.find({ group }).lean();
		return result;
	}

	async function findPopulatedMessagesByGroup({ group }) {
		const result = await Message.find({ group })
			.lean()
			.sort({ createdOn: -1 })
			.populate("author")
			.populate("group");
		return result;
	}

	async function insert({ ...messageInfo }) {
		const result = await Message.create({ ...messageInfo });
		return result;
	}

	async function populatedInsert({ ...messageInfo }) {
		const result = await Message.create({
			...messageInfo,
			createdOn: Date.now(),
		});
		await result.populate("author").populate("group").execPopulate();
		return result;
	}
}
