import Dropzone from "@/components/dropzone/Dropzone"
import React, { useCallback, useEffect, useRef, useState } from "react"
import FormDetailsFile from "./components/FormDetailsFile";
import { api } from "@/helpers/api";
import { useAppContext } from "@/context/AppContext";
import Tesseract from 'tesseract.js';
import { Button } from "@/components/button/Button";
import { generateRandomId } from "@/helpers";
import Footer from "./components/footer/Footer";


export interface FileWithPreview {
    file: File;
    preview: string;
    fileId: string
    selected: boolean
    extractedText?: string;
    plataform: string
    format: string
    type: string
    influencer: string
    campaign: string
    followersNumber: string
    marca_cliente: string
}

const UploadFiles: React.FC = () => {
    const { setLoading, userData, setAlertData } = useAppContext()
    const [newFiles, setNewFiles] = useState<FileWithPreview[]>([])
    const [showFormFiles, setShowFormFiles] = useState<boolean>(false)
    const [fileSelected, setFileSelected] = useState<string>();
    const [loadingData, setLoadingData] = useState<boolean>(false)
    const [showNewFiles, setShowNewFiles] = useState<boolean>(false)
    const filesDrop = useRef<HTMLDivElement>(null)

    const handleAddFile = (files: File[]) => {
        setLoadingData(true)
        try {

            const fileWithPreview = files.map(file => ({
                file,
                fileId: generateRandomId(),
                preview: URL.createObjectURL(file),
                selected: false,
                influencer: '',
                campaign: '',
                followersNumber: '',
                plataform: '',
                format: '',
                type: '',
                marca_cliente: ''
            }))

            fileWithPreview.forEach(async (fileData: any, index) => {
                try {
                    const result = await Tesseract.recognize(fileData.preview, 'por', {
                        logger: m => console.log(m)
                    });

                    const extractedText = cleanExtractedText(result.data.text);
                    fileData.extractedText = extractedText;

                    // Após extrair o texto, processar para extrair as informações
                    const extractedInfo = await processExtractedText(extractedText);

                    // Atualizar o estado selectedOption com base nas informações extraídas
                    fileData.plataform = extractedInfo.Plataforma || fileData.plataform,
                        fileData.format = extractedInfo.Formato || fileData.format,

                        // Atualizar o estado newFiles com o texto extraído
                        setNewFiles(prevFiles => {
                            const updatedFiles = [...prevFiles];
                            updatedFiles[index] = fileData;
                            return updatedFiles;
                        });
                } catch (error) {
                    console.error('Erro ao processar a imagem:', error);
                }
            });

            setNewFiles(prevFiles => [...prevFiles, ...fileWithPreview]);
            setShowNewFiles(false)
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingData(false)
        }
    };

    const processExtractedText = async (text: string) => {
        // Transformar o texto em um array de palavras, similar ao código Python
        const result = text.toLowerCase().split(/\s+/).map(word => removeAccents(word));
        // Implementar a lógica de extração de dados
        const extractedInfo = await extractInfoFromText(result);

        return extractedInfo;
    };

    // Função para remover acentos de uma string
    const removeAccents = (str: string) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const cleanExtractedText = (text: string) => {
        return text
            .replace(/[^\w\s]/g, '') // Remove todos os caracteres não alfanuméricos exceto espaços
            .replace(/\s+/g, ' ') // Substitui múltiplos espaços por um único
            .trim(); // Remove espaços no início e fim da string
    };

    // Função para verificar se um valor é um número válido
    const isValidNumber = (num: string) => {
        const numStr = num.replace(/[.,\s]/g, '');
        return /^\d+$/.test(numStr);
    };

    // Função principal para extrair informações do texto
    const extractInfoFromText = async (result: string[]) => {
        const extractedInfo: any = {
            Plataforma: null,
            Formato: null,
        };

        // Implementar a lógica similar ao código Python
        if (result.includes('insights') && result.includes('do') && result.includes('reel') || result.includes('interacoes') && result.includes('do') && result.includes('reel')) {
            extractedInfo.Plataforma = 'Instagram';
            extractedInfo.Formato = 'Reels';
            // Extrair outros dados específicos do Reels
        } else if (result.includes('story') || result.includes('interacoes') && result.includes('com') && result.includes('stories') || result.includes('proximo') && result.includes('story') || result.includes('toques') && result.includes('em') && result.includes('figurinhas')) {
            extractedInfo.Plataforma = 'Instagram';
            extractedInfo.Formato = 'Story';
            // Extrair outros dados específicos do Story
        } else if (result.includes('insights') && (result.includes('da') && result.includes('publicacao') || result.includes('dapublicao')) && !result.includes('reacoes')) {
            extractedInfo.Plataforma = 'Instagram';
            extractedInfo.Formato = 'Feed';
            // Extrair outros dados específicos do Feed
        } else if (result.includes('atividade') && (result.includes('do') || result.includes('da')) && (result.includes('tweet') || result.includes('post'))) {
            extractedInfo.Plataforma = 'Twitter';
            extractedInfo.Formato = 'Tweet';
            // Extrair outros dados específicos do Twitter
        } else if (result.includes('insights') && result.includes('da') && result.includes('publicacao') && result.includes('reacoes')) {
            extractedInfo.Plataforma = 'Facebook';
            extractedInfo.Formato = 'Post';
        }
        // Extrair outros dados específicos do TikTok
        else if (((result.includes('analise') || result.includes('anlise')) && result.includes('de') && (result.includes('video') || result.includes('vdeo'))) ||
            (result.includes('total') && result.includes('de') && result.includes('espectadores'))) {
            extractedInfo.Plataforma = 'TikTok';
            extractedInfo.Formato = 'Tiktok';
        }

        else if ((result.includes('conteudo') && result.includes('do') && result.includes('canal')) ||
            (result.includes('painel') && result.includes('do') && result.includes('canal')) ||
            (result.includes('studio')) ||
            (result.includes('ganhos')) ||
            (result.includes('youtube'))) {
            extractedInfo.Plataforma = 'Youtube';
            extractedInfo.Formato = 'Vídeo';
        }

        // Exemplo de extração de dados
        if (result.includes('alcance')) {
            const index = result.indexOf('alcance');
            if (isValidNumber(result[index + 1])) {
                extractedInfo.Alcance = result[index + 1].replace(/[.,]/g, '');
            }
        }

        // Continuar implementando a lógica para extrair outras informações

        return extractedInfo;
    };



    const handleFileUpload = async () => {
        setLoading(true)
        try {
            let ok = true
            if (newFiles.length > 0) {

                for (let file of newFiles) {

                    let query = `?userId=${userData._id}`
                    if (file.campaign) query += `&campaign=${file.campaign}`
                    if (file.followersNumber) query += `&followersNumber=${file.followersNumber}`
                    if (file.format) query += `&format=${file.format}`
                    if (file.influencer) query += `&influencer=${file.influencer}`
                    if (file.plataform) query += `&plataform=${file.plataform}`
                    if (file.type) query += `&type=${file.type}`

                    const fileData = file.file
                    const formData = new FormData()
                    formData?.append('file', fileData, encodeURIComponent(fileData?.name))
                    const response = await api.post(`/file/upload${query}`, formData);
                    const { success } = response.data
                    if (!success) ok = false
                }

                if (ok) {
                    setAlertData({
                        active: true,
                        title: 'Arquivos enviados para processamento!',
                        message: 'Os arquivos foram enviados, e estão sendo processados. Assim que for finalizado, você será avisado por e-mail.',
                        type: 'success'
                    })

                    setNewFiles([])
                    return true
                } else {
                    setAlertData({
                        active: true,
                        title: 'Ocorreu um erro ao enviar arquivos.',
                        message: 'Tente novamente ou entre em contato conosco para obter suporte.',
                        type: 'error'
                    })
                    return true
                }
            } else {
                return false
            }
        } catch (error) {
            console.error('Erro no upload:', error);
            return false
        } finally {
            setLoading(false)
        }
    };


    const handleCheckboxChange = useCallback((index: number, active: boolean) => {
        setNewFiles(prevFiles => {
            const updatedFiles = [...prevFiles];
            updatedFiles[index].selected = active
            return updatedFiles;
        });
    }, []);


    useEffect(() => {
        const handleClickOutSide = (event: MouseEvent) => {
            if ((filesDrop.current && !filesDrop.current.contains(event.target as Node))) {
                setShowNewFiles(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutSide)

        return () => {
            document.addEventListener('mousedown', handleClickOutSide)
        }

    }, [])


    return (
        <div className={`relative`}>
            {loadingData &&
                <div className="flex flex-col items-center justify-center h-screen">
                    {/* <!-- Texto de carregamento --> */}
                    <div className="text-lg font-semibold text-gray-700 mb-4">
                        Carregando arquivos...
                    </div>

                    {/* <!-- Animação de barra de progresso --> */}
                    <div className="relative w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 animate-loading"></div>
                    </div>

                    {/* <!-- Rodapé com um ícone de upload --> */}
                    <div className="mt-4 flex items-center">
                        <svg
                            className="animate-spin h-8 w-8 text-blue-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        <span className="ml-2 text-blue-600">Carregando...</span>
                    </div>
                </div>
            }
            <div>
                {newFiles.length === 0 ?
                    <div className="flex w-full h-full flex-col gap-6">
                        <div className="flex w-full justify-center">
                            <h1 className="text-gray-700 font-light text-2xl text-center max-w-3xl">Agilize o processo e evite erros.
                                <h1>
                                    Faça uploads dos prints de resultados dos influenciadores.
                                </h1></h1>
                        </div>

                        <Dropzone onFileUpload={(files) => handleAddFile(files)} />
                    </div>
                    :
                    <div className={`grid grid-cols-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 pl-6 max-w-[72%] ${(loadingData || showNewFiles) && 'opacity-25'}`}>
                        {newFiles.map((fileData, index) => {
                            const showedDetails = fileData.fileId === fileSelected
                            return (
                                <div key={index} className={`border-b relative flex px-2 py-2 flex-col ${fileData.selected ? "bg-[#FFE5B5]" : "bg-white"
                                    } items-center gap-4 ${showedDetails && 'border-2 border-[#FFE5B5]'} cursor-pointer`}
                                    onClick={(e) => {
                                        if (fileData.fileId !== fileSelected) {
                                            setFileSelected(fileData.fileId)
                                            setShowFormFiles(true)

                                        } else {
                                            setFileSelected('')
                                            setShowFormFiles(false)
                                        }
                                    }}>

                                    {showedDetails &&
                                        <div className="absolute top-[-30px] left-[-5px] px-2 py-2 bg-primary rounded-md flex items-center justify-center">
                                            <span className="text-xs">Selecionado</span>
                                        </div>}

                                    <div className="cursor-pointer w-full flex justify-between gap-2 align-center pb-4 px-2 py-2">

                                        {/* <div className="flex items-center h-5">
                                            <input
                                                id={`file-checkbox-${index}`}
                                                type="checkbox"
                                                checked={fileData.selected}
                                                onChange={(e) => {
                                                    handleCheckboxChange(index, e.target.checked)
                                                }}
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                                            />
                                        </div> */}

                                        <span className="text-gray-600 text-sm max-w-36 truncate whitespace-nowrap">{fileData?.file?.name}</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 bg-red-600 text-white rounded-full px-1 py-1 hover:bg-red-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setShowFormFiles(false)
                                                setNewFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
                                                URL.revokeObjectURL(fileData.preview);
                                            }}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </div>

                                    <img
                                        src={fileData.preview}
                                        className="w-40 md:w-56  max-h-64 object-cover"
                                        alt={`Preview ${index}`}
                                    />
                                </div>
                            )
                        }
                        )}
                    </div>
                }
            </div>

            {(newFiles.length > 0 && showFormFiles && fileSelected) ? (
                <FormDetailsFile
                    handleCancel={() => {
                        setFileSelected('')
                        setShowFormFiles(false)
                    }}
                    fileSelected={newFiles.filter(item => item.fileId === fileSelected)[0]}
                    handleChange={(name, value) => {
                        console.log('name: ', name)
                        console.log('value: ', value)
                        setNewFiles((prevFiles) => {
                            return prevFiles.map((file) =>
                                file.fileId === fileSelected
                                    ? { ...file, [name]: value } : file
                            )
                        })
                    }}
                />
            ) : (
                <div className={`flex flex-col gap-2 px-7 py-8 rounder-pill bg-white shadow rounded-lg absolute right-0 top-20 ${(loadingData || showNewFiles) && 'opacity-25'}`}>
                    <span className="fw-bold text-gray-800 text-lg pb-4">Especificações</span>
                    <li className="text-slate-600">Resolução</li>
                    <li className="text-slate-600">Prints estendidos</li>
                    <li className="text-slate-600">XPTO</li>
                </div>
            )}

            {newFiles.length > 0 &&
                <div className="flex w-full justify-center items-center">
                    <Footer
                        handleUpload={handleFileUpload}
                        handleCancel={() => {
                            setNewFiles([])
                            setShowFormFiles(false)
                        }}
                        setShowNewFiles={setShowNewFiles}
                    />
                </div>}

            {showNewFiles &&
                <div className="flex w-full absolute justify-center item-center top-20">
                    <div className="flex w-full flex-col gap-6 justify-center item-center" ref={filesDrop}>
                        <div className="flex w-full justify-center item-center">
                            <h1 className="text-gray-700 font-light text-2xl text-center max-w-3xl">Agilize o processo e evite erros.
                                <h1>
                                    Faça uploads dos prints de resultados dos influenciadores.
                                </h1>
                            </h1>
                        </div>

                        <Dropzone onFileUpload={(files) => handleAddFile(files)} />
                    </div>
                </div>
            }

        </div>
    )

}


export default UploadFiles