import { TStudent } from './student.interface'
import { StudentModel } from './student.model'

const createStudentIntoDB = async (studentData: TStudent) => {
  // //1. call model.create function and pass student
  // const result = await StudentModel.create(student)
  //built-in static method
  // //   2. return result
  // return result
  //static method

  if (await StudentModel.isUserExists(studentData.id)) {
    throw new Error('User already exists')
  }
  const result = await StudentModel.create(studentData)
  return result
  /*
  // instance method
  const student = new StudentModel(studentData)
  
  if (await student.isUserExists(studentData.id)) {
    throw new Error('User already exists')
  }
  const result = await student.save()

  return result */
}
//getAll students
const getAllStudentsFromDB = async () => {
  //1. get all students from model.find
  const result = await StudentModel.find()
  //2. return result
  return result
}

const getSingleStudentFromDB = async (id: string) => {
  //1.find single student using id from model.findOne(id)
  //   const result = await StudentModel.findOne({ _id: id })
  // const result = await StudentModel.findOne({ id })
  const result = await StudentModel.aggregate([{ $match: { id: id } }])
  //   2. return result
  return result
}

const deleteStudentFromDB = async (id: string) => {
  //1. update student using id and isDeleted field
  const result = await StudentModel.updateOne({ id }, { isDeleted: true })
  return result
}

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
}
