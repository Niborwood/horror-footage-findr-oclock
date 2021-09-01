/* eslint-disable import/no-unresolved */
import React from 'react';
import { NavLink } from 'react-router-dom';
import './404.scss';
// import imageFantome from 'https://cdn.pixabay.com/photo/2013/07/13/11/47/woman-158669_960_720.png';

export default function NotFound() {
  return (
    <>
      <div className="fantome" />
      <div className="notfound__container">
        <span className="notfound__text">There&apos;s nothing here. You should leave. Now!</span>
        <NavLink className="notfound__link" to="/">GO HOME</NavLink>
        <span className="notfound__kill">OR I kill you!</span>
      </div>
    </>
  );
}
