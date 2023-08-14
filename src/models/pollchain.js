const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pollChainSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    polls: [{ type: mongoose.Schema.Types.ObjectId, ref: "Poll" }],
    created: {
        type: Date,
        default: Date.now(),
    },
    owner: {
        type: Object,
        required: true
    },
});

const PollChain = mongoose.model("PollChains", pollChainSchema);
module.exports = PollChain;


