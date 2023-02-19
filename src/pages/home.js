import MainWrapper from "../wrapper/Wrapper"
import { useState, useEffect, useContext } from "react"
import axiosInstance from "../role/axiosInstance"
import { useParams } from "react-router-dom"
import UserContext from "../compoent/UserContext"

function Home(){
    // const [user, setUser] = useState(null)
    const params = useParams()
    const {user, setUser} = useContext(UserContext)
    // console.log('someting ', user, setUser)
    // const [userInfo, setUserInfo] = useState(null)
    useEffect(() => {
        console.log('user = ', user)
        // if ( !user ){
        //     axiosInstance.get(`/user/${params.id}`)
        //     .then(response => {
        //         setUserInfo(response.data)
        //     })
        //     .catch(err => console.log('error = ', err));
        // }
    })
    return (
        <>
        <MainWrapper>
            {user?(
                <div className="flex flex-col">
                    <div className="flex flex-row">
                        <div><span>Username</span>: {user.username}</div>
                    </div>
                    <div className="flex flex-row">
                        <div><span>Email</span>: {user.email}</div>
                    </div>
                </div>
            ):
            <span>Guest User</span>}
        </MainWrapper>
        </>
    )
}

export default Home
