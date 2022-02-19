import { ABI } from "consts";
import { AbiItem } from "web3-utils";
import Web3 from "web3";

export function useWeb3() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const eth = web3.givenProvider;
    const certsvice = new web3.eth.Contract(
        ABI as AbiItem[],
        process.env.NEXT_PUBLIC_CONTRACT
    );

    async function getBalance(address: string): Promise<string> {
        const balance = await web3.eth.getBalance(address);
        return web3.utils.fromWei(balance, "ether");
    }

    async function getAccount() {
        const accounts = await web3.eth.getAccounts();
        return accounts[0]
    }

    async function getChain() {
        return await web3.eth.getChainId()
    }

    async function changeChain() {
        await eth.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x3" }],
        });
    }

    async function onAccounstChanged(onChange: () => void) {
        eth.on("accountsChanged", onChange);
    }

    async function getOwner() {
        return await certsvice.methods.getOwner().call()
    }

    async function getUniversity() {
        const account = await getAccount()
        return await certsvice.methods.getUniversity(account).call()
    }

    return { getBalance, getAccount, getChain, changeChain, onAccounstChanged, getOwner, getUniversity }
}