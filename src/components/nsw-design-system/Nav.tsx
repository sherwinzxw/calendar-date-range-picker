import { Fragment } from "react";

const Nav = (props: any) => {
  return (
    <Fragment>
      <nav
        className="nsw-main-nav js-mega-menu"
        id="main-nav"
        aria-label="Main menu"
      >
        <div className="nsw-main-nav__header">
          <div className="nsw-main-nav__title">Menu</div>
          <button
            className="nsw-icon-button js-close-nav"
            type="button"
            aria-expanded="true"
          >
            <span
              className="material-icons nsw-material-icons"
              focusable="false"
              aria-hidden="true"
            >
              close
            </span>
            <span className="sr-only">Close Menu</span>
          </button>
        </div>
        <ul className="nsw-main-nav__list">
          <li>
          <a href="/">
              <span>Home</span>
            </a>
          </li>

          <li>
            <a href="/contact">
              <span>Contact us</span>
            </a>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Nav;
