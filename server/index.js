const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");

require("dotenv").config();

// database connection
require("./db/connection.js")

const app = express();
const port = process.env.PORT || 4000;

// all the routes file
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));



//cookie-parser
app.use(cookieParser(process.env.COOKIE_SECRET));

// file uploader
const {avatarUpload} = require("./middleware/avatarUpload")
const {FileUploader} = require("./middleware/CloudinaryFileUpload")

// test route
app.use("/home",(req,res) => {
  
  res.status(200).send("I am listening")
})

app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/categories",categoryRoute);

app.use("/api/upload",avatarUpload);


app.use(express.static(path.join(__dirname, '/../client/build/')));
app.get('*', (req, res) =>{
  res.sendFile(path.join(__dirname, '/../client/build/index.html'))
});



app.use((err,req,res,next) => {
  res.status(404).json({ message : err.message });
})

app.listen(port,()=>{
  console.log(`Server is runing on ${port}`)
})