import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';

const CARTLIST_URL = 'https://tfood-fake-server.herokuapp.com/order';

const cartListAdapter = createEntityAdapter();

const initialState = cartListAdapter.getInitialState({
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    loginStatus: false,
    userPhone: localStorage.getItem('phoneNum'),
    userExist: false,
    cartId: null,
});

export const fetchCartList = createAsyncThunk('cartList/fetchCartList', async () => {
    const response = await axios.get(CARTLIST_URL);
    return response.data;
});

export const addCartList = createAsyncThunk('cartList/addCartList', async (initialCartList) => {
    const response = await axios.post(CARTLIST_URL, initialCartList)
    return response.data
});

export const updateCartList = createAsyncThunk('cartList/updateCartList', async (initialCartList) => {
    const { id } = initialCartList;
    // try-catch block only for development/testing with fake API
    // otherwise, remove try-catch and add updateCartList.rejected case
    try {
        const response = await axios.put(`${CARTLIST_URL}/${id}`, initialCartList)
        return response.data
    } catch (err) {
        return err.message;
        // return initialCartList; // only for testing Redux!
    }
});

export const deleteCartList = createAsyncThunk('cartList/deleteCartList', async (initialCartList) => {
    const { id } = initialCartList;

    const response = await axios.delete(`${CARTLIST_URL}/${id}`)
    if (response?.status === 200) return initialCartList;
    return `${response?.status}: ${response?.statusText}`;
})


const cartListSlice = createSlice({
    name: 'cartList',
    initialState,
    reducers: {
        setStatusLogin(state, action) {
            state.loginStatus = action.payload;
        },
        setUserPhone(state, action) {
            state.userPhone = action.payload;
        },
        checkUserExist(state, action){
            state.userExist = action.payload;
        },
        setCartId(state, action) {
            state.cartId = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCartList.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchCartList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                cartListAdapter.upsertMany(state, action.payload);
            })
            .addCase(fetchCartList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateCartList.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    // console.log('Update could not complete')
                    // console.log(action.payload)
                    return;
                }
                action.payload.date = new Date().toISOString();
                cartListAdapter.upsertOne(state, action.payload);
            })
            .addCase(addCartList.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString();
                cartListAdapter.addOne(state, action.payload)
            })
            .addCase(deleteCartList.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    // console.log('Delete could not complete')
                    // console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                cartListAdapter.removeOne(state, id)
            })
    },
});

export const { selectAll: selectAllCartList } = cartListAdapter.getSelectors((state) => state.cartList);

export const getCartListStatus = (state) => state.cartList.status;
export const getCartListError = (state) => state.cartList.error;
export const getUserExist = (state) => state.cartList.userExist;
export const getCartId = (state) => state.cartList.cartId || window.localStorage.getItem("cartId");
export const getUserPhone = (state) => state.cartList.userPhone;
export const getStatusLogin = (state) => state.cartList.loginStatus;

export const getCurrentUserId = (state) => state.cartList.userId;

export const { setStatusLogin, setUserPhone , checkUserExist, setCartId} = cartListSlice.actions;

export const selectCartDetail = createSelector(
    selectAllCartList,
    getCartId,
    (cartList, cartId) => {
        return cartList.filter((cart) => {
            return cart.id === cartId;
        });
    },
)


export default cartListSlice.reducer;