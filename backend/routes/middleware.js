const jwt = require('jsonwebtoken');
const SECRET_KEY  = require("../config");



const authMiddleware = async(req,res,next)=>{
    const authHeader = req.headers.authorization;

// console.log(authHeader);
if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Invalid authorization header' });
}

 const token = authHeader.split(' ')[1];
 console.log(token);

 try{
    const decoded = jwt.verify(token,SECRET_KEY);
    
    if(decoded.userId){
        req.userId = decoded.userId;
        console.log(req.userId);
        next();
    }else {
        return res.status(403).json({message:"invalid token"});
    }

 }
 catch(err){
    return res.status(403).json({
        message:"error while authenticating"
    })
 }


}

module.exports = {
    authMiddleware
}