const express = require('express')
const cors = require('cors')

const PatientCtrl = require('./controllers/PatientController')
const AppointmentCtrl = require('./controllers/AppointmentController')
const patientValidation = require('./validations/patient')
const appointmentValidation = require('./validations/appointment')

require('./core/db')

const app = express()

app.use(express.json())
app.use(cors())


app.get('/patients', PatientCtrl.all)
app.post('/patients', patientValidation.create, PatientCtrl.create)

app.get('/appointments', AppointmentCtrl.all)
app.post('/appointments', appointmentValidation.create, AppointmentCtrl.create)

app.listen(5000, (err) => {
  err
    ? console.log(err)
    : console.log('Server has been started on port 5000')
})