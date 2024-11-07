import { ErrorRequestHandler } from "express";

export const errorHandler:ErrorRequestHandler=(err,req,res,next)=>{
    if(err.status){
        res.status(err.status)
    }else{
        res.status(400) //bad request
    }
    if(err.message){
        res.json(err.message)
    }else{
        res.json({error:"houve algum erro"})
    }
}