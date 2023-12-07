const mongoose=require("mongoose")
const  db=()=>{
    mongoose.connect(process.env.db).then(()=>{
        console.log("database is connected successfully");
    }).catch(()=>{
        console.log("DATABASE !!!ERROR");
    })
}
module.exports=db