import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../role/axiosInstance";
import Footer from "../compoent/footer/Footer";
import registerSchema from "../compoent/validation/regiterValidation";
import { data } from "autoprefixer";

function Register(){
    const handleOnSubmit = async function(values, { setSubmitting, setErrors }){
        console.log('values = ', values)
        await axiosInstance.post('/user/register', {
            data: {
                "username": values.username.toString(),
                "password": values.password.toString(),
                "email": values.email.toString()
            },
            mode:'cors'
        })
        .then( response => {
            console.log('response = ', response)
        })
        .catch(err => {
            setErrors(err.response.data)
        })
        .finally(() => {
            setSubmitting(false)
        })
    }

    return (
        <div className="mt-20 flex flex-row items-center justify-center">
            <div>
            <div className="border-2 m-5 h-400 w-80 bg-lime-100 py-5 flex flex-col items-center justify-center">
                <div><span>SignIn into MyApp</span></div>
                <Formik
                validationSchema={registerSchema}
                    initialValues={
                        {
                            username: "",
                            password: "",
                            email:""
                        }
                    }
                    onSubmit={ handleOnSubmit }
                >
                   {({errors, touched}) => (
                    <Form className="">
                        <div className="m-5">
                            <label>Username:</label>
                            <Field className="ml-3 pl-2" id='username' name='username' placeholder='username' />
                            <span className="text-red-600 text-xs">
                                <ErrorMessage name="username"/>
                            </span>
                        </div>

                        <div>
                            <label className="ml-5">Email:</label>
                            <Field className='ml-6 pl-2' id='email' name='email' placeholder='email'/>
                            <span className="ml-10 text-red-600 text-xs">
                                <ErrorMessage name="email"/>
                            </span>
                        </div>

                        <div className="m-5">
                            <label>Password:</label>
                            <Field className='ml-3 pl-2' id='password' name='password' placeholder='password' />
                            <span className="text-red-600 text-xs">
                                <ErrorMessage name="password"/>
                            </span>
                        </div>

                        {errors.message && (
                                <div className="text-red-600 text-xs">{errors.message}</div>
                            )}

                        <button className="m-2" type="submit" >Sign Up</button>
                    </Form>
                   )}
                </Formik>

                <span>or</span>

                <Link to="/register">
                    <span>Log In</span>
                </Link>

            </div>
            </div>
            <Footer />
        </div>
    )
}

export default Register
