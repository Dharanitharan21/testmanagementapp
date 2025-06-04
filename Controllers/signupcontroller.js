 const adminmodel =require('../Models/adminmodel')

 exports.Signup=async(req,res,next)=>{
    try {
        const {name,email,mobile,password}=req.body
        const userexist =await adminmodel.findOne({email})
        if(userexist){
            return res.json({error:true,message:"Email already exists"})
        }
        const signupdoc = new adminmodel({name,email,mobile,password})
        await signupdoc.save()
        return res.status(201).json({message:"Created Successfully",data:signupdoc})
        }
        catch(err){
            return res.status(404).json({error:"somthing wrong",message:err.message})
        }
    }


 