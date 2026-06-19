

const User=require("../models/User");

const bcrypt=require("bcryptjs");

const jwt=require("jsonwebtoken");

exports.register=async(req,res)=>{

    try{

        const {name,email,password,role}=req.body;

        const exist=await User.findOne({email});

        if(exist)
            return res.status(400).json({message:"User Exists"});

        const hash=await bcrypt.hash(password,10);

        const user=await User.create({

            name,
            email,
            password:hash,
            role

        });

        res.status(201).json(user);

    }
    catch(err){

        res.status(500).json(err);

    }

};

exports.login=async(req,res)=>{

    try{

        const {email,password}=req.body;

        const user=await User.findOne({email});

        if(!user)
            return res.status(400).json({message:"Invalid Credentials"});

        const match=await bcrypt.compare(password,user.password);

        if(!match)
            return res.status(400).json({message:"Invalid Credentials"});

        const token=jwt.sign({

            id:user._id,
            role:user.role

        },process.env.JWT_SECRET,{expiresIn:"1d"});

        res.json({

            token,
            role:user.role

        });

    }
    catch(err){

        res.status(500).json(err);

    }

}