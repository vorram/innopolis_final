import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from "../../utilities/currentUserSlice";
import { setBasket } from "../../utilities/basketSlice";
import validateEmail from "../../utilities/validateEmail"
import './login.scss';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isRegForm, setIsRegForm] = useState(null);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [userDataError, setUserDataError] = useState("");

  function removeErrors() {
    setLoginError("");
    setPasswordError("");
    setRepeatPasswordError("");
    setUserDataError("");
  }

  function toggleForm(e) {
    e.preventDefault();
    setIsRegForm(!isRegForm);
    removeErrors();
    setLogin("");
    setPassword("");
    isRegForm ? navigate("/login") : navigate("/reg");
  }

  function registerUser(e) {
    e.preventDefault();

    if (validateEmail(login) && password.length > 3 && password === repeatPassword) {
      if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify([]));
      }

      let users = JSON.parse(localStorage.getItem("users"));

      if (!users.find(user => user.login === login)) {
        users.push({ login: login, password: password, basket: [], sendUpdates: isChecked });
        localStorage.setItem("users", JSON.stringify(users));
        dispatch(setCurrentUser(login));
        dispatch(setBasket(login));
        navigate("/");
      } else {
        setLoginError("Пользователь с таким Email уже существует");
      }
    } else {
      if (login.length === 0) {
        setLoginError("Поле не должно быть пустым");
      } else if (!validateEmail(login)) {
        setLoginError("Email невалидный");
      }

      if (password.length === 0) {
        setPasswordError("Поле не должно быть пустым");
      } else if (password.length < 4) {
        setPasswordError("Пароль должен содержать не менее 4-х символов");
      }

      if (password !== repeatPassword) {
        setRepeatPasswordError("Пароли не совпадают");
      }
    }
  }

  function loginUser(e) {
    e.preventDefault();

    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify([]));
    }
    
    let users = JSON.parse(localStorage.getItem("users"));
    let activeUser = users.find(user => user.login === login);

    if (!activeUser || activeUser.password !== password) {
      if (!login) {
        setLoginError("Поле не должно быть пустым");
      }

      if (!password) {
        setPasswordError("Поле не должно быть пустым");
      }

      if (login && password) {
        setUserDataError("Логин или пароль неверен")
      }
    } else {
      dispatch(setCurrentUser(login));
      dispatch(setBasket(login));
      navigate("/");
    }
  }

  useEffect(() => {
    if (window.location.pathname === "/reg") {
      setIsRegForm(true);
    } else if (window.location.pathname === "/login") {
      setIsRegForm(false);
    }
  }, [location]);

  return (
    <div className="login">
      <div className="login__bg-filter"></div>
      <form className="loginForm">
        <button className="loginForm__switch-btn" onClick={toggleForm}>
          {isRegForm
            ? "Авторизоваться"
            : "Зарегистрироваться"
          }
        </button>
        <h1 className="loginForm__title">
          {isRegForm
            ? "Регистрация"
            : "Вход"
          }
        </h1>
        <input type="text" className="loginForm__login-input" placeholder='Email' onInput={e => setLogin(e.target.value)} onFocus={() => removeErrors()} value={login} />
        {loginError &&
          <div className="loginForm__login-error">{loginError}</div>
        }
        <input type="password" className="loginForm__password-input" placeholder='Пароль' onInput={e => setPassword(e.target.value)} onFocus={() => removeErrors()} value={password} />
        {passwordError &&
          <div className="loginForm__password-error">{passwordError}</div>
        }
        {isRegForm &&
          <input type="password" className="loginForm__repeatPassword-input" placeholder='Повторите пароль' onInput={e => setRepeatPassword(e.target.value)} onFocus={() => setRepeatPasswordError("")} />
        }
        {repeatPasswordError &&
          <div className="loginForm__repeatPassword-error">{repeatPasswordError}</div>
        }
        {isRegForm &&
          <label className="loginForm__checkbox-container" htmlFor="updatesInput">
            <div className="loginForm__checkbox-text">
              Я согласен получать обновления на почту
            </div>
            <input type="checkbox" className="loginForm__checkbox" id="updatesInput" name="sendUpdates" onChange={e => setIsChecked(e.target.checked)} />
            <span className="loginForm__checkbox-checkmark"></span>
          </label>
        }
        <div className="loginForm__userData-error">{userDataError}</div>
        {isRegForm
          ? <button className="loginForm__register-btn" onClick={registerUser}>Зарегистрироваться</button>
          : <button className="loginForm__login-btn" onClick={loginUser}>Войти</button>
        }
      </form>
    </div>
  )
}