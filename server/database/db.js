import mongoose, { mongo } from "mongoose";

const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "Chatify"
    })
    .then(() => {
        console.log("Connected to DB!");
    })
    .catch((e) => {
        console.log("Error in connection to database : ", e);
    })
}

export default dbConnection;