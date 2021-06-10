import { connect } from "mongoose";
import Group from "../data-models/group";
import User from "../data-models/user";
import Message from "../data-models/message";
import makeGroupsDb from "./group-db";
import makeUsersDb from "./user-db";
import makeMessagesDb from "./message-db";
import { DB_URL, DB_NAME } from "../config";

connect(
	DB_URL,
	{
		dbName: DB_NAME,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) console.error("DB connection error: " + err);
		else console.log("DB connected!");
	}
);

const groupsDb = makeGroupsDb({ Group });
const usersDb = makeUsersDb({ User });
const messagesDb = makeMessagesDb({ Message });

export { groupsDb, usersDb, messagesDb };
