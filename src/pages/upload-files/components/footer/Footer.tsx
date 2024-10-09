import { Button } from "@/components/button/Button";
import { useAppContext } from "@/context/AppContext";
import React, { SetStateAction } from "react";



interface FormsProps {
    handleUpload: () => Promise<boolean>
    handleCancel: () => void
    setShowNewFiles: React.Dispatch<SetStateAction<boolean>>
}


const Footer: React.FC<FormsProps> = ({
    handleUpload,
    handleCancel,
    setShowNewFiles
}) => {
    const { loading } = useAppContext()

    return (
        <div className="flex gap-2 justify-center items-center px-12 py-2 rounded-pill bg-gray-700 shadow rounded-lg fixed bottom-4">
            <div className="flex items-center justify-center gap-3 border py-2.5 px-5 rounded-lg cursor-pointer" onClick={() => setShowNewFiles(true)}>
                <span className="text-white">Carregar mais arquivos</span>
                <img
                    src="./icons/upload-icon.png"
                    className="h-6 h-6"
                    alt="upload-logo"
                />
            </div>
            <Button deleteButton text="Cancelar" isLoading={loading} onClick={handleCancel} />
            <Button text="Salvar Todos os Arquivos" isLoading={loading} arrowIcon onClick={handleUpload} />
        </div>
    );
};

export default Footer;
