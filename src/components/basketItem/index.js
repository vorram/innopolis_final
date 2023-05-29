import { useDispatch } from 'react-redux';
import { incrementItem, decrementItem } from "../../utilities/basketSlice";
import './basketItem.scss';

export default function BasketItem({img, name, price, qty, id, removeItem}) {
  const dispatch = useDispatch();

  return (
    <div className="basketItem">
      <img src={process.env.PUBLIC_URL + img} alt="" className="basketItem__image" />
      <div className="basketItem__container">
        <div className="basketItem__name">{name}</div>
        <div className="basketItem__qty-buttons">
          <button className="basketItem__decrement-btn" onClick={() => dispatch(decrementItem(id))}>&lt;</button>
          <div className="basketItem__qty">{qty}</div>
          <button className="basketItem__increment-btn" onClick={() => dispatch(incrementItem(id))}>&gt;</button>
        </div>
        <div className="basketItem__price-container">
          <div className="basketItem__price">{new Intl.NumberFormat('ru-RU').format(price * qty) + ' ₽'}</div>
          <button className="basketItem__remove-btn" onClick={removeItem}></button>
        </div>
      </div>
    </div>
  )
}
