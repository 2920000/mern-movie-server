const mongoose = require("mongoose");
const replyComment =mongoose.Schema({
  userName: {
    type: String,
  },
  avatar: {
    type: String,
  },
  replyComment: {
    type: String,
  },
  createAt:{
    type:Date,
  },
})

const commentUserSchema = mongoose.Schema({
  commentId:{
    type: String,
    require: true,
  },
  movieId: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
  createAt:{
    type:Date,
     default:Date.now()
  },
  reply:[replyComment]
});

const commentSchema = mongoose.Schema({
  movieId: {
    type: String,
    require: true,
  },
  comments: [commentUserSchema],
});

module.exports = mongoose.model("Comments", commentSchema);
