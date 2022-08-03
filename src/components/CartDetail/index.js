import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import classNames from 'classnames/bind';
import uuid from 'react-uuid';

import styles from './CartDetail.module.scss';
import { prodByIdList, showNotification } from '@/components/Products/productsSlice';
import FormatCurrency from '../FormatCurrency';
import { changeStatusModal } from '../Modal/modalSlice';
import { updateCartList, selectCartDetail, addCartList , getCartId, setCartId} from '@/components/CartList/cartListSlice';

const cx = classNames.bind(styles);

function CartDetail() {
    const dispatch = useDispatch();
    let product = useSelector(prodByIdList);
    const cartItem = useSelector(selectCartDetail);
    const [countProd, setCountProd] = useState(1);
    const cartId = useSelector(getCartId) || window.localStorage.getItem("cartId");

    const handleMinusProduct = () => {
        countProd > 0 ? setCountProd((countProd) => countProd - 1) : setCountProd(0);
    };

    const handlePlusProduct = () => {
        setCountProd((countProd) => countProd + 1);
    };

    const handleCancleOrder = () => {
        setCountProd(1);
        dispatch(changeStatusModal(false));
    };

    const handleAddToBasket = () => {
        if(!cartId){
            const id = uuid();
            dispatch(setCartId(id));
            window.localStorage.setItem("cartId", id);
            dispatch(addCartList({
                id: id,
                numberProd: countProd,
                totalPrice: 0,
                prodList: [
                    {
                        prod_url: product[0].prod_url,
                        prod_id: product[0].id,
                        prod_name: product[0].prod_name,
                        prod_number: countProd,
                        price: product[0].price_sale ? product[0].price_sale : product[0].price,
                    },
                ]
            }));
        }
        else{
            var newProList = cartItem[0].prodList.map((obj) => {
                if (obj.prod_id === product[0].id) {
                    return { ...obj, prod_number: obj.prod_number + countProd };
                }
                return obj;
            });
            var check = cartItem[0].prodList.filter((obj) => obj.prod_id === product[0].id);
            dispatch(
                updateCartList({
                    id: cartItem[0].id,
                    // userId: cartItem[0].userId,
                    numberProd:
                        cartItem[0].prodList
                            .map((item) => item.prod_number)
                            .reduce((prevValue, curentvalue) => prevValue + curentvalue, 0) + countProd,
                    prodList:
                        check.length > 0
                            ? newProList
                            : [
                                  ...cartItem[0].prodList,
                                  {
                                      prod_url: product[0].prod_url,
                                      prod_id: product[0].id,
                                      prod_name: product[0].prod_name,
                                      prod_number: countProd,
                                      price: product[0].price_sale ? product[0].price_sale : product[0].price,
                                  },
                              ],
                }),
            ).unwrap();
        }
        setCountProd(1);
        dispatch(changeStatusModal(false));
        dispatch(
            showNotification({
                statusNoti: true,
                nameNoti: 'success',
                content: 'Product add to cart successfully !',
            }),
        );
    };

    let content;
    let productPrice = product[0].price_sale || product[0].price;
    if (product.length > 0) {
        content = (
            <>
                <div className="order-body">
                    <div className="block-product box-pd">
                        <figure className="product-img">
                            <img src={product[0].prod_url} alt="" />
                        </figure>
                        <div className="product-info">
                            <div className="box">
                                <h3 className="p-title">{product[0].prod_name}</h3>
                                {product[0].price_sale ? (
                                    <div>
                                        <p className="price">
                                            {<FormatCurrency money={product[0].price * 1000}></FormatCurrency>}
                                        </p>
                                        <p className="price price_sale">
                                            {<FormatCurrency money={product[0].price_sale * 1000}></FormatCurrency>}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="price price_sale">
                                        {<FormatCurrency money={product[0].price * 1000}></FormatCurrency>}
                                    </p>
                                )}
                            </div>
                            <p className="desc">{product[0].prod_desc}</p>
                        </div>
                    </div>
                </div>
                <div className="order-footer box-pd">
                    <div className="block-footer">
                        <div className="f-left">
                            <div className={cx('btn-bottom')} onClick={handleMinusProduct}>
                                <FontAwesomeIcon icon={faMinus} />
                            </div>
                            <span>{countProd}</span>
                            <div className={cx('btn-bottom')} onClick={handlePlusProduct}>
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                        </div>
                        <div className="f-right">
                            {countProd === 0 ? (
                                <div className="btn btn-cancel" onClick={handleCancleOrder}>
                                    Cancel
                                </div>
                            ) : (
                                <div className="btn" onClick={handleAddToBasket}>
                                    Add to Basket -{' '}
                                    {<FormatCurrency money={countProd * 1000 * productPrice}></FormatCurrency>}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return <>{content}</>;
}

export default CartDetail;
