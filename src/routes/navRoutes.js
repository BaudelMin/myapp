import { Route, Routes } from "react-router-dom";
import { useState, useRef } from "react";
import UserContext from "../compoent/UserContext";
import Home from "../pages/home";
import CalculatorPage from "../pages/calculator";
import QEditorWrapper from "../pages/textEditor";
import LogIn from "../pages/login";
import Register from "../pages/register";


function PageRoutes(props){
    const [user, setUser] = useState(null)
    // console.log('PageRoutes props = ', props)
    
    return (
        <div>
            <UserContext.Provider value={{user, setUser}}>
            {/* <Router> */}
                <Routes>
                    <Route path='/' element={<LogIn />}/>
                    <Route path="/user/:id" element={<Home />} />
                    <Route path='/calculator' element={<CalculatorPage />}/>
                    <Route path="/code-editor" element={<QEditorWrapper />}/>
                    <Route path="/register" element={<Register />} />
                </Routes>
            {/* </Router> */}
            </UserContext.Provider>
        </div>
    )
}

export default PageRoutes
