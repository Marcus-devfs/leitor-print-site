
interface MenuItem {
    id: string;
    title: string;
    icon: string;
    path: string;
    submenu?: MenuItem[];
}

export const MenuList: MenuItem[] = [
    {
        id: '01', title: 'Início', icon: '', path: '/dashboard', submenu: []
    },
    {
        id: '02', title: 'Meus Dados', icon: '', path: '/users/1', submenu: []
    },
    {
        id: '03', title: 'Usuários', icon: '', path: '/users', submenu: []
    },
    {
        id: '04', title: 'Clientes', icon: '', path: '/customer', submenu: []
    },
    {
        id: '05', title: 'Análises', icon: '', path: '/analytcs', submenu: []
    },
]