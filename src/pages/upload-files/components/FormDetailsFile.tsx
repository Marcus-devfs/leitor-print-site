import { Dropdown } from "@/components";
import React, { useState } from "react";

const FormDetailsFile: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleSelect = (value: string) => {
        setSelectedOption(value);
        console.log("Selecionado:", value);
    };

    const options = [
        { label: "Opção 1", value: "option1" },
        { label: "Opção 2", value: "option2" },
        { label: "Opção 3", value: "option3" },
    ];

    return (
        <div className="flex flex-col gap-2 px-7 py-8 rounded-pill bg-white shadow rounded-lg absolute right-0 top-0 w-96">
            <div className="mb-3">
                <label htmlFor="influencerEmail" className="block mb-2 text-sm font-medium text-gray-900">
                    Influenciador*
                </label>
                <input
                    type="email"
                    id="influencerEmail"
                    name="influencerEmail"
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
                    options={options}
                    onSelect={handleSelect}
                    value={selectedOption}
                />
            </div>

            <div className="mb-3 flex gap-4 items-center">
                <label htmlFor="format" className="block mb-2 text-sm font-medium text-gray-900">
                    Formato*
                </label>
                <Dropdown
                    title="Selecione uma opção"
                    options={options}
                    onSelect={handleSelect}
                    value={selectedOption}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="campaign" className="block mb-2 text-sm font-medium text-gray-900">
                    Ação / campanha*
                </label>
                <input
                    type="text"
                    id="campaign"
                    name="campaign"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="ação / campanha"
                    required
                />
            </div>

            <div className="mb-3 items-center">
                <label htmlFor="foodFormat" className="block mb-2 text-sm font-medium text-gray-900">
                    Tipo*
                </label>
                 <Dropdown
                    title="Selecione uma opção"
                    options={options}
                    onSelect={handleSelect}
                    value={selectedOption}
                />
            </div>


            <div className="mb-3">
                <label htmlFor="followersCount" className="block mb-2 text-sm font-medium text-gray-900">
                    Número de seguidores*
                </label>
                <input
                    type="number"
                    id="followersCount"
                    name="followersCount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="eX: 250.00"
                    required
                />
            </div>
        </div>
    );
};

export default FormDetailsFile;
