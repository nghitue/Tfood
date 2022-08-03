import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import classnames from 'classnames/bind';

import {
    getProductsStatus,
    getProductsError,
    prodsRemainingSelector,
    getProductById,
    getShowNotification,
    showNotification,
} from './productsSlice';
import Button from '../Button';
import styles from './Products.module.scss';
import Loading from '../Loading';
import FormatCurrency from '../FormatCurrency';
import Modal from '../Modal';
import { changeStatusModal, changeNameModal } from '../Modal/modalSlice';
import { showToast } from '../Toastify';


const cx = classnames.bind(styles);

export default function Product() {
    const dispatch = useDispatch();

    const products = useSelector(prodsRemainingSelector);
    const productStatus = useSelector(getProductsStatus);
    const error = useSelector(getProductsError);
    const noti = useSelector(getShowNotification);

    const handleOrderClick = (id) => {
        dispatch(getProductById(id));
        dispatch(changeStatusModal(true));
        dispatch(changeNameModal('CART_DETAIL'));
    };

    const handleClosePopup = () => {
        dispatch(changeStatusModal(false));
    };

    noti.statusNoti && showToast(noti.nameNoti,noti.content);

    setTimeout(() => {
        dispatch(showNotification({statusNoti: false,nameNoti: null}));
    }, 2000);

    // dispatch(showNotification({statusNoti: false,nameNoti: null}));

    let content;
    if (productStatus === 'loading') {
        content = <Loading isShow={true} />;
    } else if (productStatus === 'succeeded') {
        content = (
            <>
                {products.map((product, index) => (
                    <div className="item" key={index}>
                        <figure className="product-img">
                            <img className={cx('images-fit')} src={product.prod_url} alt="" />
                        </figure>
                        <div className="product-tit">
                            <h3 className="tit">{product.prod_name}</h3>
                        </div>
                        {product.price_sale ? (
                            <div className="product-price">
                                <span className={cx('price')}>
                                    {<FormatCurrency money={product.price * 1000}></FormatCurrency>}
                                </span>
                                <span className={cx('price_sale')}>
                                    {<FormatCurrency money={product.price_sale * 1000}></FormatCurrency>}
                                </span>
                            </div>
                        ) : (
                            <div className="product-price">
                                <span className={cx('price_sale')}>
                                    {<FormatCurrency money={product.price * 1000}></FormatCurrency>}
                                </span>
                            </div>
                        )}

                        <div className="product-bottom">
                            <Button
                                leftIcon={<FontAwesomeIcon icon={faCartPlus} />}
                                className={'btn btn-order'}
                                onClick={() => handleOrderClick(product.id)}
                            >
                                Đặt mua
                            </Button>
                        </div>
                    </div>
                ))}
                <ToastContainer />
            </>
        );
    } else if (productStatus === 'failed') {
        content = <p>{error}</p>;
    }
    return (
        <>
            <div className={cx('product-list') + ' product-list'}>{content}</div>
            <Modal action={handleClosePopup} />
        </>
    );
}
