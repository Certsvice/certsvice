export interface Wallet {
  _id: string
  address: string
  owner: Owner
  verify: boolean
  updatedAt?: string
  createdAt?: string
}

export interface Regis {
  address: string
  owner: string
}

export interface Owner {
  _id: string
  name: string
  code: string
}

export interface WalletColumn {
  _id: string
  address: string
  owner: string
  verify: string
}

export interface University {
  _id: string
  name: string
  code: string
}

export interface Data1 {
  data: Data
}


export interface Certificate {
  _id: string;
  data: Data;
  certificateId: string;
  issuer: string;
  createdAt: string;
  updatedAt: string;
}
export interface Data {
  name: string;
  university: string;
  studentId: string;
  identificationNumber: string;
  addmissionDate: string;
  graduationDate: string;
  program: string;
  faculty: string;
  degree: string;
  degreeName: string;
  issuedOn: string;
  transcript?: (TranscriptEntity)[] | null;
}
export interface TranscriptEntity {
  name: string;
  semester: string;
  creditsEarned: number;
  totalCreditEarned: number;
  gpa: number;
  gpax: number;
  course?: (CourseEntity)[] | null;
}
export interface CourseEntity {
  courseCode: string;
  courseName: string;
  credit: number;
  grade: string;
}
