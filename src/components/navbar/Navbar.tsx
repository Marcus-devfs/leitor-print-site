import { useAppContext } from '@/context/AppContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';


interface MenuItem {
    id: string;
    title: string;
    icon: string;
    path: string;
    userId?: boolean
    submenu?: MenuItem[];
}

interface NavbarProps {
    menu: MenuItem[];
}

export const Navbar: React.FC<NavbarProps> = ({ menu }) => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { userData, logout } = useAppContext()
    const router = useRouter()

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    const [isDropdownOpen, setIsDropdownOpen] = useState({ active: false, id: '' });

    const toggleDropdown = (menuId?: string) => {
        if (isDropdownOpen.active && isDropdownOpen.id === menuId) {
            setIsDropdownOpen({ active: false, id: '' });
        } else {
            setIsDropdownOpen({ active: true, id: menuId || '' });
        }
    };

    return (
        <nav className="bg-white w-full border-gray-200 dark:bg-white fixed z-10 shadow-lg">
            <div className="flex items-center justify-between py-4 px-8">

                <div className="flex items-center px-2 py-2 gap-2">
                    <img
                        src="/icons/avatar-dottie.png"
                        className="h-6 me-3 sm:h-12"
                        alt="Flowbite Logo"
                    />
                    <img
                        src="/icons/logo-dottie.png"
                        className="h-3 me-2 sm:h-5"
                        alt="Flowbite Logo"
                    />
                </div>

                <ul className="font-medium flex gap-2">
                    {menu.map((menuItem) => (
                        <li key={menuItem.id}>
                            {/* {menuItem.submenu && menuItem.submenu.length > 0 ? (
                                <button
                                    type="button"
                                    className="flex items p-2 text-base text-white transition duration-75 rounded-lg group text-white hover:bg-gray-700"
                                    aria-controls={`dropdown-${menuItem.id}`}
                                    onClick={() => toggleDropdown(menuItem.id)}
                                >
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 18 21"
                                    >
                                        <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                                    </svg>
                                    <span className="text-gray-700 flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{menuItem.title}</span>
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
                            ) : ( */}
                            <Link
                                href={menuItem.userId ? `${menuItem.path}/${userData._id}` : menuItem.path}
                                className="flex items-center p-2 text-gray-900 rounded-lg text-white hover:bg-gray-100 hover:bg-gray-100 group"
                            >
                                <span className="text-gray-700 flex-1 ms-3 whitespace-nowrap">{menuItem.title}</span>
                            </Link>
                            {/* )} */}

                            {/* {(menuItem.submenu && menuItem.submenu.length > 0 && isDropdownOpen?.active && isDropdownOpen?.id === menuItem?.id) && (
                                <ul id={`dropdown-${menuItem.id}`} className={`py-2 space-y-2`}>
                                    {menuItem?.submenu?.map((subMenuItem) => (

                                        <Link key={subMenuItem.id}
                                            href={subMenuItem.path}
                                            className="text-gray-700 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 text-white hover:bg-gray-100"
                                        >
                                            {subMenuItem.title}
                                        </Link>
                                    ))}
                                </ul>
                            )} */}
                        </li>
                    ))}
                </ul>

                {userData ?

                    <div className='flex gap-2 w-100'>
                        <div className="relative">
                            <button className='flex py-2 px-4 rounded border rounded-lg border-black align-center justify-center'
                                onClick={toggleUserMenu}>
                                <span className='text-gray-800'>Minha conta</span>
                            </button>

                            {isUserMenuOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow"
                                    id="user-dropdown"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="user-menu-button"
                                >
                                    <div className="px-4 py-3">
                                        <span className="block text-sm text-gray-500 truncate">
                                            {userData?.name || 'Marcus Silva'}
                                        </span>
                                    </div>
                                    <ul className="py-2">
                                        <li>
                                            <Link
                                                href="/dashboard"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Início
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={`/users/${userData._id}`}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Meus Dados
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Alterar senha
                                            </Link>
                                        </li>
                                        <li>
                                            <div
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  cursor-pointer"
                                                onClick={() => logout()}>
                                                Sair
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>


                        <button className='flex py-2 px-4 rounded bg-[#FF6700] align-center justify-center rounded-lg'>
                            <span>Subir imagens</span>
                        </button>
                    </div>
                    :
                    <div className='flex gap-2 w-100'>
                        <button className='flex py-2 px-4 rounded border rounded-lg border-black align-center justify-center'
                            onClick={() => router.push('/authentication')}>
                            <span className='text-gray-800'>Entrar</span>
                        </button>

                        <button className='flex py-2 px-4 rounded bg-[#FF6700] align-center justify-center rounded-lg'>
                            <span>Começe Grátis</span>
                        </button>
                    </div>}

                {/* {userData && 
                <div className="flex items-center space-x-3 md:space-x-0 gap-6">
                    <img
                        className="w-5 h-5 rounded-full"
                        src="./icons/bell.png"
                        alt="user photo"
                    />
                    <div className="relative">
                        <button
                            type="button"
                            className="flex rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
                            id="user-menu-button"
                            aria-expanded={isUserMenuOpen}
                            onClick={toggleUserMenu}
                        >
                            <img
                                className="w-8 h-8 rounded-full"
                                src="./icons/perfil.jpg"
                                alt="user photo"
                            />
                        </button>
                        
                    </div>
                    <button
                        data-collapse-toggle="navbar-user"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-user"
                        aria-expanded={isUserMenuOpen}
                        onClick={toggleUserMenu}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>} */}
            </div>
        </nav>
    );
};
