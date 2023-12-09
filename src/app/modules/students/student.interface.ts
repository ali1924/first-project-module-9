export type UserName = {
  firstName: string
  middleName?: string
  lastName: string
}
export type Guardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}
export type LocalGuardian = {
  name: string
  occupation: string
  contactNo: string
}
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB-' | 'AB+' | 'O+' | 'O-'
export type Student = {
  id: string
  name: UserName
  email: string
  gender: 'male' | 'female' | 'other'
  dateOfBirth: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup?: BloodGroup
  presentAddress: string
  permanentAddress: string
  guardian: Guardian
  localGuardian: LocalGuardian
  profileImage?: string
  isActive: 'active' | 'inActive'
}
