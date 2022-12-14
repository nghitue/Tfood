import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const PRODUCTS_URL = 'https://tfood-fake-server.herokuapp.com/products';

const productsAdapter = createEntityAdapter();

const initialState = productsAdapter.getInitialState({
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    statusOrderBox: false,
    search: '',
    catId: 1,
    productId: null,
    isShowNotification: {
        statusNoti: false,
        nameNoti: null,
        content: null,
    },
});

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get(
        PRODUCTS_URL,
        // , {
        //     params: {
        //         _limit: 20,
        //     },
        // }
    );
    return response.data;
});

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        showOrderBox(state, action) {
            state.statusOrderBox = action.payload;
        },
        searchFilterChange(state, action) {
            state.search = action.payload;
        },
        catIdFilterChange: (state, action) => {
            state.catId = action.payload;
        },
        getProductById: (state, action) => {
            state.productId = action.payload;
        },
        showNotification(state, action) {
            state.isShowNotification = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                productsAdapter.upsertMany(state, action.payload);
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { selectAll: selectAllProducts } = productsAdapter.getSelectors((state) => state.products);

export const getProductsStatus = (state) => state.products.status;
export const getProductsError = (state) => state.products.error;

export const { showOrderBox, searchFilterChange, catIdFilterChange, getProductById, showNotification } = productsSlice.actions;

export const getStatus = (state) => state.products.statusOrderBox;
export const searchTextSelector = (state) => state.products.search;
export const filterCatIdSelector = (state) => state.products.catId;
export const prodIdSelector = (state) => state.products.productId;
export const getShowNotification = (state) => state.products.isShowNotification;

// function toLowerCaseNonAccentVietnamese(str) {
//     str = str.toLowerCase();
//     str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "a");
//     str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "e");
//     str = str.replace(/??|??|???|???|??/g, "i");
//     str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "o");
//     str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "u");
//     str = str.replace(/???|??|???|???|???/g, "y");
//     str = str.replace(/??/g, "d");
//     // Some system encode vietnamese combining accent as individual utf-8 characters
//     str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huy???n s???c h???i ng?? n???ng 
//     str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ??, ??, ??, ??, ??
//     return str;
// }

export const prodsRemainingSelector = createSelector(
    selectAllProducts,
    searchTextSelector,
    filterCatIdSelector,
    (prodList, searchText, catId) => {
        return prodList.filter((prod) => {
            return prod.prod_name.toLowerCase().includes(searchText.toLowerCase()) && catId === prod.cat_id;
        });
    },
);

export const prodByIdList = createSelector(
    selectAllProducts,
    prodIdSelector,
    (prodList, prodId) => {
        return prodList.filter((prod) => {
            return prod.id === prodId;
        });
    },
);

export default productsSlice.reducer;