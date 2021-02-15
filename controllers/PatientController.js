const { validationResult } = require('express-validator')
const Patient = require('../models/Patient')

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

      res.json({ status: 'SUCCESS', data: doc })
    })
  }
}

module.exports = new PatientController()