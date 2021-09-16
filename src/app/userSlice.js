import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../api/userApi";

// create an async action to pass into extraReducers
// export const getMe = createAsyncThunk(
// 	"user/getMe",
// 	async (params, thunkAPI) => {
// 		const currentUser = await userApi.getMe();
// 		console.log(currentUser);
// 		return currentUser;
// 	}
// );

//  Thunk API
export const signIn = createAsyncThunk(
	"user/signIn",
	async (params, thunkAPI) => {
		const response = await userApi.signIn(params);

		console.log("response: ", response);
		// Save access token to storage
		// const { access_token, token_type, expired_at } = response;
		// const accessToken = `${token_type} ${access_token}`;
		// localStorage.setItem("access_token", accessToken);
		// localStorage.setItem("expired_at", expired_at); // expired_at is a timestamp
	}
);

export const getMe = createAsyncThunk("user/getMe", async (params) =>
	userApi.getMe(params)
);

const userSlice = createSlice({
	name: "user",
	initialState: {
		current: {},
	},
	reducers: {},
	extraReducers: {
		[getMe.rejected]: (state, action) => {
			state.current = {};
		},
		[getMe.fulfilled]: (state, action) => {
			state.current = action.payload || {};
		},
	},
});

const { reducer: userReducer } = userSlice;
export default userReducer;
