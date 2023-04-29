import mongoose from "mongoose"
const Connectdb = async(DATABASE_URL) =>{
    try {
         const DB_OPTIONS = {
            dbName:"bookManagement;",
         };
         await mongoose.connect(DATABASE_URL,DB_OPTIONS);
         console.log("Connected succesfully.....")
    }catch(err){
        console.log(err);
    }

};
export default Connectdb;