import makeContextMiddleware from "./context-middleware";
import jwt from "jsonwebtoken";
import { PubSub } from "apollo-server";
const pubsub = new PubSub();

const contextMiddleware = makeContextMiddleware({ jwt, pubsub });

export default contextMiddleware;
