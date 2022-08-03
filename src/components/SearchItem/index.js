import classnames from 'classnames/bind';
import styles from './SearchItem.module.scss';

const cx = classnames.bind(styles);

function SearchItem() {
  return ( 
    <div className={cx('wrapper')}>
      <img className={cx('avatar')} src="https://d1sag4ddilekf6.azureedge.net/compressed_webp/items/VNITE2021010704510490452/detail/menueditor_item_48c4180115af4d36ad1b2439b6f7e125_1639731194032928124.webp" alt=""/>
      <div className={cx('info')}>
        <h4 className={cx('name')}>Hồng Trà Đác Cam</h4>
        <p className={cx('desc')}>Hồng Trà Đác Cam 30% đường đá</p>
      </div>
    </div>
   );
}

export default SearchItem;