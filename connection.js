import mongoose from "mongoose";

export const connectToMongo = async (URL) => {
    await mongoose.connect(process.env.MONGO_URI ||URL)
    .then(() => console.log('MongoDB connected'))
    .catch((err)=>console.log('error occured',err));
};