export interface ConfigType {
    env: string
    isDev: boolean
    port: string
    secrets: Secret
    dbUrl: string
}

export interface Secret {
    jwt: string
    jwtExp: string
}
