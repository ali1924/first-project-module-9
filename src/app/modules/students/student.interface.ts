import { Model } from 'mongoose'

export type TUserName = {
  firstName: string
  middleName?: string
  lastName: string
}
export type TGuardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}
export type TLocalGuardian = {
  name: string
  occupation: string
  contactNo: string
}
export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB-'
  | 'AB+'
  | 'O+'
  | 'O-'
export type TStudent = {
  id: string
  password: string
  name: TUserName
  email: string
  gender: 'male' | 'female' | 'other'
  dateOfBirth: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup?: TBloodGroup
  presentAddress: string
  permanentAddress: string
  guardian: TGuardian
  localGuardian: TLocalGuardian
  profileImage?: string
  isActive: 'active' | 'inActive'
  isDeleted: boolean
}

// custom instance method
/*export type StudentMethods = {
  isUserExists(id: string): Promise<TStudent | null>
}
export type StudentModel_I = Model<
  TStudent,
  Record<string, never>,
  StudentMethods
>
*/

//custom static method
export interface StudentModel_S extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>
}
