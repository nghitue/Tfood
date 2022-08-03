import MainTitles from '@/components/MainTitles';
import Menu from '@/components/Menu';
import Products from '@/components/Products';
import CartDetail from '@/components/CartDetail';
// import CartList from '@/components/OrderList';
import { useSelector } from "react-redux"
import { getStatus } from '@/components/Products/productsSlice';

function Home() {
    const isShowCartDetail = useSelector(getStatus);
    const isShowCartList = false;
    return (
        <>
            <section className="section1">
                <div className="container">
                    <MainTitles title={'Menu'} subTitle={'Category'} />
                    <Menu />
                </div>
            </section>
            <section className="section2">
                <div className="container">
                    <MainTitles title={'All'} subTitle={'Products'} seeAll={true} />
                    <Products />
                </div>
            </section>
            {isShowCartDetail && <CartDetail/>}
            {isShowCartList && <CartDetail/>}
        </>
    );
}
export default Home;
