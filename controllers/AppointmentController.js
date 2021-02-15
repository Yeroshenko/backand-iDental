const { validationResult } = require('express-validator')
const Appointment = require('../models/Appointment')

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

  create(req, res) {
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

    Appointment.create(data, (err, doc) => {
      if (err) {
        return res.status(500).json({ success: false, message: err })
      }

      res.json({ status: 'SUCCESS', data: doc })
    })
  }
}

module.exports = new AppointmentController()