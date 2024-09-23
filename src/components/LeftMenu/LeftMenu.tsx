import Link from 'next/link';
import React, { useState } from 'react';

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  path: string;
  submenu?: MenuItem[];
}

interface SidebarProps {
  menu: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ menu }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState({ active: false, id: '' });

  const toggleDropdown = (menuId?: string) => {
    if (isDropdownOpen.active && isDropdownOpen.id === menuId) {
      setIsDropdownOpen({ active: false, id: '' });
    } else {
      setIsDropdownOpen({ active: true, id: menuId || '' });
    }
  };

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 min-w-56 h-screen transition-transform -translate-x-full sm:translate-x-0 z-50"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800 shadow-lg">
        <Link href="/dashboard" className="flex items-center ps-2.5 mb-5">
          <img
            src="./icons/logo_construtora.png"
            className="h-6 me-3 sm:h-7"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
            ZHIRYUS
          </span>
        </Link>
        <ul className="space-y-2 font-medium">
          {menu.map((menuItem) => (
            <li key={menuItem.id}>
              {menuItem.submenu && menuItem.submenu.length > 0 ? (
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group text-white hover:bg-gray-700"
                  aria-controls={`dropdown-${menuItem.id}`}
                  onClick={() => toggleDropdown(menuItem.id)}
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 21"
                  >
                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                  </svg>
                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{menuItem.title}</span>
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
              ) : (
                <Link
                  href={menuItem.path}
                  className="flex items-center p-2 text-gray-900 rounded-lg text-white hover:bg-gray-100 hover:bg-gray-700 group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">{menuItem.title}</span>
                </Link>
              )}

              {(menuItem.submenu && menuItem.submenu.length > 0 && isDropdownOpen?.active && isDropdownOpen?.id === menuItem?.id) && (
                <ul id={`dropdown-${menuItem.id}`} className={`py-2 space-y-2`}>
                  {menuItem?.submenu?.map((subMenuItem) => (

                    <Link key={subMenuItem.id}
                      href={subMenuItem.path}
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 text-white hover:bg-gray-700"
                    >
                      {subMenuItem.title}
                    </Link>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
