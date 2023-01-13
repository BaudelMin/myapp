function calculateNumbers(number1, number2, operators){
    let result = 0
    number1 = parseFloat(number1)
    number2 = parseFloat(number2)
    if (isNaN(number1) || isNaN(number2)){
        throw "Given inputs are not a number"
    }
    switch (operators){
        case '+':
            result = number1 + number2
            break;
        case '-':
            result = number1 - number2
            break;
        case '*':
            result = number1 * number2
            break;
        case '/':
            result = number1 / number2
            break;
        default:
            throw "Invalid operator"
    }
    return result.toString()
}

export default calculateNumbers
