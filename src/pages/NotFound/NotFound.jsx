import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <div className="h-dvh linear-background">
      <div className="flex flex-col items-center">
        <svg className={styles.svg} viewBox="0 0 960 300">
          <symbol id="s-text">
            <text textAnchor="middle" x="50%" y="50%">
              404
            </text>
          </symbol>

          <g className="g-ants">
            <use xlinkHref="#s-text" className={styles.text}></use>
            <use xlinkHref="#s-text" className={styles.text}></use>
            <use xlinkHref="#s-text" className={styles.text}></use>
            <use xlinkHref="#s-text" className={styles.text}></use>
            <use xlinkHref="#s-text" className={styles.text}></use>
          </g>
        </svg>

        <h1>Page Not Found</h1>
        <a href="#">Back to Home</a>
      </div>
    </div>
  );
}

export default NotFound;
