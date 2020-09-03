const jwt=require('jsonwebtoken')
const {JWT_KEY}=require('../keys')
const mongoose=require('mongoose')
const User=require('../models/user')
module.exports=((req,res,next)=>{
   const {authorization}=req.headers
   if(!authorization){
       res.statu(401).json({
        error:"you must be looged in"
       })
       const token=authorization.split(" ")[1]
       jwt.verify(token,JWT_KEY,(err,payload)=>{
           if(err){
             return  res.status(401).json({
                   message:'Unauthorized'
               })
           }
           const {_id}=payload
           User.findById(_id)
           .then(userData=>{
               req.user-userData
           })
           next()
       })
   }
})