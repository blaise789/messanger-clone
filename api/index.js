const express=require("express")
const userRoute=require('./routes/users')
const authRoute=require("./routes/auth")
const postRoute=require('./routes/posts')

const app=express()

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
app.use(helmet())
app.use(morgan("common"))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
  });
  
app.use("/api/posts",postRoute)

app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)

// any request will be taken to the authorization zone
app.listen(7000,()=>{
 console.log('the server is running  on port 7000 ');


})

// api sets endpoint where we can find resources