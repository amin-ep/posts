import { memo } from "react";
import { Link } from "react-router-dom";
const HeaderLogo = memo(function HeaderLogo() {
  return (
    <div className="flex items-center justify-start">
      <Link className="w-28 h-full">
        <img src="/public/images/logo-icon-dark.svg" alt="Logo" />
      </Link>
    </div>
  );
});

export default HeaderLogo;
