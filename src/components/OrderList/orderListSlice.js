import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const   ORDERLIST_URL = 'https://tfood-fake-server.herokuapp.com/orderList';

const orderListAdapter = createEntityAdapter();



const initialState = orderListAdapter.getInitialState({
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
});

export const fetchOrderList = createAsyncThunk('orderList/fetchOrderList', async () => {
    const response = await axios.get(ORDERLIST_URL);
    return response.data;
});

export const addOrderList = createAsyncThunk('orderList/addOrderList', async (initialOrderList) => {
    const response = await axios.post(ORDERLIST_URL, initialOrderList)
    return response.data
});


const orderListSlice = createSlice({
    name: 'orderList',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(fetchOrderList.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchOrderList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                orderListAdapter.upsertMany(state, action.payload);
            })
            .addCase(fetchOrderList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addOrderList.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString();
                orderListAdapter.addOne(state, action.payload)
            })
    },
});

export const { selectAll: selectAllOrderList } = orderListAdapter.getSelectors((state) => state.orderList);

export const getOrderListStatus = (state) => state.orderList.status;
export const getOrderListError = (state) => state.orderList.error;


export default orderListSlice.reducer;