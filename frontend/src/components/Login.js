import { useRef } from 'react';

function Login({ onLogin }) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(emailRef.current.value, passwordRef.current.value);
    
  }

  return (
    <div className="auth">
      <h1 className="auth__title">Войти</h1>
      <form onSubmit={handleSubmit}>
        <input ref={emailRef} type="email" name="email" placeholder="Email" className="auth__input" required />
        <input ref={passwordRef} type="password" name="password" placeholder="Пароль" className="auth__input" required />
        <button className="auth__button">Войти</button>
      </form>
    </div>
  )
}
export default Login;
