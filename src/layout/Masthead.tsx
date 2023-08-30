import { Fragment } from "react";

const Masthead = () => {
  return (
    <Fragment>
      <nav className="nsw-skip" aria-label="Skip to links">
        <a href="#">
          <span>Skip to navigation</span>
        </a>
        <a href="#">
          <span>Skip to content</span>
        </a>
      </nav>
      <div className="nsw-masthead">
        <div className="nsw-container">A NSW Government website</div>
      </div>
    </Fragment>
  );
};

export default Masthead;
