import jwt from 'jsonwebtoken'
export const authToken = async(req,res,next)=>{
    try{
        const token = req.cookies?.token
        if(!token){
            return res.status(200).json({
                message:"Login for more!",
                error:true,
                success:false
            })
       }
       const decoded = jwt.verify(token, process.env.TOKEN_SECRETKEY);
       req.userId = decoded._id; 
       next();
    }
    catch(err){
        res.status(400).json({
            message:err.message || err,
            data:[],
            error:true,
            success : false
        })
    }
}