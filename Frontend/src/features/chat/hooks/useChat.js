import { initializeSocketConnection } from "../service/chat.socket";
import { sendMessageApi, fetchMessages, fetchChats, deleteChatApi } from "../service/chat.api";
import { useDispatch, useSelector } from "react-redux";
import {
    setChats,
    setCurrentChatId,
    setMessages,
    appendMessage,
    replaceTempMessages,
    addMockChat,
    deleteChatLocally,
    setIsLoading,
    setIsSending,
    setIsMockMode,
    setError
} from "../chat.slice";

const MOCK_CHATS = [
    { _id: "chat-1", title: "Analyze my performance", updatedAt: new Date().toISOString() },
    { _id: "chat-2", title: "Suggest UI improvements", updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
    { _id: "chat-3", title: "Explain this code", updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
    { _id: "chat-4", title: "Best practices for API security", updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() },
    { _id: "chat-5", title: "Roadmap for Next.js", updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() },
    { _id: "chat-6", title: "Help with data structure", updatedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString() }
];

const MOCK_MESSAGES = {
    "chat-1": [
        { _id: "m1", role: "user", content: "Can you help me analyze this user flow?", createdAt: new Date().toISOString() },
        { _id: "m2", role: "ai", content: "Absolutely! I'd be happy to help you analyze the user flow. Please share the details or file, and I'll break it down for you.", createdAt: new Date().toISOString() }
    ],
    "chat-2": [
        { _id: "m3", role: "user", content: "Suggest some UI improvements for a dashboard application.", createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
        { _id: "m4", role: "ai", content: "For a modern dashboard, focus on glassmorphism (translucent blur panels), custom glowing charts, deep indigo/slate dark-mode color schemes, and micro-animations on interactive elements to make the interface feel alive.", createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() }
    ]
};

export const useChat = () => {
    const dispatch = useDispatch();

    const chats = useSelector((state) => state.chat.chats);
    const activeChatId = useSelector((state) => state.chat.currentChatId);
    const messages = useSelector((state) => state.chat.messages);
    const isLoading = useSelector((state) => state.chat.isLoading);
    const isSending = useSelector((state) => state.chat.isSending);
    const isMockMode = useSelector((state) => state.chat.isMockMode);

    // Fetch past chats
    const loadChats = async () => {
        try {
            dispatch(setIsLoading(true));
            const data = await fetchChats();
            dispatch(setChats(data.chats || []));
            dispatch(setIsMockMode(false));
        } catch (error) {
            console.warn("Backend server offline. Falling back to mock data.", error);
            dispatch(setChats(MOCK_CHATS));
            dispatch(setIsMockMode(true));
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    // Load messages of a specific chat
    const loadChatMessages = async (chatId) => {
        dispatch(setCurrentChatId(chatId));
        try {
            if (isMockMode) {
                dispatch(setMessages(MOCK_MESSAGES[chatId] || []));
                return;
            }
            dispatch(setIsLoading(true));
            const data = await fetchMessages(chatId);
            dispatch(setMessages(data.messages || []));
        } catch (error) {
            console.error("Failed to load messages:", error);
            dispatch(setMessages(MOCK_MESSAGES[chatId] || []));
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    // Handle initiating a new chat
    const handleNewChat = () => {
        dispatch(setCurrentChatId(null));
        dispatch(setMessages([]));
    };

    // Handle sending a message
    const handleSendMessage = async ({ message, image }) => {
        const tempUserMessage = {
            _id: `temp-u-${Date.now()}`,
            role: "user",
            content: message,
            image: image,
            createdAt: new Date().toISOString()
        };

        // Append user message instantly to the UI
        dispatch(appendMessage(tempUserMessage));
        dispatch(setIsSending(true));

        try {
            if (isMockMode) {
                // Simulate local AI response for mock preview
                await new Promise((resolve) => {
                    setTimeout(() => {
                        const tempAiMessage = {
                            _id: `temp-a-${Date.now()}`,
                            role: "ai",
                            content: image
                                ? `Hello! I received your image in mock preview mode along with your prompt: "${message || "(no text)"}". Start your backend server to interact with the real Gemini model.`
                                : `Hello! This is a mock AI response in preview mode to: "${message}". Start your backend server to interact with the real Gemini model.`,
                            createdAt: new Date().toISOString()
                        };

                        if (!activeChatId) {
                            const chatTitleText = message.trim() || "Image Analysis";
                            const newMockChat = {
                                _id: `chat-${Date.now()}`,
                                title: chatTitleText.length > 25 ? chatTitleText.substring(0, 25) + "..." : chatTitleText,
                                updatedAt: new Date().toISOString()
                            };
                            dispatch(addMockChat(newMockChat));
                            dispatch(setCurrentChatId(newMockChat._id));
                            MOCK_MESSAGES[newMockChat._id] = [tempUserMessage, tempAiMessage];
                        }

                        dispatch(replaceTempMessages({
                            tempId: tempUserMessage._id,
                            realUserMessage: tempUserMessage,
                            aiMessage: tempAiMessage
                        }));
                        resolve();
                    }, 1000);
                });
                return;
            }

            // Real backend API call
            const data = await sendMessageApi({
                message,
                chatId: activeChatId,
                image
            });

            if (!activeChatId) {
                const fetchChatsData = await fetchChats();
                dispatch(setChats(fetchChatsData.chats || []));
                dispatch(setCurrentChatId(data.chat._id));
            }

            // Re-append user message with database-grade formatting
            const userMsgObj = {
                _id: `u-${Date.now()}`,
                role: "user",
                content: message,
                image: image,
                createdAt: tempUserMessage.createdAt
            };

            dispatch(replaceTempMessages({
                tempId: tempUserMessage._id,
                realUserMessage: userMsgObj,
                aiMessage: data.aiMessage
            }));
        } catch (error) {
            console.error("Failed to send message:", error);
            dispatch(appendMessage({
                _id: `error-${Date.now()}`,
                role: "ai",
                content: "Sorry, I encountered an error connecting to the Hermes server. Please ensure the backend is running.",
                createdAt: new Date().toISOString()
            }));
        } finally {
            dispatch(setIsSending(false));
        }
    };

    // Handle deleting a chat
    const handleDeleteChat = async (chatId) => {
        if (!confirm("Are you sure you want to delete this chat?")) return;

        try {
            if (!isMockMode) {
                await deleteChatApi(chatId);
            }
            dispatch(deleteChatLocally(chatId));
        } catch (error) {
            console.error("Failed to delete chat:", error);
            alert("Error deleting chat from server. Deleting locally.");
            dispatch(deleteChatLocally(chatId));
        }
    };

    return {
        chats,
        activeChatId,
        messages,
        isLoading,
        isSending,
        isMockMode,
        loadChats,
        loadChatMessages,
        handleNewChat,
        handleSendMessage,
        handleDeleteChat,
        initializeSocketConnection
    };
};