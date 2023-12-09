import { Student } from './student.interface'
import { StudentModel } from './student.model'

const createStudentIntoDB = async (student: Student) => {
  //1. call model.create function and pass student
  const result = await StudentModel.create(student)
  //   2. return result
  return result
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
  const result = await StudentModel.findOne({ id })
  //   2. return result
  return result
}

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
}
