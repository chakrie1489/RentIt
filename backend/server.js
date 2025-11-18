import express from "express"
import cors from "cors";
import "dotenv/config"
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import itemRouter from "./routes/itemRoute.js";
import requestRouter from "./routes/requestRoute.js";


//app congig
const app = express();
const port = process.env.PORT || 4000;
connectDB()
connectCloudinary()


//middleware
app.use(express.json())
app.use(cors())
// serve uploaded files
import path from 'path';
// serve uploaded files from backend/uploads
app.use('/uploads', express.static(path.join(path.resolve(), 'backend', 'uploads')))


//api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use('/api/items', itemRouter);
app.use('/api/requests', requestRouter);

app.get("/",(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>{
    console.log(`Server started on PORT: ${port}`);
    
})

export default app;

