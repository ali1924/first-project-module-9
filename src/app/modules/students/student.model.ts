import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import {
  StudentMethods,
  StudentModel_I,
  StudentModel_S,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface'
import config from '../../config'
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

const studentSchema = new Schema<TStudent, StudentModel_S>(
  {
    id: { type: String },
    password: { type: String },
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
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
)

//virtual
studentSchema.virtual('fullName').get(function () {
  return `${
    this.name.firstName + ' ' + this.name.middleName + ' ' + this.name.lastName
  }`
})
//pre save middleware/hooks
studentSchema.pre('save', async function (next) {
  // console.log(this, 'Pre hook:Wi will save data.................!!!')
  const user = this //doc
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

//post save middleware/hooks
studentSchema.post('save', function (doc, next) {
  doc.password = ''
  // console.log(this, 'Post hook: We  saved data.....!!!!')
  next()
})

//Query middleware/hooks (find all)
studentSchema.pre('find', function (next) {
  // console.log(this)
  this.find({ isDeleted: { $ne: true } })

  next()
})

studentSchema.pre('aggregate', function (next) {
  // [ { '$match': { id: '1' } } ]
  console.log(this.pipeline())
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })

  next()
})

//custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await StudentModel.findOne({ id })
  return existingUser
}
export const StudentModel = model<TStudent, StudentModel_S>(
  'Student',
  studentSchema,
)
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
