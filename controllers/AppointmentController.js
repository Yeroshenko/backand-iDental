const { validationResult } = require('express-validator')
const { Appointment, Patient } = require('../models')

class AppointmentController {
  all(req, res) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    Appointment
      .find({})
      .populate('patient')
      .exec((err, docs) => {
        if (err) {
          return res.status(500).json({ success: false, message: err })
        }

        res.status(201).json({ success: true, data: docs })
      })
  }

  async create(req, res) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const data = {
      patient: req.body.patient,
      dentNumber: req.body.dentNumber,
      diagnosis: req.body.diagnosis,
      price: req.body.price,
      date: req.body.date,
      time: req.body.time
    }

    try {
      await Patient.findOne({ _id: data.patient })
    } catch (err) {
      return res.status(404).json({ success: 'false', message: 'PATIENT_NOT_FOUND' })
    }

    Appointment.create(data, (err, doc) => {
      if (err) {
        return res.status(500).json({ success: false, message: err })
      }

      res.json({ success: true, data: doc })
    })
  }

  async update(req, res) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const appointmentId = req.params.id

    const data = {
      dentNumber: req.body.dentNumber,
      diagnosis: req.body.diagnosis,
      price: req.body.price,
      date: req.body.date,
      time: req.body.time
    }

    Appointment.updateOne(
      { _id: appointmentId },
      { $set: data },
      (err, doc) => {
        if (err) {
          return res.status(500).json({ success: false, message: err })
        }

        if (!doc) {
          return res.status(404).json({ success: 'false', message: 'APPOINTMENT_NOT_FOUND' })
        }

        res.status(200).json({ success: true, data: doc })
      }
    )
  }

  async delete(req, res) {
    const { id } = req.params

    try {
      await Appointment.findOne({ _id: id })
    } catch (err) {
      return res.status(404).json({ success: 'false', message: 'APPOINTMENT_NOT_FOUND' })
    }

    Appointment.deleteOne({ _id: id }, (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: err })
      }

      return res.status(200).json({ success: true })
    })
  }
}

module.exports = new AppointmentController()
