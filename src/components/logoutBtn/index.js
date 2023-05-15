import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearBasket } from "../../utilities/basketSlice";
import { logoutCurrentUser } from "../../utilities/currentUserSlice";
import "./logoutBtn.scss"

export default function LogoutBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let users = JSON.parse(localStorage.getItem("users"));
  const currentUser = useSelector((state) => state.currentUser.name);
  const currentBasket = useSelector((state) => state.basket.items);

  function logout() {
    const currentUserIndex = users.findIndex(user => user.login === currentUser);
    users[currentUserIndex].basket = currentBasket;
    localStorage.setItem("users", JSON.stringify(users));
    dispatch(logoutCurrentUser());
    dispatch(clearBasket());
    navigate("/login");
  }

  return (
    <button className="logoutBtn" onClick={logout}>Выйти</button>
  )
}