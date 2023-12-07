const express=require("express")
const User=require("./User")
const app=express.Router()


app.use("/user",User)


module.exports=app