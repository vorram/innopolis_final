import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { addItem, removeItem } from "../../utilities/basketSlice";
import { useNavigate } from "react-router-dom";
import "./card.scss";

export default function Card({ id, img, name, desc, price, weight }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.basket.items);
  const [isAdded, setIsAdded] = useState(
    (items.find(currentItem => currentItem.item.id === id))
      ? true
      : false
  );

  function handleAdd(e, item) {
    e.stopPropagation();
    dispatch(addItem(item));
    setIsAdded(!isAdded);
  }

  function handleRemove(e, id) {
    e.stopPropagation();
    dispatch(removeItem(id));
    setIsAdded(!isAdded);
  }

  function openDescription(e, id) {
    e.stopPropagation();
    navigate("/description/" + id);
  }

  return (
    <div className="card" onClick={(e) => openDescription(e, id)}>
      <div className="card__top">
        <img src={img} alt="" className="card__image" />
        <div className="card__name">{name}</div>
        <div className="card__description">{desc}</div>
      </div>
      <div className="card__bottom">
        <div className="card__bottom-text">
          <span className="card__price">{new Intl.NumberFormat('ru-RU').format(price) + ' ₽'}</span> / <span className="card__weight">{weight + ' г.'}</span>
        </div>
        {isAdded
          ? <button className="card__button" onClick={(e) => handleRemove(e, id)}>×</button>
          : <button className="card__button" onClick={(e) => handleAdd(e, { id, img, name, desc, price, weight })}>+</button>
        }
      </div>
    </div>
  )
}
