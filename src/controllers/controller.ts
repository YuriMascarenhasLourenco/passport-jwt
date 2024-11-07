import { Request, Response } from "express";
import { prisma } from "../model/prisma";
import JWT from 'jsonwebtoken'
export const registerController=async (req:Request,res:Response)=>{
    let{ email, password}= req.body
    let hasUser= prisma.user.findUnique({
        where:{email}
    })
    if(!hasUser){
        let newUser= await prisma.user.create({
            data:{email,password}
        })
        const token = JWT.sign({email,password},
            process.env.SECRET_KEY as string)
    }else{
        res.status(400).json({err:"this user already exists"}
        )
    }
    res.json({err:"email and password not sent"})
}
export const loginController= async(req:Request,res:Response)=>{
    if(req.body.email && req.body.password){
        let email= req.body.email as string
        let password= req.body.password as string
        
        let user = await prisma.user.findUnique({
            where:{
                email,
                password
            }
        })
        if(user){
            const token = JWT.sign({
                id: user.id
            },process.env.JWT_SECRET_KEY as string)
            res.status(200).json({status:true})
           
        }
        
        res.json({status:false})
    }
}
