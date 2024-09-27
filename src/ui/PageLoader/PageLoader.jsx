import { loader, spinner } from "./PageLoader.module.css";
function PageLoader() {
  return (
    <div className={loader}>
      <span className={spinner}></span>
    </div>
  );
}

export default PageLoader;
