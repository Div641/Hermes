import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

export async function fetchChats() {
    const response = await api.get("/api/chat");
    return response.data; // Expected { chats: [...] }
}

export async function fetchMessages(chatId) {
    const response = await api.get(`/api/chat/${chatId}/messages`);
    return response.data; // Expected { messages: [...] }
}

export async function sendMessageApi({ message, chatId, image }) {
    const response = await api.post("/api/chat/message", { message, chat: chatId, image });
    return response.data; // Expected { chat, title, aiMessage }
}

export async function deleteChatApi(chatId) {
    const response = await api.delete(`/api/chat/delete/${chatId}`);
    return response.data;
}
