import { Dropdown } from "@/components";
import { Button } from "@/components/button/Button";
import { useAppContext } from "@/context/AppContext";
import React, { ChangeEvent, HtmlHTMLAttributes, SetStateAction, useState } from "react";
import { SelectedOpitions } from "..";



interface FormsProps {
    handleUpload: () => Promise<boolean>
    handleCancel: () => void
    selectedOption: SelectedOpitions
    setSelectedOption: React.Dispatch<SetStateAction<SelectedOpitions>>
}


const FormDetailsFile: React.FC<FormsProps> = ({
    handleUpload,
    handleCancel,
    selectedOption,
    setSelectedOption
}) => {
    const { setLoading, loading } = useAppContext()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption((prevSelected) => ({
            ...prevSelected,
            [event.target.name]: event.target.value
        }))
    }

    const plataform = [
        { label: "Youtube", value: "Youtube" },
        { label: "Instagram", value: "Instagram" },
        { label: "Tiktok", value: "Tiktok" },
    ];

    const format = [
        { label: "Reels", value: "Reels" },
        { label: "Stories", value: "Stories" },
        { label: "Post", value: "Post" },
    ];

    const type = [
        { label: "Alimentação", value: "alimentação" },
        { label: "Ofertas", value: "Ofertas" },
        { label: "Divulgação de produtos", value: "Divulgação de produtos" },
    ];

    return (
        <div className="flex flex-col gap-2 px-7 py-8 rounded-pill bg-white shadow rounded-lg fixed right-0 top-32 w-96">
            <div className="mb-3">
                <label htmlFor="influencerEmail" className="block mb-2 text-sm font-medium text-gray-900">
                    Influenciador*
                </label>
                <input
                    type="email"
                    name="influencer"
                    value={selectedOption.influencer}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="@criador-de-conteúdo"
                    required
                />
            </div>

            <div className="mb-3 flex gap-4 items-center">
                <label htmlFor="platform" className="block text-sm font-medium text-gray-900">
                    Plataforma*
                </label>
                <Dropdown
                    title="Selecione uma opção"
                    options={plataform}
                    onSelect={(value) => setSelectedOption({ ...selectedOption, plataform: value })}
                    value={selectedOption.plataform}
                />
            </div>

            <div className="mb-3 flex gap-4 items-center">
                <label htmlFor="format" className="block mb-2 text-sm font-medium text-gray-900">
                    Formato*
                </label>
                <Dropdown
                    title="Selecione uma opção"
                    options={format}
                    onSelect={(value) => setSelectedOption({ ...selectedOption, format: value })}
                    value={selectedOption.format}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="campaign" className="block mb-2 text-sm font-medium text-gray-900">
                    Ação / campanha*
                </label>
                <input
                    type="text"
                    name="campaign"
                    value={selectedOption.campaign}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="ação / campanha"
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="campaign" className="block mb-2 text-sm font-medium text-gray-900">
                    Marca / Cliente
                </label>
                <input
                    type="text"
                    name="marca_cliente"
                    value={selectedOption.marca_cliente}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Marca / Cliente"
                    required
                />
            </div>

            <div className="mb-3 items-center">
                <label htmlFor="foodFormat" className="block mb-2 text-sm font-medium text-gray-900">
                    Categoria*
                </label>
                <Dropdown
                    title="Selecione uma opção"
                    options={type}
                    onSelect={(value) => setSelectedOption({ ...selectedOption, type: value })}
                    value={selectedOption.type}
                />
            </div>


            <div className="mb-3">
                <label htmlFor="followersCount" className="block mb-2 text-sm font-medium text-gray-900">
                    Número de seguidores*
                </label>
                <input
                    type="number"
                    name="followersNumber"
                    value={selectedOption.followersNumber}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="eX: 250.00"
                    required
                />
            </div>

            <div className="flex w-full justify-end py-2 gap-2">
                <Button deleteButton text="Cancelar" isLoading={loading} onClick={handleCancel} />
                <Button text="Enviar" isLoading={loading} arrowIcon onClick={handleUpload} />
            </div>
        </div>
    );
};

export default FormDetailsFile;
