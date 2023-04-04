const express=require("express")
const noteRouter=express.Router()
const {NoteModel}=require("../model/Note.model")
noteRouter.get("/",async(req,res)=>{
    const notes=await NoteModel.find()
    res.send(notes)
    
})


noteRouter.post("/create",async(req,res)=>{
    const payload=req.body
  const note=new NoteModel(payload)
  await note.save()
  res.send({"msg":"Note Created"})
})

noteRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body  // => through payload i am getting thing what i want to update
    const noteID=req.params.id
    const note=await NoteModel.findOne({"_id":noteID})
    const userID_in_note=note.userID;
    const userID_making_req=req.body.userID
    try{
        if(userID_making_req!==userID_in_note){
            res.send({"msg":"You are not authorized"})
        }else{
            await NoteModel.findByIdAndUpdate({_id:noteID},payload)
            res.send("Update the note")
        }
        
    }catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
   
})
 


noteRouter.delete("/delete/:id",async(req,res)=>{

    const noteID=req.params.id
    const note=await NoteModel.findOne({"_id":noteID})
    const userID_in_note=note.userID;
    const userID_making_req=req.body.userID
    try{
        if(userID_making_req!==userID_in_note){
            res.send({"msg":"You are not authorized"})
        }else{
        await NoteModel.findByIdAndDelete({_id:noteID})
        res.send({"mag":`Note with id ${noteID} has been deleted`})
        }
    }catch(err){}
   console.log(err);
   res.send({"msg":"Something went wrong"})
})


// noteRouter.delete("/delete/:id",async(req,res)=>{
//     const noteID=req.params.id
//     await NoteModel.findByIdAndDelete({_id:noteID})
//     res.send({"mag":`Note with id ${noteID} has been deleted`})
// })

module.exports={noteRouter}