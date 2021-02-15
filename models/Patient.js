const mongoose = require('mongoose')

const { Schema, model } = mongoose

const PatientSchema = new Schema(
  {
    fullName: String,
    phone: Number
  },
  { timestamps: true }
)

const Patient = model('Patient', PatientSchema)

module.exports = Patient
