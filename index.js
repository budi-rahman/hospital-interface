const Controller = require('./controller.js')


const command = process.argv[2]
const params = process.argv.splice(3)

if(command === 'register'){
    Controller.registerEmployee(params)
}
else if(command === 'login'){
    Controller.loginEmployee(params)
}
else if(command === 'addPatient'){
    Controller.addPatient(params)
}
else if(command === 'logout'){
    Controller.logout()
}
else{
    console.log('Unknown Input')
} 