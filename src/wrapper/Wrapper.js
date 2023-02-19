import ListNavigation from "../compoent/buttons/navigation"

function MainWrapper({children}){
    let listData = ['User', 'Calculator', 'Code Editor']
    let pathLIst = ['/user', '/calculator', '/code-editor']
    // console.log('mainwrapter children = ', children)
    return (
        <div className="w-auto h-auto mx-20 w-600">
            <h3>MyApp</h3>
            <div className="flex flex-row">
                <div className="mx-5 w-1/6 h-screen">
                    <ListNavigation
                        listData={listData}
                        path={pathLIst}
                    />
                </div>
                <div className="ml-5 border-2 w-5/6 h-screen">
                    {children}
                </div>
            </div>
            
        </div>
    )
}

export default MainWrapper
