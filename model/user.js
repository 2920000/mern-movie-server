const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    signinName:{
        type:String,
        require:true
    },
    imageUrl:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    id:{type:String}
})
module.exports=mongoose.model('Users',userSchema)