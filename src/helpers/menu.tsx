
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
        id: '02', title: 'Administrativo', icon: '', path: '/', submenu: [
            {
                id: '01', title: 'Funcionários', icon: '', path: '/users'
            },
            {
                id: '02', title: 'Clientes', icon: '', path: '/customer'
            }
        ]
    },
    {
        id: '03', title: 'Comercial', icon: '', path: '/', submenu: [
            {
                id: '01', title: 'Comissões', icon: '', path: '/comissions'
            },
            {
                id: '02', title: 'Orçamentos', icon: '', path: '/budget'
            },
            {
                id: '03', title: 'Produtos', icon: '', path: '/product'
            },
        ]
    },
]