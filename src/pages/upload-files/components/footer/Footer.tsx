import { Button } from "@/components/button/Button";
import { useAppContext } from "@/context/AppContext";
import React, { SetStateAction } from "react";



interface FormsProps {
    handleUpload: () => Promise<boolean>
    handleCancel: () => void
    setShowNewFiles: React.Dispatch<SetStateAction<boolean>>
    setShowGroupFiles: React.Dispatch<SetStateAction<boolean>>
    setShowCheckboxFile: React.Dispatch<SetStateAction<boolean>>
    setShowFormFiles: React.Dispatch<SetStateAction<boolean>>
    showCheckboxFile: boolean
    showGroupFiles: boolean
    handleGroupFiles: () => void
}


const Footer: React.FC<FormsProps> = ({
    handleUpload,
    handleCancel,
    setShowNewFiles,
    setShowGroupFiles,
    setShowCheckboxFile,
    setShowFormFiles,
    showCheckboxFile,
    showGroupFiles,
    handleGroupFiles
}) => {
    const { loading } = useAppContext()

    return (
        <div className="flex gap-2 justify-center items-center px-12 py-2 rounded-pill bg-gray-700 shadow rounded-lg fixed bottom-4">
            {(!showCheckboxFile && !showGroupFiles) && <div className="flex items-center justify-center gap-3 border py-2.5 px-5 rounded-lg cursor-pointer" onClick={() => setShowNewFiles(true)}>
                <span className="text-white">Carregar mais arquivos</span>
                <img
                    src="./icons/upload-icon.png"
                    className="h-6 h-6"
                    alt="upload-logo"
                />
            </div>}

            {!showGroupFiles && <div className="flex items-center justify-center gap-3 border py-2.5 px-5 rounded-lg cursor-pointer"
                onClick={() => {
                    setShowCheckboxFile(!showCheckboxFile)
                    setShowFormFiles(!showCheckboxFile)
                    }}>
                <span className="text-white">{showCheckboxFile ? 'Cancelar Multiplos' : 'Selecionar Multiplos'}</span>
                {!showCheckboxFile ?
                    <img
                        src="./icons/checkbox.png"
                        className="h-6 h-6"
                        alt="upload-logo"
                    />
                    :
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 bg-red-600 text-white rounded-full px-1 py-1 hover:bg-red-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                }
            </div>}
            {!showCheckboxFile && <div className="flex items-center justify-center gap-3 border py-2.5 px-5 rounded-lg cursor-pointer" onClick={() => setShowGroupFiles(!showGroupFiles)}>
                <span className="text-white">{showGroupFiles ? 'Cancelar Agrupamento' : 'Agrupar Arquivos'}</span>
                {showGroupFiles ?
                    (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 bg-red-600 text-white rounded-full px-1 py-1 hover:bg-red-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <img
                            src="./icons/stack.png"
                            className="h-6 h-6"
                            alt="upload-logo"
                        />
                    )}
            </div>}

            {(!showCheckboxFile && showGroupFiles) && <Button text="Agrupar" isLoading={loading} arrowIcon onClick={handleGroupFiles} />}
            {(!showGroupFiles && !showCheckboxFile) && <Button deleteButton text="Cancelar" isLoading={loading} onClick={handleCancel} />}
            {(!showGroupFiles && !showCheckboxFile) && <Button text="Salvar Todos os Arquivos" isLoading={loading} arrowIcon onClick={handleUpload} />}
        </div>
    );
};

export default Footer;
