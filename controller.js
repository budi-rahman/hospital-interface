const {Employee} = require('./model.js')
const View = require('./view.js')


class Controller {

    static registerEmployee(params) {
        let obj = {
            name: params[0],
            username: params[1],
            password: params[2],
            position: params[3]
        }

        Employee.registerEmployeeAsync(obj, function callback(error, data) {
            if(error){
                View.viewMessageError(error)
            }else{
                View.viewMessage(data)
            }
        })
    }

    static loginEmployee(params){
        let obj = {
            username: params[0],
            password: params[1]
        }

        Employee.loginEmployeeAsync(obj, function callback(error, data) {
            if(error){
                View.viewMessageError(error)
            }
            else{
                View.viewMessage(data)
            }
        })
    }

    static addPatient(params){
        let obj = {
            name: params[0],
            diseases: params.splice(1)
        }

        Employee.addPatientAsync(obj, function callback(error, data) {
            if(error){
                View.viewMessageError(error)
            }else{
                View.viewMessage(data)
            }
        })
    }

    static logout(){

        Employee.logoutAll(function callback(error, message) {
            if(error){
                View.viewMessageError(error)
            }else{
                View.viewMessage(message)
            }
        })
    }  
}

module.exports = Controller 