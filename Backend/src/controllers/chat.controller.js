// import { response } from "express";
import { generateResponse , generateChatTitle } from "../services/ai.service.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js"

export async function sendMessage(req, res) {

    if (!req.body) {
        return res.status(400).json({ error: "Request body is missing or not JSON" });
    }

    const {message, chat: chatId, image} = req.body;

    console.log("Backend sendMessage: req.body.chat =", req.body.chat, "chatId =", chatId);
    // console.log(title)
    
    let title=null, chat= null;
    
    if(!chatId)   {
        title= message ? await generateChatTitle(message) : "Image Analysis";
        chat= await chatModel.create({
            user: req.user.id,
            title
        })
    }

    const resolvedChatId = chatId || chat._id;
    
    const userMessage = await messageModel.create({
        chat:resolvedChatId,
        content:message || "",
        role:"user",
        image: image || undefined
    })
   
    const  messages= await messageModel.find({chat: resolvedChatId}).sort({createdAt: 1 }) //follow-up messages
    
    const result = await generateResponse(
        messages.map(m => ({ role: m.role, content: m.content, image: m.image }))
    );

    const aiMessage = await messageModel.create({
        chat:resolvedChatId,
        content:result,
        role:"ai"
    })


    res.json({
        title,
        chat,
        message,
        aiMessage
    })

    console.log("Message received:", message);
}


export async function getChats(req,res){
    const user= req.user

    const chats= await chatModel.find({user:user.id})

    res.status(200).json({
        message:"Chats retrieved successfully",
        chats
    })
}


export async function getMessages(req,res){
    const {chatId}= req.params; //to ensure ki ek user ko uski hi poorani chats dikhe kisi or ki access na kr sake

    const chat = await chatModel.findOne({
        _id:chatId,
        user:req.user.id
    })

    if(!chat) {
        return res.status(404).json({
            message:"Chat not found"
        })
    }

    const messages = await messageModel.find({
        chat:chatId,
    }).sort({ createdAt: 1 })

    res.status(200).json({
        message:"Messages retrieved successfully",
        messages
    })

}



export async function deleteChat(req,res){
    const {chatId} = req.params

    const chat= await chatModel.findOneAndDelete({
        _id:chatId,
        user:req.user.id
    })

    if(!chat){
        return res.status(404).json({
            message:"Chat not found"
        })
    }

    await messageModel.deleteMany({
        chat:chatId
    })

    return res.status(200).json({
        message: "Chat deleted successfully",
        success: true
    })
}