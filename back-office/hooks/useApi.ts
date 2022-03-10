import axios from 'axios'
import { Data, Regis, Wallet } from 'types'

export function useApi() {
  const apiUri = `${process.env.NEXT_PUBLIC_API_URI}`
  async function getWallets() {
    const url = `${apiUri}/api/wallet`
    const { data } = await axios.get(url)
    return data
  }

  async function getWallet(id: string) {
    const url = `${apiUri}/api/wallet/${id ?? '1234'}`
    const { data } = await axios.get(url)
    return data
  }

  async function signUp(regis: Regis) {
    console.log(regis)
    const url = `${apiUri}/api/signup`
    const res = await axios.post(url, regis)
    return res
  }

  async function createStudent(data: Data, certificateId: string, _id: string) {
    const url = `${apiUri}/api/student`
    const res = await axios.post(url, { data, certificateId, _id })
    return res
  }

  async function getUniversitys() {
    const url = `${apiUri}/api/university`
    const { data } = await axios.get(url)
    return data
  }

  async function getStudent(id: string) {
    const url = `${apiUri}/api/student/${id ?? '1234'}`
    const { data } = await axios.get(url)
    return data
  }

  async function getStudents(id: string, year: string) {
    const url = `${apiUri}/api/student/${id ?? '123'}`
    const { data } = await axios.post(url, { year })
    return data
  }

  return { getWallets, getWallet, getUniversitys, signUp, getStudents, getStudent, createStudent }
}
