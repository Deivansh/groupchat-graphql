import mongoose from "mongoose";
const { Schema } = mongoose;

const messagesSchema = new Schema({
	author: { type: Schema.Types.ObjectId, ref: "User" },
	content: { type: String, required: true },
	group: { type: Schema.Types.ObjectId, ref: "Group" },
	createdOn: { type: Number, default: Date.now() },
});

const Message = mongoose.model("Message", messagesSchema);

export default Message;
