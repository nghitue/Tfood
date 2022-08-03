import Header from '@/components/Layout/components/Header';
import Footer from '../components/Footer';

function DefaultLayout({ children }) {
  return(
    <div className='homepage'>
      <Header searchBar={true}/>
      <div className='main_body p-payment'>
        { children }
      </div>
      <Footer/>
    </div>
  );
}

export default DefaultLayout