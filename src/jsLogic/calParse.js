import { data } from "autoprefixer";
import Parser from "./parser";


let Syntax = {
    firstOperand: '',
    secondOperand: '',
    operator: '',
    remains: ''
}



function calParser(input){
    let parser = new Parser()
    parser.parseNumber()
        .then(data => {
            Syntax.firstOperand = data[0]
            Syntax.remains = data[1]
            // return parser./
        })
}

export default calParser
