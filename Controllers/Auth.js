const User = require("../Models/Users");
const dotenv = require("dotenv");
const CryptoJS = require("crypto-js");
const bcrypt = require("bcrypt");
dotenv.config({ path: "Config/.env" });
const SecritKey = process.env.secritkey;
// Register user
const createUser = async (req, res) => {
    const {UserName,Email,Password} =req.body
    if(!UserName && !Email && !Password){
        res.status(404).json("all fields are required");
    }else{

  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(Password, salt);
  let newUser = new User({
    UserName: UserName,
    Email: Email,
    Password: hashpassword,
  });

  try {
    await newUser
      .save()
      .then((data) => {
        console.log("User created successfully!");
        res.status(202).json(data);
      })
      .catch((err) => {
        console.log("Error occurred while creating a user.");
        console.log(err);
        res.status(404).json("error");
      });
  } catch (error) {
    console.log("Error", error);
  }
}
};

// Login user
const LoginUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!Email && !Password) {
      res.status(404).json("all fields are required");
    } else {
      const user = await User.findOne({ Email });

      if (user) {
        await bcrypt.compare(Password, user.Password, (err, result) => {
          if (err) {
            res.status(404).json("password does not match");
          } else {
            if (result) {
              const { Password, ...other } = user._doc;
              res.status(202).json(other);
            }
          }
        });
      } else {
        res.status(404).json({ massage: "user not found" });
      }
    }
  } catch (err) {
    res.status(404).json({ Error: err });
    console.log(err);
  }
};
module.exports = {
  createUser,
  LoginUser,
};
