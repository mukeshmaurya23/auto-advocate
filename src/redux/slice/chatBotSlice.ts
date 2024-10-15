import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import networkRequest from "../../axios-config/axiosInstance";
import endpoints from "../../axios-config/endpoints";
interface Option {
    label: string;
    value: string;
    next: string;
}
interface ChatStep {
    message: string;
    options?: Option[];
    next?: string;
    currentNode?: string;
    value?: string;
}
interface ChatbotConfig {
    [key: string]: ChatStep;
}
const initialState = {
    isChatBotOpen: false,
    chatbotConfig: {} as ChatbotConfig,
    session: {},
    chatBotQuestionLoading: false,
    chatBotQuestionError: "" as string | null,

}
export const fetchChatBotQuestions = createAsyncThunk('chatBot/fetchChatBotQuestions', async (fetchdata: { token: string }) => {
    try {
        const response = await networkRequest({ token: fetchdata.token }).get(endpoints.chatBotQuestions);
        console.log(response, "response")
        return response.data
    } catch (error: any) {
        return error.response.data
    }
})
const chatBotSlice = createSlice({
    name: "chatBot",
    initialState: initialState,
    reducers: {
        toggleChatBot: (state) => {
            state.isChatBotOpen = !state.isChatBotOpen;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchChatBotQuestions.pending, (state) => {
            state.chatBotQuestionLoading = true;
            state.chatBotQuestionError = null;
        });
        builder.addCase(fetchChatBotQuestions.fulfilled, (state, action) => {
            state.chatbotConfig = action.payload?.chatbot_config;
            state.session = action.payload?.session;
            state.chatBotQuestionLoading = false;
        });
        builder.addCase(fetchChatBotQuestions.rejected, (state, action) => {
            state.chatBotQuestionError = action.error.message!;
            state.chatBotQuestionLoading = false;
        });
    }

});
export const { toggleChatBot } = chatBotSlice.actions;
export default chatBotSlice.reducer;