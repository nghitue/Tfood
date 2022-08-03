import Header from '@/components/Layout/components/Header';

function DefaultLayout({ children }) {
  return(
    <div className='homepage'>
      <Header/>
      <div className='main_body p-payment'>
        { children }
      </div>
    </div>
  );
}

export default DefaultLayout