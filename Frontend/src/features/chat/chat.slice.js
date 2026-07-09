import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chats: [],
        currentChatId: null,
        messages: [],
        isLoading: false,
        isSending: false,
        isMockMode: false,
        error: null
    },
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        setCurrentChatId: (state, action) => {
            state.currentChatId = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        appendMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        replaceTempMessages: (state, action) => {
            const { tempId, realUserMessage, aiMessage } = action.payload;
            state.messages = state.messages.filter(m => m._id !== tempId);
            state.messages.push(realUserMessage, aiMessage);
        },
        addMockChat: (state, action) => {
            state.chats.unshift(action.payload);
        },
        deleteChatLocally: (state, action) => {
            const chatId = action.payload;
            state.chats = state.chats.filter(c => c._id !== chatId);
            if (state.currentChatId === chatId) {
                state.currentChatId = null;
                state.messages = [];
            }
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setIsSending: (state, action) => {
            state.isSending = action.payload;
        },
        setIsMockMode: (state, action) => {
            state.isMockMode = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const {
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
} = chatSlice.actions;

export default chatSlice.reducer;
