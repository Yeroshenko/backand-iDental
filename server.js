const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const { PatientCtrl, AppointmentCtrl } = require('./controllers')
const { patientValidation, appointmentValidation } = require('./validations')

dotenv.config()
require('./core/db')

const app = express()

app.use(express.json())
app.use(cors())


app.get('/patients', PatientCtrl.all)
app.get('/patients/:id', PatientCtrl.show)
app.post('/patients', patientValidation, PatientCtrl.create)
app.patch('/patients/:id', patientValidation, PatientCtrl.update)
app.delete('/patients/:id', PatientCtrl.delete)

app.get('/appointments', AppointmentCtrl.all)
app.post('/appointments', appointmentValidation.create, AppointmentCtrl.create)
app.patch('/appointments/:id', appointmentValidation.update, AppointmentCtrl.update)
app.delete('/appointments/:id', AppointmentCtrl.delete)

app.listen(5000, (err) => {
  err
    ? console.log(err)
    : console.log('Server has been started on port 5000')
})