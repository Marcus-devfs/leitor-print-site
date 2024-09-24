interface MenuItem {
    id: string;
    title: string;
    icon: string;
    userId?: boolean
    path: string;
    submenu?: MenuItem[];
}

export const MenuList: MenuItem[] = [
    {
        id: '01', title: 'Painel', icon: '', path: '/dashboard', submenu: []
    },
    {
        id: '03', title: 'Usuários', icon: '', path: '/users', submenu: []
    },
    {
        id: '04', title: 'Clientes', icon: '', path: '/customer', submenu: []
    },
    {
        id: '05', title: 'Arquivos enviados', icon: '', path: '/analytics', submenu: []
    },
]