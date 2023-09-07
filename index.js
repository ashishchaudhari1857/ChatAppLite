  const express=require('express');
  const bodparser=require('body-parser')
   const app=express();
   const login= require('./Routes/chat')
app.use(bodparser.urlencoded({extended:false}))
   app.use('/' ,login)


   app.listen(3000,(req,res)=>{
    console.log("server start")
   })