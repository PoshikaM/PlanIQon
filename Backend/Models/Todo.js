const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
    text : String,
    completed : {type : Boolean, default : false},
    userID : {type : mongoose.Schema.Types.ObjectId, ref: "User"}
})

module.exports = mongoose.model("Todo", TodoSchema)