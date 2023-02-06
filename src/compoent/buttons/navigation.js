import { Link } from "react-router-dom"

function ListNavigation(props){
    console.log('i am insile list navigation')
    return (
        <div className="flex flex-col">
            {props.listData.map((value, index) => {
                return (
                    <div key={index} className="border-2 my-2">
                    <Link key={index} to={props.path[index]}>
                        <span>{value}</span>
                    </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default ListNavigation
