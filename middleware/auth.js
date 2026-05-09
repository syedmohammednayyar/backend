
//auth , isManager , isAdmin, isSalesperson

const jwt  = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next)=>{
    try{
     //extract JWT token
    const authHeader = req.header("Authorization");
    const token = req.cookies?.token || req.body.token || (authHeader ? authHeader.replace("Bearer", "").trim() : null);
    
     if(!token){
        return res.status(401).json({
            success: false,
            message: "Token Missing",
        })
     }

     //verify the token
     try{
     const decode = jwt.verify(token, process.env.JWT_SECRET);
     console.log(decode);
     
      req.user = {
          ...decode,
          _id: decode._id || decode.id,
          id: decode.id || decode._id,
      };
     }catch(error){
        return res.status(401).json({
            success:  false,
            message: "token is invalid",
        })
     }
     next();

    }catch(error){
     return res.status(401).json({
        success: false,
        message:"somthing went wrong , while verfy the token",
     })
    }
}

exports.isManager = (req, res, next)=>{
    try{
        if(req.user.role !== "Manager"){
            return res.status(401).json({
                success: false,
                message: "this is a protected routes for Manager",
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success: false,
            message:"user role can not be matching"
        })
}
}

exports.isAdmin = (req, res, next) =>{
  try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success: false,
                message: "this is a protected routes for Admin",
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success: false,
            message:"user role can not be matching"
        })
}

}

exports.isSalesperson = (req, res, next) =>{
  try{
        if(req.user.role !== "Salesperson"){
            return res.status(401).json({
                success: false,
                message: "this is a protected routes for Salesperson",
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success: false,
            message:"user role can not be matching"
        })
}
}