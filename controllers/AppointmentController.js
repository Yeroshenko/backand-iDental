const { validationResult } = require('express-validator')
const dayjs = require('dayjs')

const { Appointment, Patient } = require('../models')
const { sendSMS, dateReverse } = require('../utils')

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
    let patient

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
      patient = await Patient.findOne({ _id: data.patient })
    } catch (err) {
      return res.status(404).json({ success: 'false', message: 'PATIENT_NOT_FOUND' })
    }

    await Appointment.create(data, (err, doc) => {
      if (err) {
        return res.status(500).json({ success: false, message: err })
      }

      const delayedTime = dayjs(`${dateReverse(data.date)}T${data.time}`).subtract(1, 'minute').unix()

      sendSMS({
        number: patient.phone,
        time: delayedTime,
        text: `Сегодня в ${data.time} у Вас прием в стоматологию IDent.`
      })

      res.status(201).json({ success: true, data: doc })
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
