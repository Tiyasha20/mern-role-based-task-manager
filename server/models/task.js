const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    description:String,

    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    priority:{
        type:String,
        enum:["Low","Medium","High"],
        default:"Medium"
    },

    status:{
        type:String,
        enum:["Pending","In Progress","Completed"],
        default:"Pending"
    },

    dueDate:Date

},{timestamps:true});

module.exports = mongoose.model("Task",taskSchema);