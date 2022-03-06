export interface ConfigType {
    env: string
    isDev: boolean
    port: string
    secrets: Secret
    dbUrl: string
}

export interface Secret {
    jwt: string
    jwtExp: string
}

export interface Certificate {
  data: Data;
  certificateId: string;
  issuer: string;
  _id: string;
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
