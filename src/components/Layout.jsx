import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { XIcon, ShipWheelIcon } from "lucide-react";

const Layout = ({ children, showSidebar = false }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ✅ Toggle sidebar open/close on menu click
  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // ✅ Close sidebar when overlay or link clicked
  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-base-200 relative overflow-x-hidden">
      {/* ---------- SIDEBAR ---------- */}
      {showSidebar && (
        <>
          {/* ---------- Desktop Sidebar ---------- */}
         <aside className="hidden lg:block fixed top-0 left-0 w-64 h-screen bg-base-200 border-r border-base-300 z-40">

            <Sidebar onClose={() => {}} />
          </aside>

          {/* ---------- Mobile Overlay ---------- */}
          <div
            className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
              isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onClick={handleSidebarClose}
          />

          {/* ---------- Mobile Drawer ---------- */}
          <aside
            className={`fixed top-0 left-0 z-50 w-64 h-full bg-base-200 border-r border-base-300 transform transition-transform duration-300 shadow-lg lg:hidden ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Header (Logo + Close) */}
            <div className="flex items-center justify-between p-4 border-b border-base-300">
             

              {/* ✅ Close button (visible only when sidebar is open) */}
              <button
                onClick={handleSidebarClose}
                className="btn btn-ghost btn-sm"
                aria-label="Close sidebar"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {/* ✅ Sidebar Content */}
            <Sidebar onClose={handleSidebarClose} />
          </aside>
        </>
      )}

      {/* ---------- MAIN AREA ---------- */}
    <div
  className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
    showSidebar ? "lg:ml-64" : ""
  }`}
>


        {/* ✅ Navbar (with toggle logic) */}
        <Navbar
          onMenuClick={
            showSidebar ? handleSidebarToggle : undefined
          }
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 pt-20">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
