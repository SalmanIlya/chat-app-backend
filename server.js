const http=require("http")
const express=require("express")
const cors=require("cors")
const socketIO=require("socket.io")
const dotenv=require("dotenv")
const  Db  = require("./Database/Db")
const bodyparser=require("body-parser")
const Routes=require("./Routes/AdminRoutes")
dotenv.config({path:"Config/.env"})
Db()
const port=process.env.port

const app = express()
app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
const server=http.createServer(app)
const  io=socketIO(server)
io.on('connection', () => {
    console.log('a user connected');
  });
app.use("/api",Routes)
server.listen(port,()=>{
    console.log("server is working on 5000");
})