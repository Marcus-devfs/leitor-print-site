import { Body, SectionHeader } from "@/components"
import { Table, TableDropdownMenu, TableSearchInput } from "@/components/table"
import { useAppContext } from "@/context/AppContext"
import { UserDataObject } from "@/helpers/types"
import { randomUUID } from "crypto"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

const Users: React.FC = () => {
    const [users, setUsers] = useState<UserDataObject[]>([])
    const { setAlertData } = useAppContext()
    const router = useRouter()


    const getUsers = async () => {
        try {
            const response = await fetch(`/api/user/list`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                setAlertData({
                    active: true,
                    title: 'Ocorreu um erro ao buscar os usuários.',
                    message: 'Erro ao buscar pelos usuários',
                    type: 'error'
                })
                return
            }

            const data = await response.json();

            if (data.success) {
                setUsers(data.users);
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    const dropdownItems = [
        { label: 'Novo', href: '/users/new' },
        { label: 'Desativar', href: '#' },
        { label: 'Excluir Usuario', href: '#' },
    ];


    return (
        <Body>
            <SectionHeader title="Usuários" />
            <div className="flex w-full h-full flex-col">
                <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white py-2 px-2">
                    <TableDropdownMenu items={dropdownItems} />
                    <TableSearchInput placeholder="Pesquisar por Usuario" />
                </div>
                <Table>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-all-search"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2  dark:border-gray-600"
                                    />
                                    <label
                                        htmlFor="checkbox-all-search"
                                        className="sr-only"
                                    >
                                        checkbox
                                    </label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nome
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Telefone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ação
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? users.map((item, index) => {
                            return (
                                <tr key={index} className="bg-white border-b  hover:bg-gray-50 dark:hover:bg-gray-200">
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input
                                                id="checkbox-table-search-2"
                                                type="checkbox"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2  dark:border-gray-600"
                                            />
                                            <label
                                                htmlFor="checkbox-table-search-2"
                                                className="sr-only"
                                            >
                                                checkbox
                                            </label>
                                        </div>
                                    </td>
                                    <th
                                        scope="row"
                                        className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src="./icons/user.png"
                                            alt="Thomas Lean"
                                        />
                                        <div className="ps-3">
                                            <div className="text-base font-semibold">
                                                {item.name}
                                            </div>
                                            <div className="font-normal text-gray-500">
                                                {item.email}
                                            </div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            {item.phone}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 cursor-pointer">
                                        <div onClick={() => router.push(`/users/${item._id}`)}>
                                            <a
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                Editar usuário
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                            :
                            <span>Não encontramos usuários cadastrados</span>}
                    </tbody>
                </Table>
            </div>
        </Body>
    )

}

export default Users