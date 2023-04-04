const express=require("express")
const{connection}= require("./db")
const{userRouter}=require("./routes/User.routes")
const{noteRouter}=require("./routes/Note.route")
const {authenticate}=require("./middleware/authenticate.middleware")
const cors=require("cors")
const app=express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)
app.listen(8080,async()=>{
    try{
        await connection
        console.log("Connected to db");
    }catch(err){
        console.log({"msg":err});
    }
    console.log("running in port 8080");
})