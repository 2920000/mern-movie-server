const User=require('../model/user')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const dotenv=require('dotenv')

 
dotenv.config()
const signin=async(req,res)=>{
const {signinName,password}=req.body
try{
 const existingUser= await User.findOne({signinName})
 if(!existingUser) res.status(400).json({
     inputName:'signinName',
     message:'Tên đăng nhập không tồn tại'
 })
 const checkPassword= await bcrypt.compare(password,existingUser.password)
 if(!checkPassword) res.status(400).json({
    inputName:'password',
    message:'Mật khẩu không chính xác'
 })
 const token=jwt.sign({signinName:existingUser.signinName,id:existingUser._id},process.env.ACCESS_TOKEN_SECRET)
 res.status(200).json({result:existingUser,token})
}catch(error){
    console.log(error.message)  
}
}
const signup=async(req,res)=>{
    const customImageUrl=[
        'https://p1.hiclipart.com/preview/110/885/214/green-circle-child-avatar-user-profile-smile-boy-cartoon-face-png-clipart.jpg',
        'https://thumbs.dreamstime.com/z/faces-avatar-circle-portrait-young-boy-glasses-vector-illustration-eps-flat-cartoon-style-83653696.jpg',
        'https://thumbs.dreamstime.com/z/faces-avatar-circle-portrait-young-boy-glasses-vector-illustration-eps-flat-cartoon-style-86721220.jpg',
        'https://thumbs.dreamstime.com/z/faces-avatar-circle-portrait-young-japanese-boy-glasses-vector-illustration-eps-flat-cartoon-style-86721200.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFRnfKHwI2otNkg8rAPr3sYlZe3U__MA7WQiYFaaUzgHgHVnBc6x2Fuusrq7UYihOpgs8&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1_x2cAZpQGbc2-TvUWMozpgSnCLbFEZA4bpkHUsJNm4cpszZisXM6NLSuHcVYqBYaqDg&usqp=CAU'
    ]
    const randomAvatar=customImageUrl[Math.floor(Math.random()*6)]
   try{
    const {signinName,email,password}=req.body
    const existingUser= await User.findOne({signinName})
    if(existingUser) return res.status(400).json({
        inputName:'signinName',
        message:'Tên đăng nhập đã tồn tại'
    })
    const existingEmail= await User.findOne({email})
    if(existingEmail) return res.status(400).json({
        inputName:'email',
        message:'Email đã được sử dụng'
    })
    const hashPassword =  await bcrypt.hash(password,12)
    const result= await User.create({signinName,email,imageUrl:randomAvatar,password:hashPassword})
    const token = await jwt.sign({signinName:result.signinName,imageUrl:randomAvatar,id:result._id},process.env.ACCESS_TOKEN_SECRET)
    res.status(200).json({result,token})
   }catch(error){
       console.log(error.message)
   }
}
module.exports={signin,signup}