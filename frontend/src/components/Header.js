import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/vector.svg';

function Header(props) {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип сайта" />
      <div className="header__login">
        <span className="header__email">{props.user}</span>
        <Link to={props.pushTo} className={props.loggedIn ? 'header__link header__link_grey' : 'header__link' }
        onClick={props.clicKSignOut} > {props.linkTitle}</Link>
      </div>
    </header>
  );
}

export default Header;
