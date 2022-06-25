const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const router = express.Router();
const path = require("path");
const Post = require("./models/Post");
dotenv.config();
const User = require("./models/User");
mongoose.connect("mongodb://localhost:27017/reconect");
const db=mongoose.connection;
db.on("error",console.error.bind(console,"error in database"));
db.once('open',function(){
  console.log("successfully connected to database");
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type,Accept");
  next();
});
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.get("/allpost",async function(req,res){
  try {
  let posts = await Post.find({});
  res.status(200).json(posts);
  console.log(posts);
} catch (err) {
  res.status(500).json(err);
}
});
app.get('/alluser',async function(req,res){
  try {
    let posts = await User.find({});
    res.status(200).json(posts);
    console.log(posts);
  } catch (err) {
    res.status(500).json(err);
  }
})

app.listen(8800, () => {
  console.log("Backend server is running!");
});
