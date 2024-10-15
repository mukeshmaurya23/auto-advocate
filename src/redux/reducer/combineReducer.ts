import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import toggleMenuSlice from "../slice/toggleMenu"
import chatBotSlice from "../slice/chatBotSlice"
//for suggestion in the useSelector function this is name of the slice
export type PersistConfigProps = {
    auth: any,
    toggleMenuApp: any,
    chatBot: any
}
const rootReducer: any = combineReducers({
    auth: authSlice,
    toggleMenuApp: toggleMenuSlice,
    chatBot: chatBotSlice
});
export default rootReducer;