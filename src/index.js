import { ApolloServer } from "apollo-server";
import "./data-access";
import { typeDefs } from "./graphql/typedefs";
import { resolvers } from "./graphql/resolvers";
import contextMiddleware from "./middlewares";

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: contextMiddleware,
	subscriptions: {
		path: "/subscriptions",
	},
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
