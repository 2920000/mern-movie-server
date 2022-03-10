const express =require('express')
const router=express.Router()
const {getComments,createComment,replyComment,getReplyComment,getComment} =require('../controllers/comment')
router.get('/:movieId',getComments)
router.post('/',createComment)
router.get('/:movieId/:commentId',getComment)
router.post('/:movieId/reply',replyComment)
router.get('/:movieId/reply/:commentId',getReplyComment)

module.exports=router