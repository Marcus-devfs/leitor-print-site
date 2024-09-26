import { SectionHeader } from "@/components"
import Dropzone from "@/components/dropzone/Dropzone"
import { Table, TableDropdownMenu, TableSearchInput } from "@/components/table"
import { useAppContext } from "@/context/AppContext"
import { AnalyticsObjectData } from "@/helpers/types"
import { randomUUID } from "crypto"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

const UploadFiles: React.FC = () => {
    const { setAlertData } = useAppContext()
    const router = useRouter()

    return (
        <div className="relative">
            <div className="flex w-full h-full flex-col gap-6">
                <div className="flex w-full justify-center">
                    <h1 className="text-gray-700 font-light text-2xl text-center max-w-3xl">Agilize o processo e evite erros.
                        <h1>
                            Faça uploads dos prints de resultados dos influenciadores.
                        </h1></h1>
                </div>

                <Dropzone onFileUpload={(file) => console.log(file)} />
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