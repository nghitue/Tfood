import images from '@/assets/images';
import { useState } from 'react';
import { useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectAllMenu } from './menuSlice';
import { catIdFilterChange} from '@/components/Products/productsSlice';


export default function Menu() {
  const dispatch = useDispatch();
  const [active, setActive] = useState(1);
  const cat = useSelector(selectAllMenu);
  const urlMenu = [images.menu1,images.menu2,images.menu3,images.menu4,images.menu5,images.menu6];
  const handleChangeCat = (id) => {
    setActive(id);
    dispatch(catIdFilterChange(Number(id)));
  }
  return (
    <ul className="menu-list">
      {
        cat.map((cat, pos) => (
          <li key={cat.id} className={cat.id === active ? "active" : ""} onClick={() => handleChangeCat(cat.id)}>
            <div className="boxcenter">
              <figure><img src={urlMenu[pos]} alt=""/></figure><span>{cat.cat_name}</span>
            </div>
          </li>
        ))
      }
    </ul>
  );
}
