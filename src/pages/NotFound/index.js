import images from '@/assets/images';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import style from './NotFound.module.scss';


const cx = classNames.bind(style);

function NotFound() {
    return (
        <>
          <div className={`container ${cx('container')}`}>
            <div className={cx('content')}>
              <figure className={cx('imagetext')}>
                <img src={images.pagenotfound} alt="pagenotfound" />
              </figure>
              <h2 className={cx('title')}>Oops, We can seem to find<br/>the page what you are looking for.</h2>
              <p className={cx('sub-title')}>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
              <Link to="/" className={cx('back')}>
                <FontAwesomeIcon icon={faArrowRight} className={cx('back-home')} />
                <span>Back to Home Page</span>
              </Link>
            </div>
          </div>
        </>
    );
}

export default NotFound;
