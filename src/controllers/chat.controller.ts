import { Request, Response } from "express";
import Chat from "../models/chat";
import User from "../models/user";

function  getChat(req:Request, res:Response): void {
    User.findById(req.user, {chats : 1}).populate({path: 'chats', populate: 
    {path: 'user', select: 'username image'}}).then((data)=>{ 
        
        if(data==null) return res.status(404).json();
        data.chats.forEach(chat => {
            if(req.params.id == chat._id){
                return res.status(200).json(chat);
            }
        })
        return res.status(409).json({message: "No perteneces a este chat"});
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

function  getMyChats(req:Request, res:Response): void {
    User.findById(req.user, {chats : 1}).populate({path: 'chats', populate:
    {path: 'user', select: 'username image'}}).then((data)=>{
        if(data==null) return res.status(404).json();
        return res.status(200).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

function  addChat(req:Request, res:Response): void {
    User.findById(req.user, {chats : 1}).populate({path: 'chats', populate:
    {path: 'user', select: 'username image'}}).then((data) =>{
        if (data==null){
            let chat = new Chat ({users : req.body.participantes});
            chat.save().then((data)=>{
                return res.status(200).json(data);
            })
        }
    })
    
}

function  addOtroParti(){
    
}

function  delChat(){
    
}

export default{getChat, getMyChats, addChat, addOtroParti, delChat}