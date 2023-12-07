const User = require("../Models/Users");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config({ path: "Config/.env" });
const SecritKey = process.env.secritkey;

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.Password, salt);

    const data = {
      UserName: req.body.UserName,
      Email: req.body.Email,
      Password: hashpassword,
    };
    await User.findByIdAndUpdate({ _id: id }, data, { new: true })
      .then((data) => {
        res.status(202).json(data);
      })
      .catch((err) => {
        res.status(404).json({
          massage: "user not found",
          err,
        });
      });
  } catch (err) {
    res.status(404).json({
      massage: "error",
      err,
    });
    console.log(err);
  }
};
const GetSingleUser=async(req,res)=>{
    try{
        const id=req.params.id
const user=await User.findById(id)
res.status(202).json(user)

    }catch(err){
        res.status(404).json({
            massage: "error",
            err,
          });
          console.log(err);
        } 
    
}

const getAllUser=async(req,res)=>{
    try{
        const user=await User.find()
        res.status(202).json(user)


    }catch(err){
        res.status(202).json({
            massage:"users not found",err
        })

    }
} 
module.exports = {
  updateUser,
  GetSingleUser,
  getAllUser
};
