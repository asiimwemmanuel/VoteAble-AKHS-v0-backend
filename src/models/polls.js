const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const optionSchema = new Schema({
	text: {
		type: String,
		required: true,
		unique: true,
	},
	votes: {
		type: Number,
		default: 0,
	},
	photo: {
		type: String,
	},
});

const pollSchema = new Schema({
	question: {
		type: String,
		required: true,
	},
	options: [optionSchema],
	voted: [{ type: String }],
	owner: {
		type: Object,
		required: true
	},
	created: {
		type: Date,
		default: Date.now(),
	},
	class: {
		type: String,
		required: true,
	},
	house: {
		type: String,
		required: true
	}
});

const Poll = mongoose.model("Poll", pollSchema);
module.exports = Poll;
