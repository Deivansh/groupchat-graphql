import { groupsDb, usersDb, messagesDb } from "../data-access/index";
import makeGetGroups from "./get-groups";
import makeCreateGroup from "./create-group";
import makeCreateUser from "./create-user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import makeGetUsers from "./get-users";
import makeLogoutUser from "./logout-user";
import makeLoginUser from "./login-user";
import makeAuthentication from "../middlewares/authentication";
import makeSendMessage from "./send-message";
import makeGetMessages from "./get-message";
import { JWT_SECRET } from "../config";

const getGroups = makeGetGroups({ groupsDb });
const createGroup = makeCreateGroup({ groupsDb });
const getUsers = makeGetUsers({ usersDb });
const createUser = makeCreateUser({ usersDb, bcrypt, jwt, JWT_SECRET });
const logoutUser = makeLogoutUser({ usersDb });
const loginUser = makeLoginUser({ usersDb, bcrypt, jwt, JWT_SECRET });
const authentication = makeAuthentication({ jwt });
const sendMessage = makeSendMessage({ groupsDb, usersDb, messagesDb });
const getMessage = makeGetMessages({ messagesDb });

export {
	getGroups,
	createGroup,
	createUser,
	getUsers,
	logoutUser,
	loginUser,
	authentication,
	sendMessage,
	getMessage,
};
