import { SectionHeader } from "@/components"
import { Table, TableDropdownMenu, TableSearchInput } from "@/components/table"
import { useAppContext } from "@/context/AppContext"
import { randomUUID } from "crypto"
import { useRouter } from "next/router"
import React from "react"

const Users: React.FC = () => {
    const router = useRouter()

    const dropdownItems = [
        { label: 'Reward', href: '#' },
        { label: 'Promote', href: '#' },
        { label: 'Activate account', href: '#' },
        { label: 'Delete User', href: '#' },
    ];


    const users = [
        { id: 1, name: 'Marcus Silva', email: 'marcus.silva@gmail.com', avatar: '', position: 'Software Engenier', area: 'TI Development' },
        { id: 2, name: 'Fulano Souza', email: 'fulano.silva@gmail.com', avatar: '', position: 'Software Engenier', area: 'RH' },
    ];

    return (
        <>
            <SectionHeader title="Funcionários" />
            <div className="flex w-full h-full flex-col">
                {/* <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
                    <TableDropdownMenu items={dropdownItems} />
                    <TableSearchInput placeholder="Search for users" />
                </div> */}
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
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Position
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Área
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b  hover:bg-gray-50 dark:hover:bg-gray-200">
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
                                    src="./icons/perfil.jpg"
                                    alt="Thomas Lean"
                                />
                                <div className="ps-3">
                                    <div className="text-base font-semibold">
                                        Marcus Vinicius
                                    </div>
                                    <div className="font-normal text-gray-500">
                                        marcus@gmail.com
                                    </div>
                                </div>
                            </th>
                            <td className="px-6 py-4">Software Engenier</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    {/* <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{' '} */}
                                    TI Suport
                                </div>
                            </td>
                            <td className="px-6 py-4 cursor-pointer">
                                <div onClick={() => router.push(`/users/1`)}>
                                    <a
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        Edit user
                                    </a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </>
    )

}

export default Users