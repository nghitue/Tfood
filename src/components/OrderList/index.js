import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import style from './OrderList.module.scss';
import { getOrderListStatus, getOrderListError, selectAllOrderList } from './orderListSlice';
import Loading from '../Loading';
import FormatCurrency from '../FormatCurrency';
import { getUserPhone } from '../CartList/cartListSlice';

const cx = classNames.bind(style);

function OrderList() {
    const orderList = useSelector(selectAllOrderList);
    const status = useSelector(getOrderListStatus);
    const error = useSelector(getOrderListError);
    const phoneNum = useSelector(getUserPhone) || window.sessionStorage.getItem("phoneNum");

    let content;
    if (status === 'loading') {
        content = <Loading isShow={true} />;
    } else if (status === 'succeeded') {
        const orderByUser = orderList.filter(order => order.phoneNum === phoneNum);
        content = orderByUser.map((order, index) => (
            <dl key={index}>
                <dd>{index}</dd>
                <dd>{order.phoneNum}</dd>
                <dd width="20%">
                    {order.prodList.map((prod, pos) => (
                        <ul key={pos}>
                          <li>
                              {prod.prod_number}: {prod.prod_name}
                          </li>
                          <li>
                              <span>Price: {<FormatCurrency money={prod.price * 1000} />}/item</span>
                          </li>
                        </ul>
                    ))}
                </dd>
                {/* <dd>{order.cusTable}</dd> */}
                <dd>{order.daypayment}</dd>
                <dd>{<FormatCurrency money={order.totalPrice * 1000} />}</dd>
                <dd>{order.statusPayment ? 'true' : 'false'}</dd>
            </dl>
        ));
    } else if (status === 'failed') {
        content = <p>{error}</p>;
    }
    return (
        <div className="container">
            <div className={cx('wrapper')}>
                <div className={`div ${cx('table')}`}>
                    <dl>
                        <dt>No</dt>
                        <dt>Employee</dt>
                        <dt>Product Detail</dt>
                        <dt>Order Day</dt>
                        <dt>Total</dt>
                        <dt>Payment Status</dt>
                    </dl>
                    {content}
                </div>
            </div>
        </div>
    );
}
export default OrderList;
