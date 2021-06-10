import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
	email: { type: String, required: true },
	createdOn: { type: Date, default: Date.now() },
	password: { type: String, required: true },
	loggedIn: { type: Boolean, default: false },
	token: { type: String },
});

export default mongoose.model("User", userSchema);
