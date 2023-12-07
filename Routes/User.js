const express=require("express")
const Auth=require("../Controllers/Auth")
const User=require("../Controllers/User")

const app=express.Router()

app.post("/create",Auth.createUser)

app.post("/login",Auth.LoginUser)

app.put("/update/:id",User.updateUser)
module.exports=app