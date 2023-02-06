import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import CalculatorPage from "../pages/calculator";
import QEditorWrapper from "../pages/textEditor";


function PageRoutes(props){
    console.log('PageRoutes props = ', props)
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/calculator' element={<CalculatorPage />}/>
                    <Route path="/code-editor" element={<QEditorWrapper />}/>
                </Routes>
            </Router>
        </div>
    )
}

export default PageRoutes
