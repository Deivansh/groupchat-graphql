export default function makeGetMessages({ messagesDb }) {
	return Object.freeze({
		getPopulatedMessagesByGroup,
	});

	async function getPopulatedMessagesByGroup({ group }) {
		return await messagesDb.findPopulatedMessagesByGroup({ group });
	}
}
