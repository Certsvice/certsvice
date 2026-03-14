import { ABI } from '../consts'
import { AbiItem } from 'web3-utils'
import Web3 from 'web3'

export function useWeb3() {
  const rpcUrl = process.env.BLOCKCHAIN_RPC_URL || 'http://localhost:8545'
  const contractAddress = process.env.CONTRACT_ADDRESS || ''
  const web3 = new Web3(rpcUrl)
  const certsvice = new web3.eth.Contract(ABI as AbiItem[], contractAddress)

  async function getBalance(address: string): Promise<string> {
    const balance = await web3.eth.getBalance(address)
    return web3.utils.fromWei(balance, 'ether')
  }

  async function getAccount() {
    const accounts = await web3.eth.getAccounts()
    return accounts[0] ? accounts[0].toLowerCase() : ''
  }

  async function getChain() {
    return await web3.eth.getChainId()
  }

  async function getOwner(): Promise<string> {
    const owner = await certsvice.methods.getOwner().call()
    return owner.toLowerCase()
  }

  async function getUniversity(address: string): Promise<string> {
    return await certsvice.methods.getUniversity(address).call()
  }

  return {
    getBalance,
    getAccount,
    getChain,
    getOwner,
    getUniversity,
  }
}
