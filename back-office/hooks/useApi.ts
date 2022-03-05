import axios from 'axios'
import { Regis, Wallet } from 'types'

export function useApi() {
  async function getWallets() {
    const url = `http://localhost:8080/api/wallet`
    const { data } = await axios.get(url)
    return data
  }

  async function getWallet(id: string) {
    const url = `http://localhost:8080/api/wallet/${id ?? '1234'}`
    const { data } = await axios.get(url)
    return data
  }

  async function signUp(regis: Regis) {
    const url = `http://localhost:8080/api/signup`
    const res = await axios.post(url, { body: regis })
    return res
  }

  async function getUniversitys() {
    const url = `http://localhost:8080/api/university`
    const { data } = await axios.get(url)
    return data
  }

  return { getWallets, getWallet, getUniversitys, signUp }
}
