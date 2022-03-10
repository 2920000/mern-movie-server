const Comment=require('../model/comment')

const getComments=async(req,res)=>{
    const movieId=req.params.movieId
    console.log(movieId)
 try {
    const movieRoom= await Comment.findOne({movieId})
      res.json(movieRoom.comments)
 } catch (error) {
     console.log(error.message)
 }
}

const getComment=async(req,res)=>{
    const movieId =req.params.movieId
    const commentId =req.params.commentId
console.log(movieId,commentId)
    try {
        const comment= await Comment.findOne(
            {movieId}
         )
         const userComments=comment.comments
        const commentFilter=userComments.find(comment=>comment.commentId===commentId)
       res.json(commentFilter)

    } catch (error) {
      console.log(error)  
    }

}


const createComment=async(req,res)=>{
    const {movieId,userName,avatar,message,createAt,commentId } =req.body
try {
    const existingMovieRoom= await Comment.findOne({movieId})
    let comments;
    if(!existingMovieRoom) {
     comments= await Comment.create({
            movieId:movieId,
            comments:[
               {
                commentId,
                userName,
                avatar,
                message,
                createAt,
               }
            ]
        })
    }
   else{
 
    existingMovieRoom.comments.push({
        commentId,
        userName,
        avatar,
        message,
        createAt,

    })
     await existingMovieRoom.save()
   }
   res.json({
    commentId,
    userName,
    avatar,
    message,
    createAt,
    reply:[]
   })
      
} catch (error) {
    console.log(error.message)
}
}
const  replyComment=async(req,res)=>{
    const movieId =req.params.movieId
    const {commentId,replyComment,userName,avatar,createAt}=req.body
    console.log({commentId,replyComment,userName,avatar,createAt})
    try {
        const comment= await Comment.findOne(
           {movieId}
        )
        const userComments=comment.comments
        const commentFilter=userComments.find(comment=>comment.commentId===commentId)
        commentFilter.reply.push(
            {
                userName,
                avatar,
                replyComment,
                createAt
            }
        )
        comment.save()
    
        res.json({
            userName,
            avatar,
            replyComment,
            createAt
        })
    } catch (error) {
      console.log('fall')   
    }
}

const getReplyComment=async(req,res)=>{
    const movieId =req.params.movieId
    const commentId =req.params.commentId

    try {
        const comment= await Comment.findOne(
            {movieId}
         )
         const userComments=comment.comments
        const commentFilter=userComments.find(comment=>comment.commentId===commentId)
       res.json(commentFilter)

    } catch (error) {
      console.log(error)  
    }
}

module.exports={getComments,createComment,replyComment,getReplyComment,getComment}