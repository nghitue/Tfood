import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import uuid from 'react-uuid';

import styles from './CartList.module.scss';
import FormatCurrency from '../FormatCurrency';
import images from '@/assets/images';
import {
    updateCartList,
    getCartListStatus,
    getCartListError,
    selectCartDetail,
} from './cartListSlice';
import Loading from '../Loading';
import { addOrderList } from  '@/components/OrderList/orderListSlice';
import { changeStatusModal } from '../Modal/modalSlice';
import { showNotification } from '../Products/productsSlice';
import { getStatusLogin, getUserPhone } from '@/components/CartList/cartListSlice';
import Button from '../Button';


const cx = classNames.bind(styles);

function CartList() {
    const dispatch = useDispatch();
    const cartList = useSelector(selectCartDetail);
    const status = useSelector(getCartListStatus);
    const error = useSelector(getCartListError);
    const isLogin = useSelector(getStatusLogin) || localStorage.getItem('isLogin');
    const phoneNum = useSelector(getUserPhone) || window.localStorage.getItem('phoneNum');
    
    const handleDeleteProd = (id, numberProd) => {
        dispatch(
            updateCartList({
                id: cartList[0].id,
                statusPayment: cartList[0].statusPayment,
                userId: cartList[0].userId,
                numberProd: cartList[0].numberProd - numberProd,
                totalPrice: 0,
                prodList: cartList[0].prodList.filter((item) => item.prod_id !== id),
            }),
        ).unwrap();
        dispatch(changeStatusModal(false));
        dispatch(showNotification({statusNoti: true,nameNoti: "info",content: "Product have removed successfully !"}));
    };

    /**
     * choose table 
     */

    // const [choose,setChoose] = useState("L1");

    // const handleChoose = (e) =>{
    //     setChoose(e.target.value);
    // }

    /**
     * Order 
     */

    const handleOrderBtnChoose = (totalPrice) => {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        const daypayment =  today.toUTCString();
        const total = totalPrice;
        // const cusTable = choose;
        const id = uuid();
        const params = {...cartList[0],id: id,totalPrice: total, daypayment, phoneNum: phoneNum};
        dispatch(addOrderList(params));
        dispatch(
            updateCartList({
                id: cartList[0].id,
                userId: cartList[0].userId,
                numberProd: 0,
                prodList: [],
            }),
        ).unwrap();
        dispatch(changeStatusModal(false));
        dispatch(showNotification({statusNoti: true,nameNoti: "success",content: "Order successfully !"}));
    }

    let content;
    if (status === 'loading') {
        content = <Loading isShow={true} />;
    } else if (status === 'succeeded') {
        if (cartList.length !== 0 && cartList[0].prodList.length > 0) {
            let cart = cartList[0].prodList;
            // let numberProd = cart.length;
            let totalPrice = cart
                .map((item) => item.price * item.prod_number)
                .reduce((prevValue, currValue) => prevValue + currValue, 0);
            content = (
                <>
                    <div className="order-body">
                        <div className={`box-product ${cx('box-product-mr')}`}>
                            {cart.map((item) => {
                                return (
                                    <div className="box-item" key={item.prod_id}>
                                        <div className={cx('amout')}>
                                            <span>{item.prod_number}</span>
                                        </div>
                                        <figure className="product-img item">
                                            <img src={item.prod_url} alt={item.prod_name} />
                                        </figure>
                                        <p className={cx('name-prod')}>{item.prod_name}</p>
                                        <div className={cx('f-right')}>
                                            <p className="price_sale">
                                                <FormatCurrency money={item.price * 1000} />
                                            </p>
                                            <span
                                                className={cx('btn-delete')}
                                                onClick={() => handleDeleteProd(item.prod_id, item.prod_number)}
                                            >
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                            
                        </div>
                    </div>
                    <div className="order-footer box-pd">
                        {/* <div className={cx('choose-table')}>
                            <span>Position</span>
                            <select value={choose} onChange={e => handleChoose(e)}>
                                <option value="L1">L1</option>
                                <option value="L2">L2</option>
                                <option value="L3">L3</option>
                            </select>
                        </div> */}
                        <div className="box-result">
                            <div className="text">Subtotal</div>
                            <div className="price_sale">
                                <FormatCurrency money={totalPrice * 1000} />
                            </div>
                        </div>
                        { !isLogin ? <Button to="./login" className={cx('btn-link')}>Login to Order</Button> : <button className="btn btn-primary" onClick={() => handleOrderBtnChoose(totalPrice)}>Order</button> }
                    </div>
                </>
            );
        } else {
            content = (
                <div className="order-body">
                    <figure>
                        <img src={images.basket} alt="cart" />
                    </figure>
                    <h3 className="text_center">Start Grabbing Food!</h3>
                    <p className="text_center text-note">Add items to your basket and place order here.</p>
                </div>
            );
        }
    } else if (status === 'failed') {
        content = <p>{error}</p>;
    }
    return <>{content}</>;
}

export default CartList;
