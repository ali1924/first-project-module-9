import { Request, Response } from 'express'
import { StudentServices } from './student.services'
import studentValidationSchema from './student.validation'

const createStudent = async (req: Request, res: Response) => {
  try {
    //1. get data from client body
    const { student: studentData } = req.body
    // 2. parse data into validation
    const parseData = studentValidationSchema.parse(studentData)
    //   2. will call service function to send this data in DB
    const result = await StudentServices.createStudentIntoDB(parseData)
    console.log(result)
    //3. res send
    res.status(200).send({
      success: true,
      message: 'Student created successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    })
  }
}

const getAllStudents = async (req: Request, res: Response) => {
  try {
    // 1.call service function to get all student
    const result = await StudentServices.getAllStudentsFromDB()
    //   2.res send
    res.status(200).send({
      success: true,
      message: 'Students are retrieve successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    })
  }
}

//single student
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    // 1.get id from client side using req.params.id
    const { studentId } = req.params
    // 2. call service function using id
    const result = await StudentServices.getSingleStudentFromDB(studentId)
    // 3.res send
    res.status(200).send({
      success: true,
      message: 'Student retrieve successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    })
  }
}
//delete student
const deleteStudent = async (req: Request, res: Response) => {
  try {
    //1.get id from client side using req.params.id
    const { studentId } = req.params
    // 2.call service function using id
    const result = await StudentServices.deleteStudentFromDB(studentId)
    // 3. res send
    res.status(200).send({
      success: true,
      message: 'Student deleted successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    })
  }
}
export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
}
