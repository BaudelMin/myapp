import * as yup from 'yup'

const registerSchema = yup.object().shape({
    username:yup
        .string()
        .required('Username required'),
    email: yup
        .string()
        .email("Enter email correctly")
        .required('Email required'),
    password: yup
        .string()
        .min(4, 'At least 4 letters required')
        .max(15, 'At most 15 letters required')
        .required('Password required')
})

export default registerSchema
