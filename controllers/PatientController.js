const { validationResult } = require('express-validator')
const { Patient } = require('../models')

class PatientController {
  all(req, res) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    Patient.find({}, (err, docs) => {
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
      fullName: req.body.fullName,
      phone: req.body.phone
    }

    Patient.create(data, (err, doc) => {
      if (err) {
        return res.status(500).json({ success: false, message: err })
      }

      res.json({ success: 'true', data: doc })
    })
  }

  async show(req, res) {
    const { id } = req.params

    try {
      const patient = await Patient.findById(id)
        .populate('appointments')
        .exec()
        .catch(err => {
          return res.status(500).json({ success: false, message: err })
        })

      res.status(200).json({
        success: true,
        data: { ...patient._doc, appointments: patient.appointments }
      })
    } catch (err) {
      return res.status(404).json({ success: 'false', message: 'PATIENT_NOT_FOUND' })
    }
  }

  async update(req, res) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const patientId = req.params.id

    const data = {
      fullName: req.body.fullName,
      phone: req.body.phone
    }

    Patient.updateOne(
      { _id: patientId },
      { $set: data },
      (err, doc) => {
        if (err) {
          return res.status(500).json({ success: false, message: err })
        }

        if (!doc) {
          return res.status(404).json({ success: 'false', message: 'PATIENT_NOT_FOUND' })
        }

        res.status(200).json({ success: true, data: doc })
      }
    )
  }

  async delete(req, res) {
    const { id } = req.params

    try {
      await Patient.findOne({ _id: id })
    } catch (err) {
      return res.status(404).json({ success: 'false', message: 'PATIENT_NOT_FOUND' })
    }

    Patient.deleteOne({ _id: id }, (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: err })
      }

      return res.status(200).json({ success: true })
    })
  }
}

module.exports = new PatientController()