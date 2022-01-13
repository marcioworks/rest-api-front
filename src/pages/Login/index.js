import React from "react";
import "./style.css";

import logoImg from "../../assets/logo.svg";
import padlock from "../../assets/padlock.png";

export default function Login() {
    return (
        <div className="login-container">
            <section className="form">
                <img src={logoImg} alt="logo erudio" />
                <form>
                    <h1>Access your account</h1>
                    <input type="email" placeholder="userName" />
                    <input type="password" placeholder="password" />
                    <button className="button" type="submit">
                        Login
                    </button>
                </form>
            </section>
            <img src={padlock} alt="padlock erudio" />
        </div>
    );
}
