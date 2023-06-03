const multer = require("multer")

const upload=multer({storage:storage})

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
 cb("null","public/images")
    },
    
filename:(req,file,cb
    )=>{

    cb(null,file.originalname)

    }


})
app.post("/api/upload",upload.single("file"),(req,res)=>{


    
})