import mongoose from "mongoose";
const { Schema } = mongoose;

const groupsSchema = new Schema({
	name: { type: String, required: true },
	createdOn: { type: Date, default: Date.now() },
	published: { type: Boolean, default: true },
});

const Group = mongoose.model("Group", groupsSchema);

export default Group;
