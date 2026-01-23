import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, MenuIcon, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = ({ onMenuClick }) => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-base-200 border-b border-base-300 fixed top-0 left-0 right-0 z-50 h-16 flex items-center w-full">
      <div className="flex items-center justify-between w-full px-3 sm:px-5">
        {/* ---------- LEFT SECTION ---------- */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Hamburger (mobile only) */}
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="btn btn-ghost btn-circle lg:hidden"
              aria-label="Open sidebar menu"
            >
              <MenuIcon className="h-6 w-6 text-base-content" />
            </button>
          )}

         
          <Link to="/" className="flex items-center gap-2">
  <ShipWheelIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-9 lg:w-9 text-primary shrink-0" />
  <span className="text-lg sm:text-l lg:text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary truncate">
    LiveTalk
  </span>
</Link>

        </div>

        {/* ---------- RIGHT SECTION ---------- */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 ml-auto">
          {/* Notifications */}
          <Link
            to="/notifications"
            aria-label="Notifications"
            className="btn btn-ghost btn-circle flex items-center justify-center"
          >
            <BellIcon className="h-5 w-5 sm:h-6 sm:w-6 text-base-content opacity-80" />
          </Link>

          {/* Theme Selector (always visible) */}
          <div className="flex items-center justify-center pb-3">
            <ThemeSelector />
          </div>

          {/* Profile Avatar */}
          <div className="avatar flex items-center justify-center">
            <div className="w-8 sm:w-9 rounded-full ring ring-base-300 ring-offset-base-100 ring-offset-2">
              <img
                src={authUser?.profilePic}
                alt="User Avatar"
                referrerPolicy="no-referrer"
                className="object-cover"
              />
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={logoutMutation}
            aria-label="Logout"
            className="btn btn-ghost btn-circle flex items-center justify-center"
          >
            <LogOutIcon className="h-5 w-5 sm:h-6 sm:w-6 text-base-content opacity-80" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
