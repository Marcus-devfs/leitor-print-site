import { SectionHeader } from "@/components"
import { Button } from "@/components/button/Button"
import { useAppContext } from "@/context/AppContext"
import { CustomerDataObject } from "@/helpers/types"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

const CompanyEdit: React.FC = () => {
    const [customerData, setCustomerData] = useState<CustomerDataObject>({
        name: '',
        email: '',
        phone: '',
        company: '',
        canal: '',
        revenue: '',
    })
    const { setAlertData, loading, setLoading } = useAppContext()
    const router = useRouter()
    const { id } = router.query
    const newCustomer = id === 'new'

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

        setCustomerData((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }))
    }

    const getCustomer = async () => {
        setLoading(true)
        try {
            const response = await fetch(`/api/customer/get?customerId=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                setAlertData({
                    active: true,
                    title: 'Ocorreu um erro ao buscar Cliente.',
                    message: 'Erro ao buscar pelo Cliente',
                    type: 'error'
                })
                return
            }

            const data = await response.json();

            if (data.success) {
                setCustomerData(data.customer);
            }

        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!newCustomer && id) {
            getCustomer()
        }
    }, [id])

    const handleCreate = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/customer/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ customerData } as Record<string, unknown>)
            });

            if (!response.ok) {
                setAlertData({
                    active: true,
                    title: 'Ocorreu um erro.',
                    message: 'Erro ao criar o cliente',
                    type: 'error'
                })
                return
            }

            const data = await response.json();

            setAlertData({
                active: true,
                title: 'Tudo Certo!',
                message: 'Cliente cadastrado com sucesso!',
                type: 'success'
            })

            router.push(`/customer/${data.customerId}`);
            return
        } catch (error) {
            console.error('Erro ao verificar o cliente:', error);
            return error
        } finally{
            setLoading(false)
        }
    }

    const handleUpdate = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/customer/update', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ customerData, customerId: id } as Record<string, unknown>)
            });

            if (!response.ok) {
                setAlertData({
                    active: true,
                    title: 'Erro na atualização.',
                    message: 'Erro ao atualizar o cliente',
                    type: 'error'
                })
                return
            }

            const data = await response.json();

            if (data.success) {
                setCustomerData(data.customer)

                setAlertData({
                    active: true,
                    title: 'Atualizado!',
                    message: 'Informações do cliente atualizadas.',
                    type: 'success'
                })
            }
            return
        } catch (error) {
            console.error('Erro ao verificar o cliente:', error);
            return error
        } finally{
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        setLoading(false)
        try {
            const response = await fetch(`/api/customer/delete?customerId=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                setAlertData({
                    active: true,
                    title: 'Ocorreu um erro ao excluir cliente.',
                    message: 'Erro ao excluir cliente',
                    type: 'error'
                })
                return
            }

            const data = await response.json();

            if (data.success) {

                setAlertData({
                    active: true,
                    title: 'Tudo Certo!',
                    message: 'Cliente excluído com sucesso!',
                    type: 'success'
                })

                router.push('/customer')
            }

        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false)
        }
    }

    return (
        <>
            <SectionHeader title='Editar Cliente' />
            <div className="bg-white rounded py-5 px-6">
                <h1 className="text-gray-900 text-2xl font-bold pb-8">Dados do Cliente</h1>
                <div className="grid gap-3 md:grid-cols-2">
                    <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">
                            Nome
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={customerData?.name || ''}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Company Exemple"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900">
                            Empresa
                        </label>
                        <input
                            type="text"
                            name="company"
                            value={customerData?.company || ''}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Flowbite"
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
                            value={customerData?.phone || ''}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="123-45-678"
                            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="canal" className="block mb-2 text-sm font-medium text-gray-900">
                            Canal
                        </label>
                        <input
                            type="url"
                            name="canal"
                            value={customerData?.canal || ''}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="flowbite.com"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="revenue" className="block mb-2 text-sm font-medium text-gray-900">
                            Faturamento mensal
                        </label>
                        <input
                            type="text"
                            name="revenue"
                            value={customerData?.revenue || ''}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="$ 1.000.000,00"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                        Email de contato
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={customerData?.email || ''}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="john.doe@company.com"
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input
                            id="remember"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-200 dark:border-gray-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                            onChange={handleChange}
                        />
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        <p className="text-gray-900">
                            Ativo
                        </p>
                        .
                    </label>
                </div>
                <div className="flex gap-2">
                    <Button arrowIcon={!loading} isLoading={loading} text="Salvar" onClick={() => newCustomer ? handleCreate() : handleUpdate()} />

                    {!newCustomer && <button
                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2 text-center"
                        onClick={() => handleDelete()}
                    >
                        Excluir
                    </button>}
                </div>
            </div>
        </>
    )

}

export default CompanyEdit