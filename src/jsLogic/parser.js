function Parser(){
    this.output = ''
}

const diff = (diffMe, diffBy) => diffMe.split(diffBy).join('')

Parser.prototype.parseNumber = function parseNumber(input){
    let res = /(\d+)|(\d+.\d+)|(-\d+)|(-\d+.\d+)/.exec(input)

    return new Promise((resolve, reject) => {
        if (res === null){
            resolve[null, input]
        }
        else{
            this.output = diff(input, res);
            resolve([res, this.output])
        }
    })

    // if (res === null){
    //     throw null
    // }
    // else{
    //     this.output = diff(input, res)
    //     return [res, this.output]
    // }
}

Parser.prototype.parseOperator = function parseOperator(input){
    let res = /\+|\-|\/|\*|\=|C/.exec(input)

    return new Promise((resolve, reject) => {
        if (res === null){
            resolve([null, input])
        }
        else{
            this.output = diff(input, res);
            resolve([res, this.output])
        }
    })

    // if (res === null){
    //     throw null
    // }
    // else{
    //     this.output = diff(input, res)
    //     return [res, this.output]
    // }
}

Parser.prototype.parseBrackets = function parseBrackets(input){
    let res = /\(|\)/.exec(input)

    return new Promise((resolve, reject) => {
        if (res === null){
            resolve([null, input])
        }
        else{
            this.output = diff(input, res);
            resolve([res, this.output])
        }
    })

    // if (res === null){
    //     throw null
    // }
    // else{
    //     this.output = diff(input, res)
    //     return [res, this.output]
    // }
}


export default Parser
