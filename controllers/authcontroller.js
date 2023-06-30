import { comparePassword, hashPassword } from "../helpes/authHelper.js";
import usermodel from "../models/usermodel.js";
import  JWT  from "jsonwebtoken";
export const registerConroller = async (req,res) =>{
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            password,
        } = req.body
// validation

if(!firstName){
    return res.send({error:'firstName is requird '})
}
if(!lastName){
    return res.send({error:'lastName is requird '})
}
if(!email){
    return res.send({error:'email is requird '})
}
if(!phone){
    return res.send({error:'phone is requird '})
}

if(!password){
    return res.send({error:'Password is requird '})
}


// check user
const exisitinguser = await usermodel.findOne({email})
//existing user
if(exisitinguser){
    return res.status(200).send({
        success:true,
        message:"Already Register please login",

    })
    
}
   const hashedPassword = await hashPassword(password)

//    save

    const user = await new usermodel({
        firstName,
        lastName,
        email,
        phone,
        password:hashedPassword,
    }).save()
    res.status(201).send({
        success:true,
        message:'User Register Successfull',
        user
    })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in registeration',
            error
        })
    }
};

// Post 
export const logincotroller = async (req,res) => {
    try {
       const {email,password} = req.body
        // validation
        if(!email || !password){
            res.status(404).send({
                success:false,
                message:'Invalid Email or Password'
            })
        } 
        // check user
        const user = await usermodel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email is not registerd'
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(202).send({
                success:false,
                message:'Invalid Password'
            })
        }
        // token
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'600d'});
        res.status(200).send({
            success:true,
            message:'Log in Successfully',
            user:{
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email,
                phone:user.phone,
            },
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in login',
            error
        })
    }
};

// test ccontroller
export const testController = (req,res) =>{
  res.send("Radhi Radhi")
}