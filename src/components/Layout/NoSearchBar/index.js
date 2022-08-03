import Header from '@/components/Layout/components/Header';
import Footer from '../components/Footer';

function NoSearchBar({ children }) {
  return(
    <div className='homepage'>
      <Header searchBar={false}/>
      <div className='main_body p-payment'>
        { children }
      </div>
      <Footer/>
    </div>
  );
}

export default NoSearchBar