import { z } from 'zod'

const userNameValidationSchema = z.object({
  firstName: z.string({ required_error: 'First name is required' }),
  middleName: z.string().optional(),
  lastName: z.string({ required_error: 'Last name is required' }),
})

const guardianValidationSchema = z.object({
  fatherName: z.string({ required_error: 'Father name is required' }),
  fatherOccupation: z.string({
    required_error: 'Father occupation is required',
  }),
  fatherContactNo: z.string({
    required_error: 'Father contact number is required',
  }),
  motherName: z.string({ required_error: 'Mother name is required' }),
  motherOccupation: z.string({
    required_error: 'Mother occupation is required',
  }),
  motherContactNo: z.string({
    required_error: 'Mother contact number is required',
  }),
})

const localGuardianValidationSchema = z.object({
  name: z.string({ required_error: 'Local guardian name is required' }),
  occupation: z.string({
    required_error: 'Local guardian occupation is required',
  }),
  contactNo: z.string({
    required_error: 'Local guardian contact number is required',
  }),
})

const studentValidationSchema = z.object({
  id: z.string(),
  password: z
    .string()
    .max(20, { message: 'Must be 5 or less characters long' }),
  name: userNameValidationSchema,
  email: z.string({ required_error: 'Email is required' }),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Gender is required',
  }),
  dateOfBirth: z.string(),
  contactNo: z.string({ required_error: 'Contact number is required' }),
  emergencyContactNo: z.string({
    required_error: 'Emergency contact number is required',
  }),
  presentAddress: z.string({ required_error: 'Present address is required' }),
  permanentAddress: z.string({
    required_error: 'Permanent address is required',
  }),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
    required_error: 'Blood group is required',
  }),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImage: z.string(),
  isActive: z.enum(['active', 'inActive'], {
    required_error: 'isActive is required',
  }),
  isDeleted: z.boolean().default(false),
})

export default studentValidationSchema
