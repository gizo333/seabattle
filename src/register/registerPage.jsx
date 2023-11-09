import React from "react";
import { Link } from 'react-router-dom';
import "./register.css"
import axios from 'axios';
import { useState, useEffect } from 'react';
import Sidebar from "../component/sidbar";
import { handleCheckToken } from "../server/view_token";






const Register = () => {
    const [fullname, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const regSubmit = async (e) => {
        e.preventDefault();

        // Проверка паролей на совпадение
        if (password !== confirmPassword) {
            alert("Пароли не совпадают!");
            return;
        }

        try {
            const response = await axios.post('http://85.193.80.60:4000/register/', {
                username: fullname,
                email: email,
                password: password,
            });

            const token = response.data.token;
            if (token) {
                localStorage.setItem('token', token);

                console.log('Токен сохранен в localStorage:', localStorage.getItem('token'));
            } else {
                console.log('Токен отсутствует');
            }

            console.log('Ответ:', response.data);

            setFullName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.error("Ошибка", error);
            if (error.response && error.response.data) {
                alert(error.response.data.detail);
            } else {
                alert("Произошла неизвестная ошибка.");
            }
        }
    };

    useEffect(() => {
        const isTokenValid = handleCheckToken();
        if (isTokenValid) {
            console.log("Токен действителен.");
        } else {
            console.log("Токен истек или отсутствует.");
        }
    }, []);

    return (

        <div className="reg_container">
            <Sidebar />
            <div className="reg_content">

                <div className="wrapperWelcome">
                    <div className="welcomeText">
                        <h3>Добро пожаловать!</h3>
                        <p>Процесс регистрации прост и займет у вас всего несколько секунд.
                            Просто заполните форму ниже.</p>
                        <p>Если у вас уже есть аккаунт, <Link to="/auth">войдите!</Link></p>
                    </div>
                </div>
                <form className="registrationForm" onSubmit={regSubmit}>


                    <div className="formGroup">
                        <label htmlFor="fullname"></label>
                        <input className="reg-input" type="text" id="fullname" value={fullname} onChange={e => setFullName(e.target.value)} placeholder="Введите ваше имя" required />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="email"></label>
                        <input className="reg-input" type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Введите ваш email" required autoComplete="email" />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="password"></label>
                        <input
                            className="reg-input"
                            type={isPasswordVisible ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Введите ваш пароль"
                            required
                            autoComplete="new-password"
                        />
                        <span
                            className="toggle-password-icon"
                            onClick={() => setPasswordVisible(!isPasswordVisible)}
                        >
                            {isPasswordVisible ? "👁️" : "🙈"}
                        </span>
                    </div>

                    <div className="formGroup">
                        <label htmlFor="confirmPassword"></label>
                        <input
                            className="reg-input"
                            type={isPasswordVisible ? "text" : "password"}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            placeholder="Подтвердите ваш пароль"
                            required
                            autoComplete="new-password"
                        />
                        <span
                            className="toggle-password-icon"
                            onClick={() => setPasswordVisible(!isPasswordVisible)}
                        >
                            {isPasswordVisible ? "👁️" : "🙈"}
                        </span>
                    </div>

                    <button className="button-style" type="submit">Зарегистрироваться</button>

                    {/* <button  type="button" onClick={resetPasswordSubmit}>
            Проверить токен
          </button> */}


                </form>

                <footer className="wrapper-footer">
                    <div className="footer-content">
                        <p>Мы уважаем вашу приватность и обеспечиваем безопасность ваших персональных данных.
                            Для подробностей, пожалуйста, ознакомьтесь с нашей Политикой Конфиденциальности.</p>
                    </div>

                </footer>
            </div>

        </div>

    )

}

export default Register;