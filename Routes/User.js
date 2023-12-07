const express=require("express")
const User=require("../Controllers/User")
const app=express.Router()

app.post("/create",User.createUser)

app.post("/login",User.LoginUser)
module.exports=app