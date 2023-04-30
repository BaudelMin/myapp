import { Formik, Form, Field, useField, ErrorMessage } from "formik";
import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../role/axiosInstance";
import UserContext from "../compoent/UserContext";
import Footer from "../compoent/footer/Footer";
import AppImage from "../compoent/images/myappImage";
import loginSchema from "../compoent/validation/loginValidation";
import { data } from "autoprefixer";
import getCookie from "../tokens/DjangoCSRFToken";
// import DjangoCSRFToken from "../tokens/DjangoCSRFToken";
// import axios from "axios";

function LogIn(props){
    // const [resData]
    const { user, setUser } = useContext(UserContext)
    // const [field, meta] = useField(props)
    const history = useNavigate()

    console.log('Cookie = ', getCookie('csrftoken'))
    // const errors = yup.errors
    // const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const handleOnSubmit =  async function(values, { setSubmitting, setErrors }) {
        console.log('values = ', values)
        await axiosInstance.post('/user/login', values, {
            headers:{
                'Content-Type':'application/json',
                'X-CSRFToken': '{{ csrf_token }}'
            }
        })
        // {
        //     data:{
        //         "username":values.username.toString(),
        //         "password":values.password.toString()
        //     },
        //     headers: { 
        //         'Content-Type': 'application/json',
        //         // 'X-CSRFToken':csrftoken
        //  },
        // })
        .then(response => {
            console.log('response = ', response)
            if (response.status == 200 && response.data.status == 'success'){
                let user_data = {
                    "username":response.data.username,
                    "password":response.data.password,
                    'id':response.data.id
                }
                setUser(response.data)
                history(`/user/${response.data.id}`)
            }
            else{
                setErrors(response.data.message)
            }
        })
        .catch(err => {
            console.log('error is ', err)
            // const { response: { data } } = err;
            setErrors(err.response.data);
        })
        .finally(() => {
            setSubmitting(false)
        })
    }
    return (
        <div className="m-16 w-auto  flex items-center justify-center">
            {/* <DjangoCSRFToken /> */}
            <div className="flex flex-col">
            <div><AppImage /></div>
            <div className="border-2 m-5 h-400 w-80 bg-lime-100 py-5 flex flex-col items-center">
                <div><span>LogIn into MyApp</span></div>
                <Formik
                    validationSchema={loginSchema}
                    initialValues={
                        {
                            username: "",
                            password: ""
                        }
                    }
                    onSubmit={ handleOnSubmit }
                >
                   { ({ isSubmitting, errors, touched }) => (
                         <Form className="">
                            <div className="m-5">
                                <label>Username:</label>
                                <Field className="ml-3" id='username' name='username' placeholder='username' />
                                <span className="text-red-600 text-xs">
                                    <ErrorMessage name="username"/>
                                </span>
                            </div>

                            <div className="m-5">
                                <label>Password:</label>
                                <Field className='ml-3' id='password' name='password' placeholder='password' />
                                <span className="text-red-600 text-xs">
                                    <ErrorMessage  name="password" />
                                </span>
                            </div>

                           {errors.message && (
                                <div className="text-red-600 text-xs">{errors.message}</div>
                            )}

                            <button className="m-2" type="submit" >Log In</button>
                        </Form>
                    )}
                </Formik>

                <span>or</span>

                <Link to="/register">
                    <span>Sign Up</span>
                </Link>

            </div>
            </div>
            <Footer />
        </div>
    )
}


export default LogIn
