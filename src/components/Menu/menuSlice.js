import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const MENU_URL = 'https://tfood-fake-server.herokuapp.com/categories';

const initialState = []

export const fetchMenu = createAsyncThunk('menu/fetchMenu', async () => {
    const response = await axios.get(MENU_URL);
    return response.data
})

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchMenu.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

export const selectAllMenu = (state) => state.menu;

// export const selectUserById = (state, userId) =>
//     state.users.find(user => user.id === userId)

export default menuSlice.reducer