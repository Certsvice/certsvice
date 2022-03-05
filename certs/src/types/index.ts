export type ContentProps = {
  children: JSX.Element
  extra: JSX.Element
}

export type IconLinkProps = {
  src: string
  text: string
}

export interface Certificate {
  data: Data
  issuer: Issuer
}
export interface Data {
  name: string
  birthdate: string
  birthplace: string
  previousCertificates: string
  institute: string
  studentId: string
  identificationNumber: string
  nationality: string
  addmissionDate: string
  graduationDate: string
  schoolOf: string
  degree: string
  dateOfIssue: string
  certificateId: string
  transcript?: TranscriptEntity[] | null
}
export interface TranscriptEntity {
  name: string
  semester: string
  creditsEarned: number
  totalCreditEarned: number
  gpa: number
  gpax: number
  course?: CourseEntity[] | null
}
export interface CourseEntity {
  courseCode: string
  courseName: string
  credit: number
  grade: string
}
export interface Issuer {
  name: string
  certificateStore: string
  certificateId: string
}
