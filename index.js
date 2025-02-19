import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { userModel } from "./userSchema.js";
import  dotenv  from "dotenv";

dotenv.config();



const app=express();
const port= 4000;
const url= process.env.Mongo_URL
mongoose.connect(url)
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());


app.post("/getNumber", async(req, res)=>{
    const {number, name}= req.body;
     const user=await userModel.findOne({number});
     if(!user){
        try{
            await userModel.create({number, name});
            res.status(200).send({success: true, message: "Registered succesfully"})
        }catch(e){
            res.status(200).send({success: false, message: "Could not registered"})
        }
     }else{
        res.status(200).send({success: false, message: "user already registered"})
     }
    
    
})

app.post("/confirmBooking", async(req, res)=>{
    const {number, booking, service}= req.body;
     const user=await userModel.findOne({number});
     if(!user){
        res.status(200).send({success: false, message: "user not logged in please login first"})
     }else{
        user.booking= booking;
        user.service= service;
        try{
            await user.save();
        if(service==""){
            res.status(200).send({success: true, message: `Wohoo! Your session is confirmed with our writer. please wait writer will contact you soon..`})
  
        }else{
        res.status(200).send({success: true, message: `Wohoo! Your session for ${service} is confirmed with our writer. please wait writer will contact you soon..`})
        } 
        }catch(e){
            res.status(200).send({success: false, message: `Oh! sorry.. Your booking is not confirmed`})
  
        }
        
    }
})

app.listen(port, ()=>{
    console.log("app is listening at 4000");
})