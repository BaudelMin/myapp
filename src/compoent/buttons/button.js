import classNames from "../../ClassMerger"

const CalButton = (props) => {
    let bval = props.value
    // console.log(props)
    return (
        <button className={
            classNames(props.className)} 
            type={props.type?props.type:'button'} 
            onClick={()=>props.getValue(bval)}>
                {bval}
        </button>
    )
}

export default CalButton
