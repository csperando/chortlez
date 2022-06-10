/*
 * Schema for jokes
 *
 * @author Coleman Sperando
 *
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// // add the currency type for prices if desired
// require("mongoose-currency").loadType(mongoose);
// const Currency = mongoose.Types.Currency;

const commentSchema = new Schema ({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    review: {
        type: String,
        required: true
    }
});

const jokeSchema = new Schema({
    setup: {
        type: String,
        required: true
    },
    punchline: {
        type: String,
        required: true
    },
    nsfw: {
        type: Boolean,
        default: false,
        required: false // `required` property is not required when default is defined
    },
    comments: [commentSchema],
    keywords: [String]
}, {
    timestamps: true
});

var jokes = mongoose.model("Jokes", jokeSchema);
module.exports = jokes;
