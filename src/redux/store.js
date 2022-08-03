import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '@/components/Products/productsSlice';
import menuReducer from '@/components/Menu/menuSlice';
import modalReducer from '@/components/Modal/modalSlice';
import cartListReducer from '@/components/CartList/cartListSlice';
import orderListReducer from '@/components/OrderList/orderListSlice';


export const store = configureStore({
    reducer: {
        products: productsReducer,
        menu: menuReducer,
        modal: modalReducer,
        cartList: cartListReducer,
        orderList: orderListReducer,
    }
})
