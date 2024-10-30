import { Table } from "@/components/table"

interface TablePlataformProps {
    data: any
}

export const TablePlataform: React.FC<TablePlataformProps> = ({ data = [] }) => {
    // Verifica se `data` tem pelo menos um item e obtém as chaves; caso contrário, `columnNames` será um array vazio.
    const columnNames = data.length > 0 ? Object.keys(data[0]) : []

    console.log('data: ', data)

    return (
        <Table>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border">
                <tr>
                    {columnNames.map((colName) => (
                        <th key={colName} scope="col" className="px-6 py-3">
                            {colName}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((item: any, index: number) => (
                        <tr key={index} className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-200">
                            {columnNames.map((colName) => (
                                <td key={colName} className="px-6 py-4">
                                    {item[colName] || 'N/A'} {/* Exibe o valor ou "N/A" se não houver dados */}
                                </td>
                            ))}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={columnNames.length} className="text-center px-6 py-4">
                            No data available
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}
