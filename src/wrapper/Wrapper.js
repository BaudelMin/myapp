import ListNavigation from "../compoent/buttons/navigation";
import UserContext from "../compoent/UserContext";
import { useContext } from "react";
import configData from "../config/config";
import Footer from "../compoent/footer/Footer";
import { Navigate } from "react-router-dom";

function MainWrapper({children}){
    const { listData, pathList } = configData
    // console.log('mainwrapter children = ', children)
    const { user } = useContext(UserContext)
    return (
        <div className="h-600 mt-5 mx-20  w-600">
            {!user && <Navigate to='/' />}
            <div className="flex flex-row">
                <div className="mx-5 w-1/6 h-screen">
                    <ListNavigation
                        listData={listData}
                        path={pathList}
                    />
                </div>
                <div className="ml-5 border-2 w-5/6 h-fit">
                    {children}
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default MainWrapper
