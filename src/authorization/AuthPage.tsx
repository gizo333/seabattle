import React, { FormEvent } from 'react';
import "./auth.css";
import Sidebar from "../component/sidbar";

const AuthPage: React.FC = () => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = (event.target as HTMLFormElement).email.value;
    const password = (event.target as HTMLFormElement).password.value;

    try {
      const response = await fetch('http://85.193.80.60:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        window.location.replace("/game");
      } else if (response.status === 421) {
      } else {
        console.error(data.message || "Ошибка при входе");
      }
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  };

  return (
    <div className="enter-container">
      <Sidebar />

      <div className="enter-content">
        <div className="wrapperWelcome">
        </div>

        <form className="enterForm" onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="email"></label>
            <input className="reg-input" type="email" id="email" placeholder="Введите ваш email" required autoComplete="email" />
          </div>

          <div className="formGroup">
            <label htmlFor="password"></label>
            <input className="reg-input" type="password" id="password" placeholder="Введите ваш пароль" required autoComplete="new-password" />
          </div>

          <button className="button-style" type="submit">Войти</button>
          <button className="button-style" type="button">Забыли пароль?</button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
