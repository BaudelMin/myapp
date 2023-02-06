import ListNavigation from "../compoent/buttons/navigation"

function MainWrapper({children}){
    let listData = ['Home', 'Calculator', 'Code Editor']
    let pathLIst = ['/', '/calculator', '/code-editor']
    console.log('mainwrapter children = ', children)
    return (
        <div className="w-auto h-auto mx-20 w-600">
            <h3>MyApp</h3>
            <div className="flex flex-row">
                <div className="mr-5">
                    <ListNavigation
                        listData={listData}
                        path={pathLIst}
                    />
                </div>
                <div className="ml-5 border-2">
                    {children}
                </div>
            </div>
            
        </div>
    )
}

export default MainWrapper
