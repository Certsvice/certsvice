import axios from 'axios'
import { Wallet } from 'types'

export function useApi() {

    async function getWallets(){
        const url = `http://localhost:8080/api/wallet`
        const { data } = await axios.get(url)
        return data
    }

    return { getWallets }
}