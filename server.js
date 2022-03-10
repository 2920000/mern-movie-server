const express =require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const bodyParser=require('body-parser')
const routerUser=require('./routes/user')
const routerComment=require('./routes/comment')
const app=express()
app.use(cors())
app.use(bodyParser.json())

app.use('/user',routerUser)
app.use('/movie',routerComment)

const CONNECTION_URL=process.env.DATABASE_URL
const PORT =process.env.PORT||5000
mongoose.connect(CONNECTION_URL)
.then(()=>{
app.listen(PORT,()=>{
    console.log(`server is running on port :${PORT}`)
})
})
.catch(error=>{
    console.log(error)
})