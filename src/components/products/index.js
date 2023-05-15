import "./products.scss";
import HeaderBasket from "../headerBasket";
import Card from "../card";
import productsData from "../../productsData";
import { useSelector } from 'react-redux';
import LogoutBtn from "../logoutBtn";

export default function Products() {
  const itemQty = useSelector((state) => state.basket.itemQty);
  const sum = useSelector((state) => state.basket.sum);

  return (
    <div className='products'>
      <div className='products__header'>
        <h1 className='products__title'>Наша продукция</h1>
        <div className='products__header-btns'>
          <HeaderBasket itemQty={itemQty} sum={sum} />
          <LogoutBtn />
        </div>
      </div>
      <div className='products__card-container'>
        {!productsData.length
          ? <div className="products__error">Нет данных</div>
          : productsData.map(({ id, name, desc, img, price, weight }) =>
            <Card id ={id} key={id} name={name} desc={desc} img={img} price={price} weight={weight} />)
        }
      </div>
    </div>
  )
}