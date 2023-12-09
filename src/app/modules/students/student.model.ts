import { Schema, model } from 'mongoose'
import {
  StudentMethods,
  StudentModel_I,
  StudentModel_S,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface'
const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  middleName: String,
  lastName: { type: String, required: true },
})

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
})
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
})

const studentSchema = new Schema<TStudent, StudentModel_S>({
  id: { type: String },
  name: userNameSchema,
  email: { type: String, required: true },
  gender: ['male', 'female'],
  dateOfBirth: { type: String },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImage: { type: String },
  isActive: ['active', 'inActive'],
})
//custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await StudentModel.findOne({ id })
  return existingUser
}
export const StudentModel = model<TStudent, StudentModel_S>('Student', studentSchema)
/*custom instance model 

studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await StudentModel.findOne({ id })
  return existingUser
}
// 3. Create a Model.
export const StudentModel = model<TStudent, StudentModel_I>(
  'Student',
  studentSchema,
)*/
