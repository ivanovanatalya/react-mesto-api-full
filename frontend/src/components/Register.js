import { useRef } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(emailRef.current.value, passwordRef.current.value);
  }

  return (
    <div className="auth">
      <h1 className="auth__title">Регистрация</h1>
      <form onSubmit={handleSubmit}>
        <input ref={emailRef} type="email" name="email" placeholder="Email" className="auth__input" required />
        <input ref={passwordRef} type="password" name="password" placeholder="Пароль" className="auth__input" required />
        <button className="auth__button">Зарегистрироваться</button>
      </form>
      <div className="auth__text">
        <p>
          Уже зарегистрированы?
        </p>
        <Link to="/sign-in" className="auth__text auth__link">Войти</Link>
      </div>
    </div>
  )
}
export default Register;