import { initializeSocketConnection } from "../service/chat.socket";
import { sendMessageApi , fetchMessages, fetchChats, deleteChatApi} from "../service/chat.api";
import { useDispatch } from "react-redux";
import { setChats, addNewMessage, setCurrentChatId ,setError, setLoading ,addMessages, createNewChat } from "../chat.slice";

export const useChat = () => {

    const dispatch = useDispatch()

    async function handleSendMessage({message, chatId}) {
        dispatch(setLoading(true))
        const data = await sendMessageApi({message , chatId})
        const {chat , aiMessage} = data

        dispatch(createNewChat({
            chatId: chat._id,
            title: chat.title
        }) )
        dispatch(addNewMessage({
            chatId:chat._id,
            content:message,
            role:"user"
        }))
        dispatch(addNewMessage({
            chatId:chat._id,
            content: aiMessage.content,
            role: aiMessage.role
        }))
        dispatch(setCurrentChatId(chat._id))
    }

    async function handleGetChats(){
        dispatch(setLoading(true))
        const data= await handleGetChats()
        const {chats}=data
        dispatch(setChats(chats.reduce((acc,chat)=> {
            acc[chat._id]={
                id: chat._id,
                title:chat.title,
                messages: [],
                lastUpdated: chat.updatedAt,
            }
            return acc
        },{})))
        dispatch(setLoading(false))
    }

    async function handleOpenChat(chatId){

        const data= await getMessages(chatId)
        const {messages} = data

        const formattedMessages = messages.map(msg => ({
            content:msg.content,
            role: msg.role
        }))
        dispatch(addMessages({
            chatId,
            messages: formattedMessages
        }))
        dispatch(setCurrentChatId(chatId))
    }

    return {
        initializeSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat
    }

}