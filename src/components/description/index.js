import "./description.scss"
import { useState } from "react"
import { useParams } from "react-router-dom"
import BackBtn from "../backBtn"
import HeaderBasket from "../headerBasket"
import LogoutBtn from "../logoutBtn"
import productsData from "../../productsData";
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from "../../utilities/basketSlice"

export default function Description() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const selectedItem = productsData.find(item => item.id === Number(id));
  const { img, name, longDesc, price, weight } = selectedItem;
  const items = useSelector((state) => state.basket.items);
  const itemQty = useSelector((state) => state.basket.itemQty);
  const sum = useSelector((state) => state.basket.sum);
  const [isAdded, setIsAdded] = useState(
    items.find(currentItem => currentItem.item.id === Number(id))
    ? true
    : false
  );

  function handleAdd(item) {
    dispatch(addItem(item));
    setIsAdded(!isAdded);
  }

  function handleRemove(id) {
    dispatch(removeItem(id));
    setIsAdded(!isAdded);
  }

  return (
    <div className="description">
      <div className="description__background">
        <div className="description__header">
          <BackBtn />
          <div className="description__header-right">
            <HeaderBasket itemQty={itemQty} sum={sum}/>
            <LogoutBtn />
          </div>
        </div>
        <div className="description__container">
          <img src={process.env.PUBLIC_URL + img} alt="" className="description__image" />
          <div className="description__content">
            <div className="description__name">{name}</div>
            <div className="description__text">{longDesc}</div>
            <div className="description__container-footer">
              <span className="description__price">{new Intl.NumberFormat('ru-RU').format(price) + ' ₽'}</span> / <span className="description__weight">{weight + ' г.'}</span>
              {isAdded 
              ? <button className="description__addBtn" onClick={() => handleRemove(Number(id))}>Удалить из корзины</button>
              : <button className="description__addBtn" onClick={() => handleAdd(selectedItem)}>В корзину</button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}