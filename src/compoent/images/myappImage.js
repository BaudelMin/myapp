import MyappImage from '../../images/svg/MyApp.svg'

function AppImage(){
    return (
        <div className='flex flex-row items-center justify-center'>
            <img src={MyappImage}/>
        </div>
    )
}

export default AppImage
