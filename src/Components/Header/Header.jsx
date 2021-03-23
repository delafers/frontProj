import React from 'react';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
            <header className={s.header}>
                <a>
                    <img src='https://pngimg.com/uploads/photoshop/photoshop_PNG11.png' />
                </a>

                {props.isAuth
                    ? <a>{props.login}  <button onClick={props.logout}>Log out</button></a>
                    : <NavLink to='/login' className={s.header}>Profile</NavLink>}
            </header>
    );
}
export default Header