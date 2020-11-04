const fs = require("fs")

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}

class Employee {
  constructor(name, position, username, password, login) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
    this.login = login || false
  }
  static getData(callbackFromController){
    fs.readFile('./employee.json', 'utf-8', function handler(error, employee) {
      if(error){
        callbackFromController(error)
      }
      else{
        let result = []
        employee = JSON.parse(employee)
        for (let i = 0; i < employee.length; i++) {
          result.push(new Employee(employee[i].name, employee[i].position, employee[i].username, employee[i].password, employee[i].isLogin))
        }
        callbackFromController(null, result)
      }
    })
  }

  static getDataPatient(callbackFromController){
    fs.readFile('./patient.json', 'utf-8', function handler(error, patient) {
      if(error){
        callbackFromController(error)
      }else{
        let result = []
        patient = JSON.parse(patient)
        for (let i = 0; i < patient.length; i++) {
          result.push(new Patient(patient[i].id, patient[i].name, patient[i].diagnosis))
        }
        callbackFromController(null, result)
      }
    })
  }

  static saveDataEmployee(newData, callbackFromController){
    fs.writeFile('./employee.json', JSON.stringify(newData,null,2), function callback(error) {
      if(error){
        callbackFromController(error)
      }else{
        callbackFromController(null)
      }
    })
  }

  static saveDataPatient(newData, callbackFromController){
    fs.writeFile('./patient.json', JSON.stringify(newData,null,2), function callback(error) {
      if(error){
        callbackFromController(error)
      }else{
        callbackFromController(null)
      }
    })
  }

  static registerEmployeeAsync(params, callbackFromController){

    Employee.getData(function callback(error, employee) {
      if(error){
        callbackFromController(error)
      }else{
        employee.push(new Employee(params.name, params.position, params.username, params.password, false))
        let message = `> save data success {"username":"${params.name}","password":"${params.password}","role":"${params.position}"}. Total employee : ${employee.length}`

        Employee.saveDataEmployee(employee, function callback(error) {
          if (error) {
            callbackFromController(error)
          }else{
            callbackFromController(null, message)
          }
        })
      }
    })
  }

  static addPatientAsync(params, callbackFromController){

    Employee.getDataPatient(function callback(error, patient) {
      if(error){
        callbackFromController(error)
      }else{
        Employee.getData(function callback(error, employee) {
          if(error){
            callbackFromController(error)
          }else{
            let isDoctorLogin = false
            let newId = null
            if(patient.length === 0){
              newId = 1
            }else{
              newId = patient[patient.length-1].id+1
            }

            for (let i = 0; i < employee.length; i++) {
              if(employee[i].isLogin === true && employee[i].position == 'dokter'){
                isDoctorLogin = true
              }
            }

            if(isDoctorLogin === true){
              patient.push(new Patient(newId, params.name, params.diseases))

              Employee.saveDataPatient(patient, function callback(error) {
                if(error){
                  callbackFromController(error)
                }
                else{
                  callbackFromController(`data pasien berhasil ditambahkan. Total pasien : ${patient.length}`)
                }
              })
            }
            else{
              callbackFromController('tidak memiliki akses untuk add patient')
            }
          }
        })
      }
    })
  }

  static loginEmployeeAsync(params, callbackFromController){

    Employee.getData(function callback(error, employee) {
      if(error){
        callbackFromController(error)
      }else{
        let message = 'username / password wrong'
        let flagLogin = false
        let loginuser = null

        for (let i = 0; i < employee.length; i++) {
          if(employee[i].isLogin === true){
            flagLogin = true
            loginuser = employee[i].username
          }
        }

        for (let i = 0; i < employee.length; i++) {
          if(employee[i].username == params.username && employee[i].password == params.password){
            if(flagLogin === true){
              message = `user ${loginuser} still logged in. You need logout first.`
            }else{
              message = `user ${employee[i].username} logged in successfully`
              employee[i].isLogin = true
            }
          }
        }

        Employee.saveDataEmployee(employee, function callback(error) {
          if (error) {
            callbackFromController(error)
          }else{
            callbackFromController(null, message)
          }
        })
      }
    })
  }

  static logoutAll(callbackFromController){

    fs.readFile('./employee.json', 'utf-8', function handler(error, employee) {
      if(error){
        callbackFromController(error)
      }else{
        let result = []
        let message = 'user has been successfully logout'
        employee = JSON.parse(employee)

        for (let i = 0; i < employee.length; i++) {
          result.push(new Employee(employee[i].name, employee[i].position, employee[i].username, employee[i].password, false))
        }

        Employee.saveDataEmployee(result, function callback(error) {
          if (error) {
            callbackFromController(error)
          }else{
            callbackFromController(null, message)
          }
        })
      }
    })
  }
}

module.exports = {
  Patient,
  Employee
}

