import React from 'react'
import { Link, Route } from 'react-router-dom';
import logo from '../logo.svg';

export default function Header({ userData, handleLogOut }) {
    return (
        <header className='header'>
            <Route>
                <Link className='header__img' to='/' target='_self'>
                    <img alt='Логотип' className='header__logo' src={logo} />
                </Link>
            </Route>

            <Route path='/signup'>
                <Link className='header__link link' to='/signin'>Войти</Link>
            </Route>

            <Route path='/signin'>
                <Link className='header__link link' to='/signup'>Регистрация</Link>
            </Route>

            <Route exact path='/'>
                <p className='header__email'>{userData.email}</p>
                <Link className='header__link header__link_logout link' to='/signin' onClick={handleLogOut} >Выйти</Link>
            </Route>

        </header>
    );
}