import { Link, useParams } from "react-router-dom"
import { useContext } from "react"
import UserContext from "../UserContext"

function ListNavigation(props){
    const params = useParams()
    const { user, setUser } = useContext(UserContext)
    let path = props.path
    return (
        <div className="flex flex-col">
            {props.listData.map((value, index) => {
                // console.log(value, index)
                
                let url_path = path[index];
                if(url_path.includes('user') && params.id){
                    url_path = `/user/${params.id}`;
                }
                if(url_path.includes('user') && user)
                {
                    url_path = `/user/${user.id}`;
                }
                return (
                    <div key={index} className="border-2 my-2">
                    <Link key={index} to={url_path}>
                        <span>{value}</span>
                    </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default ListNavigation
