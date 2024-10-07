export interface UserDataObject {
    _id?: string
    name: string | null
    email: string | null
    phone: string | null
    password?: string | null
    confirmPassword?: string | null
    permissions: string[]
}


export interface CustomerDataObject {
    _id?: string | null
    name: string | null
    email: string | null
    phone: string | null
    company: string | null
    canal?: string | null
    revenue?: string | null
}


export interface AnalyticsObjectData {
    _id?: string | null
    name: string | null
    customerId?: string | null
    userId: string | null
    startDate: string | null
    endDate: string | null
    description: string | null
    files: string[]
}

export interface FilesFromAnalytics {
    name: string,
    size: number,
    key: string,
    alt: string,
    url: string,
    userId: string
}

export interface FilesAnalyticsObjectData {
    _id: string | null
    createdAt: string
    updatedAt: string
    keyFile: String,
    influencer: string
    plataform: string
    format: string
    campaign: string
    type: string
    followersNumber: number
    impressoes: number
    visualizacoes: number
    alcance: number
    seguidores_alcancados: number
    nao_seguidores_integram: number
    visualizacoes_completas: number
    taxa_retencao: number
    tempo_medio_visualizacao: number
    taxa_for_you: number
    cliques_link: number
    clique_arroba: number
    clique_hashtag: number
    avancar: number
    voltar: number
    sair: number
    proximo_story: number
    visitas_perfil: number
    comecaram_seguir: number
    tempo_stories: number
    curtidas: number
    salvamentos: number
    compartilhamentos: number
    comentarios: number
    userId: string
    files: FilesFromAnalytics[] | []
}