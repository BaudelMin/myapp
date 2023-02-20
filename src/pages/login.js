import { Formik, Form, Field, useField, ErrorMessage } from "formik";
import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../role/axiosInstance";
import UserContext from "../compoent/UserContext";
import Footer from "../compoent/footer/Footer";
import AppImage from "../compoent/images/myappImage";
import loginSchema from "../compoent/validation/loginValidation";
// import axios from "axios";

function LogIn(props){
    // const [resData]
    const { user, setUser } = useContext(UserContext)
    // const [field, meta] = useField(props)
    const history = useNavigate()
    // const errors = yup.errors
    const handleOnSubmit =  async function(values) {
        await axiosInstance.post('/user/login', {
            data:{
                "username":values.username.toString(),
                "password":values.password.toString()
            }
        })
        .then(response => {
            console.log('response = ', response)
            if (response.status == 200 && response.data.status == 'matched'){
                // let user_data = {
                //     "username":values.username.toString(),
                //     "password":values.password.toString(),
                //     'id':response.data.id
                // }
                setUser(response.data)
                history(`/user/${response.data.id}`)
            }
        })
        .catch(err => console.log('error = ', err))
    }
    return (
        <div className="m-16 w-auto  flex items-center justify-center">
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

                        <button className="m-2" type="submit" >Log In</button>
                    </Form>
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
