import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faArrowRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { useDispatch, useSelector } from 'react-redux';
import { searchFilterChange } from '@/components/Products/productsSlice';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Button from '@/components/Button';
import images from '@/assets/images';
import 'tippy.js/dist/tippy.css'; // optional
// import { Wrapper as PopperWrapper } from '@/components/Popper';
// import SearchItem from '@/components/SearchItem';
import Modal from '@/components/Modal';
import { changeStatusModal, changeNameModal } from '@/components/Modal/modalSlice';
import {
    selectCartDetail,
    getCartListStatus,
    getCartId,
    deleteCartList,
    getStatusLogin,
} from '@/components/CartList/cartListSlice';
import 'react-tippy/dist/tippy.css';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function Header({ searchBar }) {
    const status = useSelector(getCartListStatus);
    const carList = useSelector(selectCartDetail);
    const cartId = useSelector(getCartId);
    const isLogin = useSelector(getStatusLogin) || localStorage.getItem('isLogin');

    if (status === 'succeeded') {
        var numberProd = carList.length > 0 ? carList[0].numberProd : 0;
    }

    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState('');

    const handleShowCartList = () => {
        dispatch(changeStatusModal(true));
        dispatch(changeNameModal('CART_LIST'));
    };

    const handleClosePopup = () => {
        dispatch(changeStatusModal(false));
    };

    const handleChangeSearchTxt = (e) => {
        setSearchText(e.target.value);
        dispatch(searchFilterChange(e.target.value));
    };

    const handleClearData = () => {
        setSearchText('');
        dispatch(searchFilterChange(''));
    };

    const logout = () => {
        window.localStorage.removeItem('isLogin');
        window.localStorage.removeItem('phoneNum');
        window.localStorage.removeItem('cartId');
        dispatch(deleteCartList(cartId));
    };

    return (
        <>
            <header className={cx('wrapper')}>
                <div className="container header">
                    <h1 className={cx('logo')}>
                        <Button className={`junita-script ${cx('logo')}`} to={'/'}>
                            TFood
                        </Button>
                    </h1>
                    {/* <Tippy
                        visible={searchResult.length > 0}
                        interactive
                        render={(attrs) => (
                            <div className={cx('searchResult')} tabIndex="-1" {...attrs}>
                                <PopperWrapper>
                                    <h4 className={cx('search-title')}>Favorite</h4>
                                    <SearchItem />
                                    <SearchItem />
                                    <SearchItem />
                                    <SearchItem />
                                    <SearchItem />
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <div className="search-block">
                            <input
                                type="text"
                                name=""
                                placeholder="Enter food name"
                                value={searchText}
                                onChange={(e) => handleChangeSearchTxt(e)}
                            />
                            <div onClick={handleClearData} className={cx('clear-btn-wrapper')}>
                                <FontAwesomeIcon icon={faCircleXmark} className={cx('clear-btn')} />
                            </div>
                        </div>
                    </Tippy> */}
                    {searchBar && (
                        <>
                            <div className="search-block">
                                <input
                                    type="text"
                                    name=""
                                    placeholder="Enter food name"
                                    value={searchText}
                                    onChange={(e) => handleChangeSearchTxt(e)}
                                />
                                <div onClick={handleClearData} className={cx('clear-btn-wrapper')}>
                                    <FontAwesomeIcon icon={faCircleXmark} className={cx('clear-btn')} />
                                </div>
                            </div>
                        </>
                    )}
                    <div className="block-right">
                        <div className="cart-box" onClick={handleShowCartList}>
                            <img src={images.cart} alt="cart" />
                            {numberProd > 0 && <span>{numberProd}</span>}
                        </div>
                        <Tippy
                            trigger="click"
                            hideOnClick="false"
                            render={(attrs) => (
                                <div className={cx('account-box')} tabIndex="-1" {...attrs}>
                                    {isLogin ? (
                                        <>
                                            <Link to="/" onClick={logout}>
                                                <FontAwesomeIcon
                                                    icon={faArrowRightFromBracket}
                                                    className={cx('logout-btn')}
                                                />
                                                <span>Logout</span>
                                            </Link>
                                            <Link to="/order-list">
                                                <FontAwesomeIcon icon={faUser} className={cx('user-btn')} />
                                                <span>Orders Management</span>
                                            </Link>
                                        </>
                                    ) : (
                                        <Link to="/login">
                                            <FontAwesomeIcon
                                                icon={faArrowRightFromBracket}
                                                className={cx('logout-btn')}
                                            />
                                            <span>Login</span>
                                        </Link>
                                    )}
                                </div>
                            )}
                        >
                            <div className="avatar-box">
                                {isLogin ? (
                                    <img src={images.avatar} alt="avatar" />
                                ) : (
                                    <img src={images.noneUser} alt="avatar" />
                                )}
                            </div>
                        </Tippy>
                    </div>
                </div>
            </header>
            <Modal action={handleClosePopup} />
        </>
    );
}
