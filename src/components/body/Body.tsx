import { ReactNode } from "react";

interface BodyProps {
    children: ReactNode;
}

export const Body: React.FC<BodyProps> = ({ children }) => {
    return (
        <div className="px-8 flex flex-col gap-4">
            {children}
        </div>
    )
}