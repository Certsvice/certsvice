import { dayjs } from 'helpers/datetime'
import { useEffect, useState } from 'react'
import { useGuardContext } from '../components/GuardRoute'

export default function Login() {
  type Action = 'request' | 'fill'

  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [ref, setRef] = useState('')
  const [action, setAction] = useState<Action>('request')
  const [isValid, setIsValid] = useState(true)
  const [time, setTime] = useState(300)
  const [isActive, setIsActive] = useState(false)
  const { login } = useGuardContext()
  const [loading, setLoading] = useState(false)

  async function handleAuth() {
    if (!email) {
      alert('Email is require')
    } else {
      try {
        //const token = await getUser(email, otp)
        await login('2f91ed15e4454adc9da504f39adb23ace161b069d3d4b07dca6809efc89be681')
      } catch {
        alert('Login fail')
      }
    }
  }

  async function handleSendOtp() {
    setLoading(true)
    try {
      //const { ref } = await sendOtp(email)
      const ref = 'A1GH86'
      if (ref) {
        setRef(ref)
        setAction('fill')
      } else {
        setAction('request')
      }
    } catch {
      alert('Cannot send otp')
      setAction('request')
    }
    setLoading(false)
    setIsActive(true)
  }

  function handleEmail(e: string) {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

    regex.test(e) || e === '' ? setIsValid(true) : setIsValid(false)
    setEmail(e)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      isActive && setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : prevTime))
    }, 1000)
    return () => clearInterval(interval)
  }, [isActive])

  return (
    <div className="max-w-screen-sm m-auto mt-24">
      {action === 'request' && (
        <>
          <h1 className="text-2xl font-bold">เข้าสู่ระบบ</h1>
          <div className="py-3 text-sm font-light">กรอก Email เพื่อรับหมายเลข OTP</div>
          <div className="p-20 mt-4 bg-gray-200 rounded-lg shadow-md">
            <div className="flex justify-center space-x-2">
              <input
                placeholder="อีเมล"
                className={`w-64 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-1 ${
                  isValid ? 'focus:ring-blue-300' : 'focus:ring-red-500'
                } ${!isValid && 'ring-1 ring-red-500'}`}
                value={email}
                onChange={({ currentTarget: { value } }) => handleEmail(value)}
              />
              <button
                disabled={!isValid || email === ''}
                className={`px-4 py-2 text-white border rounded-lg ${
                  !(!isValid || email === '') ? 'bg-blue-500' : 'bg-gray-300'
                }`}
                onClick={handleSendOtp}
              >
                {loading ? (
                  <div>
                    <i className="mr-2 fa fa-circle-o-notch fa-spin"></i>ส่ง OTP
                  </div>
                ) : (
                  'ส่ง OTP'
                )}
              </button>
            </div>
          </div>
        </>
      )}
      {action === 'fill' && (
        <>
          <h1 className="text-2xl font-bold">ยืนยันหมายเลข OTP</h1>
          <div className="py-3 text-sm font-light">กรอกหมายเลข OTP ที่มีรหัสอ้างอิง {ref}</div>
          <div className="p-20 mt-4 bg-gray-200 rounded-lg shadow-md">
            <div className="flex justify-center space-x-2">
              <div className="flex mt-1 rounded-md">
                <input
                  placeholder="OTP"
                  className="w-48 px-4 py-2 border border-gray-300 rounded-l-lg outline-none"
                  value={otp}
                  onChange={({ currentTarget: { value } }) => setOtp(value)}
                />
                <span
                  className={`inline-flex items-center px-3 text-sm text-gray-500 border border-r-0 border-gray-300 rounded-r-lg bg-gray-50 ${
                    time <= 0 && 'text-red-500'
                  }`}
                >
                  {dayjs(new Date().setHours(0, 0, 0, 0)).set('seconds', time).format('mm:ss')}
                </span>
                <button className="px-6 mx-4 text-white bg-blue-500 border rounded-lg" onClick={handleAuth}>
                  ยืนยัน
                </button>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <div>ไม่ได้รับหมายเลข OTP ?</div>
              <a
                className="pl-4 text-blue-500 underline"
                onClick={() => {
                  handleSendOtp()
                  setTime(300)
                  setOtp('')
                }}
              >
                ส่งอีกครั้ง
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
