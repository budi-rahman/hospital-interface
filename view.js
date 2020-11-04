const { builtinModules } = require("module");

class View {

    static viewMessageError(param){
        console.log(param)
    }

    static viewMessage(param){
        console.log(param)
    }
}

module.exports = View 