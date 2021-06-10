import { gql } from "apollo-server";

export const typeDefs = gql`
	# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

	type Group {
		name: String!
		_id: ID!
	}

	type User {
		email: String!
		_id: ID
		token: String
	}

	type Message {
		_id: String
		createdOn: String
		content: String!
		author: User
		group: Group
	}

	# The "Query" type is special: it lists all of the available queries that
	# clients can execute, along with the return type for each. In this
	# case, the "books" query returns an array of zero or more Books (defined above).
	type Query {
		getGroups(skip: Int!, limit: Int!): [Group]!
		getUsers: [User]!
		loginUser(email: String!, password: String!): User
		logoutUser(email: String!): String
		getMessages(group: String!): [Message]!
	}

	type Mutation {
		addGroup(name: String!): Group
		addUser(email: String!, password: String!): User
		sendMessage(content: String!, group: String!): Message
	}

	type Subscription {
		bestFriendsMessage: Message!
		schoolFriendsMessage: Message!
		newMessage: Message!
	}
`;
