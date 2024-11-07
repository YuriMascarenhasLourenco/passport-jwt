import passport from "passport";
import {BasicStrategy} from 'passport-http'
import { prisma } from "../model/prisma";
import { NextFunction, Request, Response } from "express";
import { User } from "@prisma/client";
//configura a estratégia
const notAuthorizedJson={
    status:401,
    message:'não autorizado'
}
passport.use( new BasicStrategy(async(email,password,done)=>{
    if(email && password){
        let user= await prisma.user.findUnique({
            where:{email,password}
        })
        if(user){
            return done(null,user)
        }
    }

done(null,notAuthorizedJson)
}))

export const privateRoute=(req:Request,res:Response,next:NextFunction)=>{
    const authFunction= passport.authenticate('basic',(err:any,user:User|false)=>{
        req.user=user
        return user? next():next(notAuthorizedJson)
    })
    authFunction(req,res,next)
}
export default passport