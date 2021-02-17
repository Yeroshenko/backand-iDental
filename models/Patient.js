const mongoose = require('mongoose')

const { Schema, model } = mongoose

const PatientSchema = new Schema(
  {
    fullName: String,
    phone: Number
  },
  { timestamps: true }
)

PatientSchema.virtual('appointments', {
  ref: 'Appointment',
  localField: '_id',
  foreignField: 'patient',
  justOne: false
})

const Patient = model('Patient', PatientSchema)

module.exports = Patient
