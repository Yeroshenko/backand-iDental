const { body } = require('express-validator')

const appointmentValidation = {
  create: [
    body('dentNumber', 'Enter dentNumber')
      .isInt({ min: 1, max: 48 })
      .withMessage('Enter dent number from 1 to 48'),

    body('price', 'Enter price')
      .isInt({ min: 0, max: 20000 })
      .withMessage('Min price: 0'),

    body('diagnosis', 'Enter diagnosis')
      .isLength({ min: 3, max: 50 })
      .withMessage('Length: from 3 to 50'),

    body('date', 'Enter date')
      .isLength({ min: 3, max: 50 })
      .withMessage('Length: from 3 to 50'),

    body('time', 'Enter time')
      .isLength({ min: 3, max: 50 })
      .withMessage('Length: from 3 to 50'),

    body('patient', 'Enter patient')
      .isLength({ min: 3, max: 50 })
      .withMessage('Length: from 3 to 50')
  ]
}

module.exports = appointmentValidation