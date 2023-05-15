import './basket.scss';
import BasketItem from '../../components/basketItem';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearBasket } from "../../utilities/basketSlice";
import LogoutBtn from '../logoutBtn';
import { useState } from 'react';
import BackBtn from '../backBtn';

export default function Basket() {
  const sum = useSelector((state) => state.basket.sum);
  const items = useSelector((state) => state.basket.items);
  const [finishedOrder, setFinishedOrder] = useState(false);
  const dispatch = useDispatch();

  function resetBasket() {
    dispatch(clearBasket());
    setFinishedOrder(false);
  }

  return (
    <>
      <div className="basket">
        <div className="basket__header">
          <div className="basket__header-left">
            <BackBtn />
            <h1 className="basket__title">Корзина с выбранными товарами</h1>
          </div>
          <LogoutBtn />
        </div>
        <div className="basket__item-container">
          {items?.map(currentItem => {
            const { img, name, price, id } = currentItem.item;
            return (
              <BasketItem img={img} name={name} price={price} id={id} key={id} qty={currentItem.qty} removeItem={() => dispatch(removeItem(id))} />
            );
          })}
        </div>
        <div className="basket__footer">
          <div className="basket__footer-container">
            <div className="basket__footer-text">
              <h2 className="basket__footer-title">Заказ на сумму:</h2>
              <div className="basket__sum">
                {items ? new Intl.NumberFormat('ru-RU').format(sum) + ' ₽' : '0 ₽'}
              </div>
            </div>
            {items.length > 0 && 
              <button className="basket__checkout-btn" onClick={() => setFinishedOrder(true)}>Оформить заказ</button>
            }
          </div>
        </div>
      </div>
      {finishedOrder && 
        <div className="blurFilter"></div>
      }
      {finishedOrder && 
        <div className="orderWindow">
          <div className="orderWindow__text">Заказ оформлен</div>
          <button className="orderWindow__btn" onClick={resetBasket}>OK</button>
        </div>
      }
    </>
  )
}
