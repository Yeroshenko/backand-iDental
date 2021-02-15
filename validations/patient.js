const { body } = require('express-validator')

const patientValidation = [
  body('fullName', 'Enter fullName')
    .isLength({ min: 6 })
    .withMessage('Minimum length: 6 characters'),

  body('phone', 'Enter phone')
    .isNumeric()
    .isLength({ min: 10 })
    .withMessage('Minimum length: 10 characters')
]


module.exports = patientValidation