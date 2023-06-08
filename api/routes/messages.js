const router=require("express").Router()
const Message=require("../models/Messages")

router.post('/',async (req,res)=>{
   const newMessage=new Message(req.body)
   try{
    const savedMessage= await newMessage.save()
    res.status(200).json(savedMessage)
    
   }
   catch(err){
    res.json(err).status(500)
   }
})




router.get("/:conversationId",async (req,res)=>{
try{
    const messages=await Message.find({
        conversationId:req.params.conversationId,
        
    })
    res.status(200).json(messages)
}
catch(err){
    res.stotus(500)
}
})
module.exports=router