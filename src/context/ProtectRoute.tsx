import Authentication from "@/pages/authentication/authentication";
import { useAppContext } from "./AppContext";
import { Loading } from "@/components";
import { ReactNode } from "react";

interface ProtectRouteProps {
    children: ReactNode;
}

export const ProtectRoute: React.FC<ProtectRouteProps> = ({ children }) => {
    const { isAuthenticated, loading } = useAppContext();

    console.log(isAuthenticated)

    if (loading) return <Loading />;
    if (isAuthenticated) return <>{children}</>;
    if (!isAuthenticated && !loading) return <Authentication />;
};
