import { useAppContext } from "./AppContext";
import { Loading } from "@/components";
import { ReactNode, useEffect, useState } from "react";
import Home from "@/pages";
import { Navbar } from "@/components/navbar/Navbar";
import { MenuList } from "@/helpers/menu";
import { MenuLadingPage } from "@/helpers/menuLadingPage";
import Authentication from "@/pages/authentication/authentication";
import { useRouter } from "next/router";

interface ProtectRouteProps {
    children: ReactNode;
}

export const ProtectRoute: React.FC<ProtectRouteProps> = ({ children }) => {
    const { isAuthenticated, loading, userData } = useAppContext();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false); // Estado para verificar se está no cliente

    useEffect(() => {
        setIsClient(true); // Atualiza o estado para verdadeiro após a primeira renderização
    }, []);

    // if (loading) return <Loading />;
    if (!isClient) return null; // Retorna null até que o cliente seja verificado

    const isAuthenticationPage = router.asPath === '/authentication';

    return (
        <div className="bg-gray-100 min-h-screen flex w-full">
            <Navbar menu={userData ? MenuList : MenuLadingPage} />
            <div className="flex overflow-auto w-full flex-col gap-8 py-24">
                {isAuthenticated ? (
                    children // Renderiza os filhos se autenticado
                ) : loading ? <Loading /> : isAuthenticationPage ? (
                    // Renderiza a página de autenticação se estiver na página de autenticação
                    <Authentication />
                ) : (
                    // Renderiza a página inicial se não estiver autenticado e não estiver na página de autenticação
                    <div className="flex overflow-auto w-full flex-col gap-8 py-12">
                        <Home />
                    </div>
                )}
            </div>
        </div>
    );
};
