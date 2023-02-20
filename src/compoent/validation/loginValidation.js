import * as yup from 'yup'

const loginSchema = yup.object().shape({
    username:yup
        .string('Should contain letters')
        .required("User name required"),
    password:yup
        .string('Should contain letters')
        .min(4, 'At least 4 letters required')
        .max(15, 'At most 15 letters required')
        .required('Password required')
})

export default loginSchema
