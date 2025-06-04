const adminmodel= require('../Models/adminmodel')
const jwt =require('jsonwebtoken')

const jwt_token= id =>{
    console.log(id);
    return jwt.sign({id },process.env.jwt_secret,{expiresIn:process.env.jwt_express_in})
}
exports.login=async(req ,res ,next)=>{
    try{
       const {email,password}=req.body
       const logindoc = await adminmodel.findOne({email})
       if(!logindoc){
        return res.status(404).json({error:"User not found Please create Account"})
    }
     if(!(await logindoc.comparepassword(password,logindoc.password))){
        return res.status(401).json({ error: "Invalid email or password" ,logindoc });
     }

       const token =jwt_token(logindoc._id)
       return res.status(200).json({message:"login Successfully",data:logindoc,token})
    }
    catch(err){
        return res.status(500).json({error:"Something Wrong",message:err.message})
    }
}