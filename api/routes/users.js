const User=require('../models/User')
const bcrypt=require("bcrypt")
const router=require("express").Router()


router.get("/",async(req,res)=>{
try{
const users=await User.find()
res.status(200).json(users)
}
catch(err){
    res.status(500).json(`Error: ${err.message}`)
}

})
router.put("/:id",async(req,res)=>{
    // if (req.body.userId==req.params.id) or the req.body is admin

    if(req.body.userId===req.params.id  || req.body.isAdmin) {
if(req.body.password){
    try{
        req.body.password=await bcrypt.hash(req.body.password,10)
    }
    catch(err){
        return res.status(500).json(err)
    }}
    try{
        const user=await User.findByIdAndUpdate(req.params.id,{
            $set:req.body

        })
        res.status(200).json("the Account has been updated successfully")

    }
     catch(err){
        return res.status(500).json(err)

        
     }


  }  
  else{
    return res.status(403).json("you are only allowed to update your account")
  }
//   to mean that a user cannot update other id
})
router.delete("/:id",async (req,res)=>{
if(req.body.userId===req.params || req.body.isAdmin){


    try{
        const user=await User.findByIdAndDelete({_id:req.params.id})
        res.send("deleted successfully")
    }
    catch(err){
        return res.status(500).json(err)

    }
}
else{
    return res.status(403).json("you can delete only your account!")
}

  
    


})
router.get("/:id",async (req,res)=>{
    try{
        const user=await User.findById(req.params.id)
 
         const {password, updatedAt,...other}=user._doc
        res.status(200).json(other)
    }
    catch(err){
        res.status(500).json(err)
    }
})
router.put("/:id/follow",async (req,res)=>{
  if(req.body.userId !==req.params.id){
    try{
        const user=  await User.findById(req.params.id)
        // the be followed the user who has logged in
        const currentUser=await User.findById(req.body.userId)
        // to follow 
//  you follow the one with different id
if(!user.followers.includes(req.body.userId)){
await user.updateOne({$push:{followers:req.body.userId}})
 await currentUser.updateOne({$push:{followings:req.params.id}})
// allow  theu current user to follow the user
res.json(`${currentUser.username} has  followed  ${user.username} `).status(200);

}
else{
    res.json(403).json("you already follow the user")
}
    }
    catch(err){
res.status(500).json(`Error:${err.message}`)
// we are not able to update due to server errors
    }
  }
  else{

res.status(403).json("you can't follow yourself")

  }


})
// to unfollow the user on this id
router.put('/:id/unfollow',async (req,res)=>{
    if(req.body.userId !==req.params.id){
try{
    const user=await User.findById(req.params.id)
    const currentUser=await User.findById(req.body.userId)
    // if you followed
    if(user.followers.includes(req.body.userId)){
      
        await user.updateOne({$pull: { followers: req.body.userId}})
    await currentUser.updateOne({$pull:{ followings: req.params.id}})
      res.json(`${currentUser.username} has unfollowed ${user.username}`) ;
 
       }   
  else{
        res.status(403).json("you can't unfollow the user becauase you don't follow him /her ")
        // 403 means that it understands the request but cna not respond
}
}
catch(err){
    // forexample if await returned nothing
    res.status(500).json(  `Error:${err.message}`)


}  }
else{
        res.status(403).json("you can't unfollow yourself")
    }
})
// get all users posts

module.exports=router
