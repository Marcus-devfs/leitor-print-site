interface MenuItem {
    id: string;
    title: string;
    icon: string;
    userId?: boolean
    path: string;
    submenu?: MenuItem[];
}

export const MenuLadingPage: MenuItem[] = [
    {
        id: '01', title: 'Leitor de Imagens', icon: '', path: '/dashboard', submenu: []
    },
    {
        id: '02', title: 'Dashboard', icon: '', path: `/users`, submenu: []
    },
    {
        id: '03', title: 'Recursos', icon: '', path: '/users', submenu: []
    },
    {
        id: '04', title: 'Preços', icon: '', path: '/customer', submenu: []
    },
]