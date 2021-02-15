const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost:27017/iDental', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(err => {
    throw  Error(err)
  })

module.exports = mongoose