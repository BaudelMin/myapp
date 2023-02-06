import CalButton from '../compoent/buttons/button'
import { useState, useRef } from 'react'
import calculatorTask from '../jsLogic/calculatorTask'
import MainWrapper from '../wrapper/Wrapper'


var result = {
    inputValue: '',
    btnValue:''
}

const ButtonsFlexRow = function (props) {
    // console.log(props)

    return (
        <div>
            <div className='flex-row justify-center'>
                {props.value.map((ele, index) => {
                    return (<CalButton 
                        key={index}
                        className="bg-teal-400 w-10 h-10 m-1" 
                        value={ele}
                        type={
                            (ele === 'C'?'reset':'submit')
                        }
                        getValue={props.getValue}
                        />)
                })}
            </div>

        </div>
    )
}

const CalculatorPage = function () {
    const [value, getValue] = useState('0');
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [output, setOutput] = useState(0)

    const calInput = useRef('')
    console.log(`Ref value is ${calInput.current}`)
    function onButtonClick(val){
        calInput.current = calInput.current.concat(val)
        getValue(val)
        // setOutput(val)
    }
    function spanReset(e) {
        setIsInputVisible(false)
        setOutput(e.target.value)
    }
    function spanSwitch(e) {
        setIsInputVisible(true)
        setOutput(e.target.innerText.concat(value))
        // document.getElementById('calculatorInput').focus();
      }
    
    return (
       <>
       <MainWrapper>
        <div className='bg-green-100 w-52 h-70 ml-10 mt-10'>
                <div>
                    <h3>Calculator</h3>
                </div>
                <div id='element'>
                    {(isInputVisible)?<div>
                        <input onBlur={spanReset} defaultValue={output} autoFocus></input>
                        </div>:
                        (<span onClick={spanSwitch}>{output}</span>)}
                </div>
                <div className='flex-column justify-center'>
                    <ButtonsFlexRow value={['C', '(', ')', '^']} getValue={onButtonClick}/>
                    <ButtonsFlexRow value={['7', '8', '9', '/']}  getValue={onButtonClick}/>
                    <ButtonsFlexRow value={['4', '5', '6', '*']} getValue={onButtonClick}/>
                    <ButtonsFlexRow value={['1', '2', '3', '-']} getValue={onButtonClick}/>
                    <ButtonsFlexRow value={['0', '.', '=', '+']} getValue={onButtonClick}/>
                    
                </div>
            </div>
       </MainWrapper>
       </>
    )
}



export default CalculatorPage
