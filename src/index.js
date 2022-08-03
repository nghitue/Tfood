import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { fetchProducts } from '@/components/Products/productsSlice';
import { fetchMenu } from './components/Menu/menuSlice';
import { fetchCartList } from './components/CartList/cartListSlice';
import { fetchOrderList } from './components/OrderList/orderListSlice';
import GlobalStyle from '@/components/GlobalStyles';

store.dispatch(fetchProducts());
store.dispatch(fetchMenu());
store.dispatch(fetchCartList());
store.dispatch(fetchOrderList());

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle>
      <App />
    </GlobalStyle>
  </Provider>,
  document.getElementById('root')
);


