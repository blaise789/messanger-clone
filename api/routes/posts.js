const router=require("express").Router()
const { default: mongoose } = require("mongoose")
const Post=require("../models/Post")
const User=require("../models/User")

router.get("/", async (req,res)=>{
  try{
     const posts=await Post.find()
      res.json(posts).status(200);
    }
    catch(err){
        res.status(500).json(`Error: ${err.message}`)
    }


})
router.post("/",async (req,res)=>{
    try{
    const newPost=   await  new Post(req.body)

        const savedPost=await newPost.save()
        res.status(200).json(savedPost)
    }
    catch(err){
res.status(500).json(`Err:${err.message}`);

    }
})
router.put("/:id",async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
      
// if the user who logged in (req.body.userId)
        if(post.userId ===req.body.userId){
await post.updateOne({$set:req.body})
res.status(200).json("the post has been updated")
        }
        else{
res.status(403).json("forbidden to uupdate the post")
        }

        
    }
    catch(err){
        // if we don't fetch the expected data
        res.status(500).json()
    }
})
router.delete("/:id",async (req,res)=>{
    try{
        const post=await Post.find(req.params.id)
      
// if the user who logged in (req.body.userId)
        if(post.userId ===req.body.userId){
await post.deleteOne();
res.status(200).json("the post has been deleted successfully")
        }
        else{
res.status(403).json("forbidden to delete others post the post")
        }

        
    }
    catch(err){
        // if we don't fetch the expected data
        res.status(500).json()
    }
})
router.put("/:id/like",async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        const user=await User.findById(req.body.userId)
      
// if the user who logged in (req.body.userId)
        if(!post.likes.includes(req.body.userId)){
  await post.updateOne({$push:{likes:req.body.userId}});
res.status(200).json(`the post has been liked by ${user.username}`)
        }
        else{
            await post.updateOne({$pull:{likes:req.body.userId}})
            res.status(200).json(`the post has been disliked ${user.username}`)
        }

        
    }
    catch(err){
        // if we don't fetch the expected data
        res.status(500).json(`Err:${err.message}`)

    }
})
router.get("/:id",async (req,res)=>{

    try{

     const post=await Post.findById(req.params.id)
     res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(`Error:${err.message}`)
    }
})
router.get("/timeline/:userId", async (req,res)=>{
try{
    const currentUser=await User.findById(req.params.userId)
    

const userPosts=await Post.find({userId:currentUser._id})
 const friendPosts= await Promise.all(
    // because we need to loop thrpugh the posts
    //  we loop through the user followings Ids
    currentUser.followings.map((friendId)=>{

  return  Post.find({userId: friendId})

    }
    
        )
 )
 res.status(200).json(userPosts.concat(...friendPosts))

}
catch(err){
    res.status(500).json(`Error:${err.message}`)

}


})
// get all the users posts
router.get('/profile/:username',async (req,res)=>{
    try{
        const user=await User.findOne({username:req.params.username})
         const posts=await Post.find({userId:user._id})
 res.status(200).json(posts)
    }
    catch (err){
        res.status(500).json(`Error:${err.message}`)

    }
})

module.exports=router