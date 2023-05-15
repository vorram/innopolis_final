import "./headerBasket.scss"
import icon from "./images/headerBasket__icon.svg"
import { Link } from "react-router-dom";
import addNumberRelevantWordEnding from "../../utilities/addNumberRelevantWordEnding";

export default function HeaderBasket({ itemQty, sum }) {
  return (
    <div className='headerBasket'>
      <div className='headerBasket__text'>
        {!itemQty ? <div>Корзина пуста</div> :
          <div>
            <div>{itemQty} товар{addNumberRelevantWordEnding(itemQty)}</div>
            <div>на сумму {new Intl.NumberFormat('ru-RU').format(sum) + ' ₽'}</div>
          </div>
        }
      </div>
      <Link to="/basket">
        <img className='headerBasket__icon' src={icon} alt="" />
      </Link>
    </div>
  )
}
