import { ABI, Role } from '../consts'
import { AbiItem } from 'web3-utils'
import Web3 from 'web3'

export function useWeb3() {
  const web3 = new Web3('https://ropsten.infura.io/v3/e448162f6a7647a7bfbbf867d0e90b10')
  const eth = web3.givenProvider
  const certsvice = new web3.eth.Contract(ABI as AbiItem[], '0x976e9a7EDB1968BAd7bE4D27844B186fA946B046')

  async function getBalance(address: string): Promise<string> {
    const balance = await web3.eth.getBalance(address)
    return web3.utils.fromWei(balance, 'ether')
  }

  async function getAccount() {
    const accounts = await web3.eth.getAccounts()
    return accounts[0] ? accounts[0].toLowerCase() : ''
  }

  async function getAccountInject() {
    const accounts = await eth.request({ method: 'eth_requestAccounts' })
    return accounts[0] ? accounts[0].toLowerCase() : ''
  }

  async function getChain() {
    return await web3.eth.getChainId()
  }

  async function changeChain() {
    await eth.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x3' }],
    })
  }

  // async function onAccounstChanged(onChange: () => void) {
  //   eth.on('accountsChanged', onChange)
  // }

  // async function onChainChanged(onChange: () => void) {
  //   eth.on('chainChanged', onChange)
  // }

  async function getOwner(): Promise<string> {
    const owner = await certsvice.methods.getOwner().call()
    return owner.toLowerCase()
  }

  async function getUniversity(): Promise<string> {
    const account = await getAccount()
    return await certsvice.methods.getUniversity(account).call()
  }

  async function getToken(message: string, role: Role): Promise<string> {
    const msgParams = JSON.stringify({
      message,
      role,
    })
    const from = await getAccount()
    const params = [from, msgParams]
    const method = 'personal_sign'
    return await eth.request({
      method,
      params,
      from,
    })
  }

  async function recoverToken(message: string, role: Role, signature: string) {
    const msgParams = JSON.stringify({
      message,
      role,
    })
    return await web3.eth.personal.ecRecover(msgParams, signature)
  }

  return {
    getBalance,
    getAccount,
    getChain,
    changeChain,
    getOwner,
    getUniversity,
    getAccountInject,
    getToken,
    recoverToken,
  }
}
