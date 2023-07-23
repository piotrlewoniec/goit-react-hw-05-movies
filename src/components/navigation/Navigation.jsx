import { Outlet, NavLink } from 'react-router-dom';
import { Suspense } from 'react';
import css from './Navigation.module.css';

export const Navigation = () => {
  return (
    <>
      <header className={css.navi}>
        <nav className={css.link}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/movies">Movies</NavLink>
        </nav>
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};
