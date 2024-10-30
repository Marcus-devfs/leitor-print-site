import { Table } from "@/components/table"

export const TableInfluencerDetails: React.FC = () => {
    return (
        <Table>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Marca
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Ação
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Influencer
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Plataforma
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Formato
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Taxa Views
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Engajamento
                    </th>
                    <th scope="col" className="px-6 py-3">
                        % Taxa Engajamento
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Curtidas
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Compartilhamentos
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Comentários
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr className="bg-white border-b  hover:bg-gray-50 dark:hover:bg-gray-200">
                    <td className="px-6 py-4">teste</td>
                    <td className="px-6 py-4">teste</td>
                    <td className="px-6 py-4">teste</td>
                    <td className="px-6 py-4">teste</td>
                    <td className="px-6 py-4">teste</td>
                    <td className="px-6 py-4">teste</td>
                    <td className="px-6 py-4">teste</td>
                    <td className="px-6 py-4">teste</td>
                    <td className="px-6 py-4">teste</td>
                    <td className="px-6 py-4">teste</td>
                    <td className="px-6 py-4">teste</td>
                </tr>
            </tbody>
        </Table>
    )
}