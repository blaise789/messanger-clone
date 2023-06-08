const express=require("express")
const userRoute=require('./routes/users')
const authRoute=require("./routes/auth")
const postRoute=require('./routes/posts')
 const cors=require("cors")
 const path=require("path")
const app=express()

const conversationRoute=require("./routes/conversations")
const messageRoute=require("./routes/messages")
const multer=require("multer")  //

const dotenv=require("dotenv")
const helmet=require("helmet")
const morgan=require("morgan")

dotenv.config()
const mongoose=require("mongoose")
mongoose.connect(   
    
process.env.MONGO_URI,
    {

        useNewUrlParser: true, 
        useUnifiedTopology: true
    }
)
.then(()=>{
    console.log("connected to the database")
})
.catch(err=>{
console.log(err)

}
  
)

app.use(express.json())
// app.use(helmet())
app.use(cors())
app.use(morgan("common"))
// app.use("/images", (req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   next();
// }, express.static(path.join(__dirname, "/public/images/")));

app.use("/images",express.static(path.join(__dirname,"/public/images/")))

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Resource-Policy', 'cross-origin');
//     next()
//   });
  const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images/")
    },
    filename:(req,file,cb)=>{
    cb(null,file.originalname)
    }
  })
  const upload=multer({ storage: storage})
  app.post("/api/upload",upload.single("file") ,  (req,res)=>{
    try{
      return res.status(200).json("file uploaded successfully")

    }
    catch(err){
      console.log(err)
    }
  })
app.use("/api/posts",postRoute)
app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/conversations",conversationRoute)
app.use("/api/messages",messageRoute)
// any request will be taken to the authorization zone
app.listen(7000,()=>{
 console.log('the server is running  on port 7000 ');


})

// api sets endpoint where we can find resources