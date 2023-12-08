const mongoose=require("mongoose")
const  db=()=>{
    mongoose.connect(process.env.db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
       

    }).then(()=>{
        console.log("database is connected successfully");
    }).catch((err)=>{
        console.log("DATABASE !!!ERROR :" , err);
    })
}
module.exports=db