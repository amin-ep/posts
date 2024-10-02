import { Link } from "react-router-dom";
function HeaderLogo() {
  return (
    <div className="flex items-center justify-start">
      <Link className="w-full">
        <img src="/public/images/logo-icon-dark.svg" alt="Logo" />
      </Link>
    </div>
  );
}

export default HeaderLogo;
