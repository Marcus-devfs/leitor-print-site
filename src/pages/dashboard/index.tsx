import { Carousel, SectionHeader } from "@/components"
import ChartBar from "@/components/charts/ChartBar"
import ChartPie from "@/components/charts/ChartPie"
import ChartCard from "@/components/charts/ChartsCard"
import { useAppContext } from "@/context/AppContext"
import { useRouter } from "next/router"
import React from "react"

const Dashboard: React.FC = () => {
    const { userData } = useAppContext()
    const router = useRouter()

    return (
        <div className="px-8 flex flex-col gap-4">
            <SectionHeader title="Seja Bem-Vindo(a)" />
            <div className="flex gap-4 ">

                <div className="flex gap-4 w-full">
                    <div className="flex py-4 w-full px-4 border bg-white flex-col gap-3 rounded-lg border-slate-300 border
                cursor-pointer hover:bg-gray-100 shadow-lg" onClick={() => router.push(`/users/${userData._id}`)}>
                        <h2 className="text-gray-700 font-bold text-xl">Meus Dados</h2>
                        <span className="text-gray-400">Meu Perfil.</span>
                    </div>

                    <div className="flex py-4 px-4 w-full border bg-white flex-col gap-3 rounded-lg border-slate-300 border
                cursor-pointer hover:bg-gray-100 shadow-lg" onClick={() => router.push('/analytics')}>
                        <h2 className="text-gray-700 font-bold text-xl">Análise de Dados</h2>
                        <span className="text-gray-400">Faça sua análise, anexe os prints e receba os dados de forma automatizada.</span>
                    </div>
                    <div className="flex py-4 px-4 w-full border bg-white flex-col gap-3 rounded-lg border-slate-300 border
                cursor-pointer hover:bg-gray-100 shadow-lg" onClick={() => router.push('/users')}>
                        <h2 className="text-gray-700 font-bold text-xl">Meus Clientes</h2>
                        <span className="text-gray-400">Meus Leads de Clientes.</span>
                    </div>

                </div>
            </div>

            <div className="flex gap-2 flex-">
                <ChartCard />
                <ChartPie />
                <ChartBar />
            </div>
        </div>
    )

}

export default Dashboard