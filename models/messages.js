const mongoose = require("mongoose")

const Schema = mongoose.Schema

const messageSchema = new Schema(
    {
        title: {
            type: String,
            required: false,
        },

        body: {
            type: String,
            required: true,
        },
        sender: {
            type: String,
            required: true,
        },
        receiver: {
            type: String,
            required: true,
        },
        seen: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Message", messageSchema)