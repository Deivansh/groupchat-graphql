import {
	getGroups,
	createGroup,
	createUser,
	getUsers,
	logoutUser,
	loginUser,
	sendMessage,
	getMessage,
} from "../use-cases";
export const resolvers = {
	// Message: {
	// 	createdOn: ({ createdOn }) => createdOn.toISOString(),
	// },
	Query: {
		getGroups: async (_, args, { user }) => {
			try {
				if (!user) return new Error("User not authenticated.");
				return await getGroups.getPaginatedGroups(args);
			} catch (error) {
				return new Error(error);
			}
		},
		getUsers: async (_, __, { user }) => {
			try {
				if (!user) return new Error("User not authenticated.");
				return await getUsers.getAllUsers();
			} catch (error) {
				return new Error(error);
			}
		},
		loginUser: async (_, args) => {
			try {
				return await loginUser(args);
			} catch (error) {
				return new Error(error);
			}
		},
		logoutUser: async (_, args) => {
			try {
				return await logoutUser(args);
			} catch (error) {
				return new Error(error);
			}
		},
		getMessages: async (_, args, { user }) => {
			try {
				if (!user || !user._id) return new Error("User not authenticated.");
				return await getMessage.getPopulatedMessagesByGroup({
					...args,
				});
			} catch (error) {
				return new Error(error);
			}
		},
	},
	Mutation: {
		addGroup: async (_, args) => {
			try {
				return await createGroup(args);
			} catch (error) {
				return new Error(error);
			}
		},
		addUser: async (_, args) => {
			try {
				return await createUser(args);
			} catch (error) {
				return new Error(error);
			}
		},
		sendMessage: async (parent, args, { user, pubsub }) => {
			try {
				if (!user || !user._id) return new Error("User not authenticated.");
				const message = await sendMessage({ ...args, author: user._id });
				pubsub.publish("NEW_MESSAGE", {
					newMessage: message,
				});

				return message;
			} catch (error) {
				return new Error(error);
			}
		},
	},
	Subscription: {
		newMessage: {
			subscribe: (_, __, { user, pubsub }) => {
				if (!user || !user._id) return new Error("User not authenticated.");
				return pubsub.asyncIterator(["NEW_MESSAGE"]);
			},
		},
	},
};
