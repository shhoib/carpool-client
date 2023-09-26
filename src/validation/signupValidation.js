import * as yup from 'yup'

const passwordRules = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

export const basicSchema = yup.object().shape({
        email:yup.string().email('please enter a valid email').required('required'),
        username:yup.string().required('required'),
        mobileNumber: yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits').required('required'),
        password: yup.string().min(5).matches(passwordRules,
                    {message:"contain 8 Characters,1 Uppercase,1 Lowercase,1 Number and one special case Character"})
                    .required('required'),
        confirmPassword: yup.string().oneOf([yup.ref('password'),null],'passwords are not matching').required('requird')
})