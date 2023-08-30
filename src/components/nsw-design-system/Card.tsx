import classNames from "classnames";



export interface CardProperties {
  title: string;
  bio: string;
  style: "default" | "light" | "dark";
  hrefTo: string;
}
const Card = (props: CardProperties) => {
  const { title, bio, style, hrefTo } = props;

  return (
    <div
      className={classNames({
        "nsw-card": true,
        "nsw-card--light": style === "light",
        "nsw-card--dark": style === "dark",
      })}
    >
      <div className="nsw-card__content">
        <div className="nsw-card__title">
          <a href={`${hrefTo}`}>{`${title}`}</a>
        </div>
        <div className="nsw-card__copy">
          <p>{`${bio}`}</p>
        </div>
        <span
          className="material-icons nsw-material-icons"
          focusable="false"
          aria-hidden="true"
        >
          east
        </span>
      </div>
    </div>
  );
};

export default Card;
