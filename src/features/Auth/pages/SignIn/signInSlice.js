import { createSlice } from "@reduxjs/toolkit";

const login = createSlice({
	name: "login",
	initialState: [],
	reducers: {
		addUser: (state, action) => {
			console.log("action.payload: ", action.payload);
			state.push(action.payload);
		},
	},
});

const { reducer, actions } = login;
export const { addUser } = actions;
export default reducer;
