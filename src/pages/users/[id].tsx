import { SectionHeader } from "@/components"
import { useAppContext } from "@/context/AppContext"
import { UserDataObject } from "@/helpers/types"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

const UserEdit: React.FC = () => {
    const [userData, setUserData] = useState<UserDataObject>({
        name: '',
        email: '',
        phone: '',
        password: null,
        confirmPassword: null
    })
    const { setAlertData } = useAppContext()
    const router = useRouter()
    const { id } = router.query
    const newUser = id === 'new'

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

        setUserData((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }))
    }

    const getUser = async () => {
        try {
            const response = await fetch(`/api/user/get?userId=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                setAlertData({
                    active: true,
                    title: 'Ocorreu um erro ao buscar usuário.',
                    message: 'Erro ao buscar pelo usuário',
                    type: 'error'
                })
                return
            }

            const data = await response.json();

            if (data.success) {
                const { name, email, phone } = data.user
                setUserData({
                    name,
                    email,
                    phone,
                    password: '',
                    confirmPassword: ''
                });
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!newUser && id) {
            getUser()
        }
    }, [id])

    const handleCreate = async () => {
        try {
            const response = await fetch('/api/user/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userData } as Record<string, unknown>)
            });

            if (!response.ok) {
                setAlertData({
                    active: true,
                    title: 'Ocorreu um erro.',
                    message: 'Erro ao criar o usuário',
                    type: 'error'
                })
                return
            }

            const data = await response.json();

            setAlertData({
                active: true,
                title: 'Tudo Certo!',
                message: 'Usuário cadastrado com sucesso!',
                type: 'success'
            })

            router.push(`/users/${data.userId}`);
            return
        } catch (error) {
            console.error('Erro ao verificar o usuário:', error);
            return error
        }
    }

    const handleUpdate = async () => {
        try {
            const response = await fetch('/api/user/update', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userData, userId: id } as Record<string, unknown>)
            });

            if (!response.ok) {
                setAlertData({
                    active: true,
                    title: 'Erro na atualização.',
                    message: 'Erro ao atualizar o usuário',
                    type: 'error'
                })
                return
            }

            const data = await response.json();

            if (data.success) {
                const { name, email, phone } = data.user
                setUserData({
                    name,
                    email,
                    phone,
                    password: '',
                    confirmPassword: ''
                });

                setAlertData({
                    active: true,
                    title: 'Atualizado!',
                    message: 'Informações do usuário atualizadas.',
                    type: 'success'
                })
            }
            return
        } catch (error) {
            console.error('Erro ao verificar o usuário:', error);
            return error
        }
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/user/delete?userId=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                setAlertData({
                    active: true,
                    title: 'Ocorreu um erro ao excluir usuário.',
                    message: 'Erro ao excluir usuário',
                    type: 'error'
                })
                return
            }

            const data = await response.json();

            if (data.success) {

                setAlertData({
                    active: true,
                    title: 'Tudo Certo!',
                    message: 'Usuário excluído com sucesso!',
                    type: 'success'
                })

                router.push('/users')
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <SectionHeader title={'Usuário'} />
            <div className="bg-white rounded py-5 px-6">
                <h1 className="text-gray-900 text-2xl font-bold pb-8">Dados do Usuário</h1>
                <div className="grid gap-3 md:grid-cols-2">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                            Nome
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={userData?.name || ''}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder="John"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
                            Telefone
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={userData?.phone || ''}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder="123-45-678"
                            // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                            E-mail
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={userData?.email || ''}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder="john.doe@company.com"
                            required
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                        Senha
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={userData?.password || ''}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="•••••••••"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">
                        Confirmar Senha
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={userData?.confirmPassword || ''}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="•••••••••"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input
                            name="active"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-200 dark:border-gray-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        <div className="text-gray-800">
                            Ativo
                        </div>
                    </label>
                </div>
                <div className="flex gap-2">
                    <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => newUser ? handleCreate() : handleUpdate()}
                    >
                        {newUser ? 'Criar' : 'Salvar'}
                    </button>
                    {!newUser && <button
                        onClick={() => handleDelete()}
                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        Excluir
                    </button>}
                </div>
            </div>
        </>
    )

}

export default UserEdit