import { Formik, Form, Field } from "formik";
import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../role/axiosInstance";
import UserContext from "../compoent/UserContext";
// import axios from "axios";

function LogIn(){
    // const [resData]
    const { user, setUser } = useContext(UserContext)
    const history = useNavigate()
    return (
        <div className="border-2 m-5 h-400 w-80 flex flex-col">
            <Formik
                initialValues={
                    {
                        username: "",
                        password: ""
                    }
                }
                onSubmit={
                    async (values) => {
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
                }
            >
                <Form className="">
                    <div className="m-2">
                    <label>Username:</label>
                    <Field className="ml-3" id='username' name='username' placeholder='username' />
                    </div>

                    <div className="m-2">
                    <label>Password:</label>
                    <Field className='ml-3' id='password' name='password' placeholder='password' />
                    </div>

                    <button className="m-2" type="submit" >Log In</button>
                </Form>
            </Formik>

            <span>or</span>

            <Link to="/register">
                <span>Sign Up</span>
            </Link>

        </div>
    )
}


export default LogIn
