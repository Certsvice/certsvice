import axios from 'axios'
import { Data, Regis, Wallet } from 'types'

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
    console.log(regis)
    const url = `http://localhost:8080/api/signup`
    const res = await axios.post(url, regis)
    return res
  }

  async function createStudent(data: Data, certificateId: string, _id: string) {
    const url = `http://localhost:8080/api/student`
    const res = await axios.post(url, { data, certificateId, _id })
    return res
  }

  async function getUniversitys() {
    const url = `http://localhost:8080/api/university`
    const { data } = await axios.get(url)
    return data
  }

  async function getStudent(id: string) {
    const url = `http://localhost:8080/api/student/${id ?? '1234'}`
    const { data } = await axios.get(url)
    return data
  }

  async function getStudents() {
    const url = `http://localhost:8080/api/student`
    const { data } = await axios.get(url)
    return data
  }

  return { getWallets, getWallet, getUniversitys, signUp, getStudents, getStudent, createStudent }
}
