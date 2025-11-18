import mongoose from "mongoose";

const connectDB = async()=>{

    mongoose.connection.on('connected',()=>{
        console.log("DB connected");
        
    })
    const baseUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
    const dbName = process.env.MONGODB_DB || 'e-commerce';
    const fullUri = `${baseUri.replace(/\/+$/,'')}/${dbName}`;
    try {
        await mongoose.connect(fullUri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB at', fullUri);
    } catch (err) {
        console.error('MongoDB connection error:', err && err.message ? err.message : err);
        throw err;
    }
}

export default connectDB;