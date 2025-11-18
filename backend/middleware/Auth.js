import jwt from "jsonwebtoken";


const authUser = async (req, res, next) => {
 
    const { token } = req.headers;
    if (!token) {
      return res.json({success:false , message:"Not Authorized login again"})
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        // attach both for compatibility with different route code
        req.body.userId = decode.id;
        req.user = { _id: decode.id };
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }
};

export default authUser ;
