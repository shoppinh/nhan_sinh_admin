import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/Auth/pages/SignIn/signInSlice";
import userReducer from "./userSlice";

const rootReducer = {
	login: loginReducer,
	user: userReducer,
};

const store = configureStore({
	reducer: rootReducer,
	// user: userReducer,
});

export default store;
