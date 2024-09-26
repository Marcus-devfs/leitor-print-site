import { SectionHeader } from "@/components"
import Dropzone from "@/components/dropzone/Dropzone"
import { Table, TableDropdownMenu, TableSearchInput } from "@/components/table"
import { useAppContext } from "@/context/AppContext"
import { AnalyticsObjectData } from "@/helpers/types"
import { randomUUID } from "crypto"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

interface FileWithPreview {
    file: File;
    preview: string;
}

const UploadFiles: React.FC = () => {
    const [newFiles, setNewFiles] = useState<FileWithPreview[]>([])
    const { setAlertData } = useAppContext()
    const router = useRouter()

    console.log(newFiles)

    const handleAddFile = (file: File) => {
        const filePreview = URL.createObjectURL(file);
        setNewFiles((prevFiles) => [...prevFiles, { file, preview: filePreview }]);
    };

    return (
        <div className="relative">
            <div>
                {newFiles.length === 0 ?
                    <div className="flex w-full h-full flex-col gap-6">
                        <div className="flex w-full justify-center">
                            <h1 className="text-gray-700 font-light text-2xl text-center max-w-3xl">Agilize o processo e evite erros.
                                <h1>
                                    Faça uploads dos prints de resultados dos influenciadores.
                                </h1></h1>
                        </div>

                        <Dropzone onFileUpload={(file) => handleAddFile(file)} />
                    </div>
                    :
                    <div className="flex gap-2 px-8">
                        {newFiles.map((fileData, index) => (
                            <div key={index} className="bg-white border-b flex px-2 py-2 flex-col">

                                <div className="cursor-pointer w-full flex justify-between gap-2 align-center">
                                    <span className="text-gray-600 text-sm">{fileData?.file?.name}</span>
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
                                </div>

                                <img
                                    src={fileData.preview}
                                    className="w-16 md:w-32  max-h-36 object-cover"
                                    alt={`Preview ${index}`}
                                />
                            </div>
                        ))}
                    </div>
                }
            </div>

            <div className="flex flex-col gap-2 px-7 py-8 rounder-pill bg-white shadow rounded-lg absolute right-0 top-20">
                <span className="fw-bold text-gray-800 text-lg pb-4">Especificações</span>
                <li className="text-slate-600">Resolução</li>
                <li className="text-slate-600">Prints estendidos</li>
                <li className="text-slate-600">XPTO</li>
            </div>

        </div>
    )

}

export default UploadFiles