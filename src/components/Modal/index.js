import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import CartDetail from '../CartDetail';
import CartList from '../CartList';
import { toggleModal } from '../Modal/modalSlice';

const cx = classNames.bind(styles);

function Modal({ action }) {
    const modal = useSelector(toggleModal);
    let content = modal.name === 'CART_DETAIL' ? <CartDetail /> : <CartList />;
    return (
        <div className={`order-box-wrapper ${modal.isShow ? 'active' : ''}`} onClick={action}>
            <div
                className="order-box-content"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div
                    className={`order-box ${
                        modal.name === 'CART_LIST' ? 'basket-preview' : modal.name === 'CART_EMTY' ? 'basket-empty' : ''
                    }`}
                >
                    <div className="order-head box-pd">
                        <button className={cx('close-btn-wrapper')} type="button" onClick={action}>
                            <FontAwesomeIcon icon={faTimes} className={cx('close-btn')} />
                        </button>
                        {modal.name === 'CART_LIST' && (
                            <div className="head-tit">Basket</div>
                        )}
                    </div>
                    {content}
                </div>
            </div>
        </div>
    );
}

export default Modal;
