export interface Wallet {
  _id: string
  address: string
  owner: Owner
  verify: boolean
  updatedAt?: string
  createdAt?: string
}

export interface Regis {
  address: string
  owner: string
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

export interface University {
  _id: string
  name: string
  code: string
}
