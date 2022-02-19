export interface Wallet {
    _id: string
    address: string
    owner: Owner
    verify: boolean
}

export interface Owner {
    _id: string
    name: string
    code: string
}

export interface WalletColumn {
    _id: string
    address: string
    owner: string
    verify: string
}