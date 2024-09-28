import Dropzone from "@/components/dropzone/Dropzone"
import React, { useCallback, useState } from "react"
import FormDetailsFile from "./components/FormDetailsFile";

interface FileWithPreview {
    file: File;
    preview: string;
    selected: boolean
}

const UploadFiles: React.FC = () => {
    const [newFiles, setNewFiles] = useState<FileWithPreview[]>([])

    const handleAddFile = (files: File[]) => {
        const fileWithPreview = files.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            selected: false
        }))

        setNewFiles((prevFiles) => [...prevFiles, ...fileWithPreview]);
    };

    const handleCheckboxChange = useCallback((index: number, active: boolean) => {
        setNewFiles(prevFiles => {
            const updatedFiles = [...prevFiles];
            updatedFiles[index].selected = active
            return updatedFiles;
        });
    }, []);

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

                        <Dropzone onFileUpload={(files) => handleAddFile(files)} />
                    </div>
                    :
                    <div className="flex gap-4 px-8">
                        {newFiles.map((fileData, index) => (
                            <div key={index} className={`border-b flex px-2 py-2 flex-col ${fileData.selected ? "bg-[#FFE5B5]" : "bg-white"
                                } items-center gap-4`}>

                                <div className="cursor-pointer w-full flex justify-between gap-2 align-center pb-4 px-2 py-2">

                                    <div className="flex items-center h-5">
                                        <input
                                            id={`file-checkbox-${index}`}
                                            type="checkbox"
                                            checked={fileData.selected}
                                            onChange={(e) => {
                                                handleCheckboxChange(index, e.target.checked)
                                                console.log(e.target.checked)
                                            }}
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                                        />
                                    </div>

                                    <span className="text-gray-600 text-sm">{fileData?.file?.name}</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 bg-red-600 text-white rounded-full px-1 py-1 hover:bg-red-400"
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
                                    className="w-40 md:w-56  max-h-64 object-contain"
                                    alt={`Preview ${index}`}
                                />
                            </div>
                        ))}
                    </div>
                }
            </div>

            {newFiles.length > 0 ? (
                <FormDetailsFile />
            ) : (
                <div className="flex flex-col gap-2 px-7 py-8 rounder-pill bg-white shadow rounded-lg absolute right-0 top-20">
                    <span className="fw-bold text-gray-800 text-lg pb-4">Especificações</span>
                    <li className="text-slate-600">Resolução</li>
                    <li className="text-slate-600">Prints estendidos</li>
                    <li className="text-slate-600">XPTO</li>
                </div>
            )}

        </div>
    )

}


export default UploadFiles