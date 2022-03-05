import { Certificate } from 'src/types'

type Props = {
  certificate: Certificate
}
export default function CertificatePage({ certificate }: Props) {
  const { data } = certificate
  return (
    <div
      className="container"
      style={{
        border: '8px solid #44476a',
        height: '100%',
        width: '100%',
        color: '#44476a',
      }}
    >
      <img src="./Certificate.svg"></img>
      <div className="centered">
        <h1 className=" text-7xl tracking-widest mb-16">CERTSVICE</h1>
        <div className="thaiFont">
          <h4 className="mb-6">ขอมอบประกาศนียบัตรฉบับนี้เพื่อแสดงว่า</h4>
          <h2 className="mb-6">{data.name}</h2>
          <h4>
            ได้รับการตรวจสอบยืนยันว่าไฟล์ผลการเรียนที่นำมาตรวจสอบนั้นมีความถูกต้องสมบูรณ์และไม่ได้ผ่านการแก้ไขแต่อย่างใด
          </h4>
        </div>
        <div className="thaiFont flex flex-row items-center align-middle mt-12">
          <div className=" mr-auto">
            <h5>ลายเซ็นต์</h5>
            <h5>ลายเซ็นต์</h5>
          </div>
          <div>
            <h5>Date {data.issuedOn}</h5>
          </div>
        </div>
      </div>
    </div>
  )
}
