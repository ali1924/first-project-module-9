import express from 'express'
import { StudentControllers } from './student.controller'

//will call controller function
const router = express.Router()

//create student
router.post('/create-student', StudentControllers.createStudent)
//get all students
router.get('/', StudentControllers.getAllStudents)
//get single student
router.get('/:studentId', StudentControllers.getSingleStudent)
//delete student
router.delete('/:studentId', StudentControllers.deleteStudent)

export const StudentRoutes = router
