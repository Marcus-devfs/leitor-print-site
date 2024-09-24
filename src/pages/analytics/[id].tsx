import { SectionHeader } from "@/components"
import Dropzone from "@/components/dropzone/Dropzone"
import { Table } from "@/components/table"
import { useAppContext } from "@/context/AppContext"
import { api } from "@/helpers/api"
import { AnalyticsObjectData, CustomerDataObject } from "@/helpers/types"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"


interface FileWithPreview {
    file: File;
    preview: string;
}

const AnalyticsEdit: React.FC = () => {
    const [customerName, setCustomerName] = useState<string>('')
    const [customers, setCustomers] = useState<CustomerDataObject[]>([])
    const [newFiles, setNewFiles] = useState<FileWithPreview[]>([])
    const [analyticsData, setAnalyticsData] = useState<AnalyticsObjectData>({
        _id: '',
        name: '',
        customerId: '',
        userId: '',
        startDate: '',
        endDate: '',
        description: '',
        files: []
    })
    const [customerSelected, setCustomerSelected] = useState<CustomerDataObject>({
        _id: '',
        name: '',
        email: '',
        phone: '',
        company: '',
        canal: '',
    })
    const router = useRouter()
    const { id } = router.query
    const newAnalytics = id === 'new'
    const { setAlertData, userData } = useAppContext()

    const handleFileUpload = async (file: FileWithPreview, analyticsId: string) => {

        const fileData = file.file
        const formData = new FormData()
        formData?.append('file', fileData, encodeURIComponent(fileData?.name))

        try {
            const response = await api.post(`/file/upload?analyticsId=${analyticsId}`, formData);
            console.log(response)
            return true
        } catch (error) {
            console.error('Erro no upload:', error);
            return false
        }
    };

    const handleAddFile = (file: File) => {
        const filePreview = URL.createObjectURL(file);
        setNewFiles((prevFiles) => [...prevFiles, { file, preview: filePreview }]);
    };

    const handleCustomers = async () => {
        try {
            const response = await api.get(`customer/list/filter?name=${customerName}`)
            const { success } = response.data
            if (success) setCustomers(response.data.customers)

            console.log('Dados extraídos:', response.data);
        } catch (error) {
            console.log(error)
            return error
        }
    }

    // const handleImageProcessing = (file: File): Promise<File> => {
    //     return new Promise((resolve) => {
    //         const img = new Image();
    //         img.onload = () => {
    //             const canvas = document.createElement('canvas');
    //             const ctx = canvas.getContext('2d');

    //             // Ajustar o tamanho do canvas
    //             canvas.width = img.width;
    //             canvas.height = img.height;

    //             if (!ctx) return
    //             // Desenhar a imagem no canvas
    //             ctx.drawImage(img, 0, 0);

    //             // Converter para escala de cinza
    //             const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //             const data = imageData.data;


    //             for (let i = 0; i < data.length; i += 4) {
    //                 const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    //                 data[i] = data[i + 1] = data[i + 2] = avg; // R, G, B
    //             }

    //             ctx.putImageData(imageData, 0, 0);

    //             // Salvar a imagem processada e retornar
    //             canvas.toBlob((blob) => {
    //                 const processedFile = new File([blob], file.name, { type: file.type });
    //                 resolve(processedFile);
    //             });
    //         };
    //         img.src = URL.createObjectURL(file);
    //     });
    // };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

        setAnalyticsData((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }))
    }

    const getAnalytics = async () => {
        try {
            const response = await fetch(`/api/analytics/get?analyticsId=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                setAlertData({
                    active: true,
                    title: 'Ocorreu um erro ao buscar Análise.',
                    message: 'Erro ao buscar pelo Análise',
                    type: 'error'
                })
                return
            }

            const data = await response.json();

            if (data.success) {
                setAnalyticsData(data.analytics);
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!newAnalytics && id) {
            getAnalytics()
        }
    }, [id])

    const handleCreate = async () => {
        try {
            const response = await fetch('/api/analytics/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ analyticsData, userId: userData._id } as Record<string, unknown>)
            });

            if (!response.ok) {
                setAlertData({
                    active: true,
                    title: 'Ocorreu um erro.',
                    message: 'Erro ao criar a Análise',
                    type: 'error'
                })
                return
            }

            const data = await response.json();

            if (data.analyticsId && newFiles.length > 0) {
                let success = true
                for (let file of newFiles) {
                    const uploadFiles = await handleFileUpload(file, data.analyticsId)
                    if (!uploadFiles) success = false
                }

                if (success) {

                    setAlertData({
                        active: true,
                        title: 'Tudo Certo!',
                        message: 'Análise cadastrada com sucesso!',
                        type: 'success'
                    })
                } else {
                    setAlertData({
                        active: true,
                        title: 'Ocorreu um erro ao subir arquivos.',
                        message: 'Erro ao fazer upload dos arquivos na Análise',
                        type: 'error'
                    })
                }
            }

            // router.push(`/analytics/${data.analyticsId}`);
            return
        } catch (error) {
            console.error('Erro ao verificar a Análise:', error);
            return error
        }
    }

    const handleUpdate = async () => {
        try {
            const response = await fetch('/api/analytics/update', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ analyticsData, customerId: id } as Record<string, unknown>)
            });

            if (!response.ok) {
                setAlertData({
                    active: true,
                    title: 'Erro na atualização.',
                    message: 'Erro ao atualizar a Análise',
                    type: 'error'
                })
                return
            }

            const data = await response.json();

            if (data.success) {
                setAnalyticsData(data.analytics)

                setAlertData({
                    active: true,
                    title: 'Atualizado!',
                    message: 'Informações da Análise atualizadas.',
                    type: 'success'
                })
            }
            return
        } catch (error) {
            console.error('Erro ao verificar a Análise:', error);
            return error
        }
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/analytics/delete?analyticsId=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                setAlertData({
                    active: true,
                    title: 'Ocorreu um erro ao excluir Análise.',
                    message: 'Erro ao excluir Análise',
                    type: 'error'
                })
                return
            }

            const data = await response.json();

            if (data.success) {

                setAlertData({
                    active: true,
                    title: 'Tudo Certo!',
                    message: 'Análise excluída com sucesso!',
                    type: 'success'
                })

                router.push('/analytics')
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <SectionHeader title='Editar Análise' />


            <div className="bg-white rounded py-5 px-6">
                <h1 className="text-gray-900 text-2xl font-bold pb-8">Resumo</h1>

                <div className="flex w-full pb-10 gap-6">
                    <div className="flex gap-1 flex-col pr-5">
                        <span className="text-gray-700">Contas alcançadas:</span>
                        <span className="text-gray-700 font-bold">380</span>
                    </div>

                    <div className="flex gap-1 flex-col pr-5">
                        <span className="text-gray-700">Contas com engajamento:</span>
                        <span className="text-gray-700 font-bold">46</span>
                    </div>

                    <div className="flex gap-1 flex-col pr-5">
                        <span className="text-gray-700">Atividade do perfil:</span>
                        <span className="text-gray-700 font-bold">2</span>
                    </div>
                </div>

                <div className="flex w-full gap-6">
                    <div className="flex gap-1 flex-col pr-5">
                        <span className="text-gray-700">Tipos de Contas Análisadas:</span>
                        <span className="text-gray-700 font-bold">3</span>
                    </div>

                    <div className="flex gap-1 flex-col pr-5">
                        <span className="text-gray-700">Prints análisados:</span>
                        <span className="text-gray-700 font-bold">10</span>
                    </div>
                </div>

                <div className="flex gap-2 pt-5 w-full justify-end">

                    {!newAnalytics && <button
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M2.94 6.34a1 1 0 011.3.33L10 11.58l5.76-4.9a1 1 0 011.62.78v6.76a2 2 0 01-2 2H4a2 2 0 01-2-2V7.45a1 1 0 01.94-1.11z" />
                        </svg>
                        Enviar por email
                    </button>}

                    <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => newAnalytics ? handleCreate() : handleUpdate()}
                    >
                        Salvar
                    </button>
                    {!newAnalytics && <button
                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        onClick={() => handleDelete()}
                    >
                        Excluir
                    </button>}
                </div>
            </div>

            <div className="bg-white rounded py-5 px-6">
                <h1 className="text-gray-900 text-2xl font-bold pb-8">Dados da Análise (opicional)</h1>
                <div className="grid gap-3">

                    <div className="w-full mb-2 relative">
                        <label className="mb-2 text-sm font-medium text-gray-900 sr-only ">Buscar</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" onChange={(e) => setCustomerName(e.target.value)} value={customerName} className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Buscar pelo Cliente" />
                            <button onClick={() => handleCustomers()} className="text-white absolute end-1 bottom-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5">Buscar</button>
                        </div>
                        {customers.length > 0 && <div className="d-flex flex-column w-full py-2 bg-white shadow-lg absolute">
                            {customers.map((item, index) => (
                                <div key={index} className="w-full d-flex hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-200 cursor-pointer px-2 py-1"
                                    onClick={() => {
                                        setCustomerSelected(item)
                                        setCustomers([])
                                        setCustomerName('')
                                        setAnalyticsData({ ...analyticsData, customerId: item._id })
                                    }}>
                                    <span className="text-gray-600">{item.name}</span>
                                </div>
                            ))}
                        </div>}
                    </div>

                    <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">
                            Cliente
                        </label>
                        <input
                            type="text"
                            value={customerSelected?.name || ''}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Busque pelo cliente no campo acima..."
                        />
                    </div>

                    <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">
                            Nome
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={analyticsData.name || ''}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="ex: nome do Projeto"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex gap-2 w-full">
                        <div>
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">
                                Começo:
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                    </svg>
                                </div>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={analyticsData.startDate || ''}
                                    className="px-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                                    placeholder="Select date start"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">
                                Fim:
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                    </svg>
                                </div>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={analyticsData.endDate || ''}
                                    className="px-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                                    placeholder="Select date start"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col">
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 ">
                            Descrição
                        </label>
                        <textarea
                            name="description"
                            value={analyticsData.description || ''}
                            onChange={(e) => setAnalyticsData({ ...analyticsData, description: e.target.value })}
                            rows={4}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Escreva os detalhes da análise...">
                        </textarea>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded py-5 px-6">
                <h1 className="text-gray-900 text-2xl font-bold pb-8">Prints</h1>

                <div className="d-flex px-2 py-2">
                    <Dropzone onFileUpload={async (file) => {
                        const filePreview = URL.createObjectURL(file);
                        const analyticsId = Array.isArray(id) ? id[0] : id || '';
                        // const processedFile = await handleImageProcessing(file);
                        if (newAnalytics) {
                            handleAddFile(file)
                        } else {
                            handleFileUpload({ file, preview: filePreview }, analyticsId)
                        }
                    }
                    } />
                </div>

                <div className="d-flex flex-column gap-2">
                    <h5 className="text-gray-900 text-1xl font-bold pb-2 pt-8">Todos os prints: </h5>

                    <Table>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Imagem</th>
                                <th scope="col" className="px-6 py-3">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {newFiles.map((fileData, index) => (
                                <tr key={index} className="bg-white border-b">
                                    <td className="p-4">
                                        <img
                                            src={fileData.preview}
                                            className="w-16 md:w-32 max-w-full max-h-36 object-cover"
                                            alt={`Preview ${index}`}
                                        />
                                    </td>
                                    <td className="px-6 py-4 cursor-pointer">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-red-600 hover:text-red-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            onClick={() => {
                                                setNewFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
                                                URL.revokeObjectURL(fileData.preview);
                                            }}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )

}

export default AnalyticsEdit